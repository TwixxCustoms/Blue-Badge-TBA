import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm,
} from 'react-crud-table';
import Poem from './Poem/Poem'
import './Poems.css';


const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let Poems = [
  {
    id: 1,
    title: "Create an example",
    description: "Create an example of how to use the component"
  },
  {
    id: 2,
    title: "Improve",
    description: "Improve the component!"
  }
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = Poems.length;
const service = {
  fetchItems: payload => {
    let result = Array.from(Poems);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: poem => {
    count += 1;
    Poems.push({
      ...poem,
      id: count
    });
    return Promise.resolve(poem);
  },
  update: data => {
    const poem = Poems.find(t => t.id === data.id);
    poem.title = data.title;
    poem.description = data.description;
    return Promise.resolve(poem);
  },
  delete: data => {
    const poem = Poems.find(t => t.id === data.id);
    Poems = Poems.filter(t => t.id !== poem.id);
    return Promise.resolve(poem);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Poems"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="title" label="Title" placeholder="Title" />
        <Field
          name="description"
          label="Description"
          render={DescriptionRenderer}
        />
      </Fields>
      <CreateForm
        title="Poem Creation"
        message="Create a new poem!"
        trigger="Create Poem"
        onSubmit={poem => service.create(poem)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = "Please, provide poem's title";
          }

          if (!values.description) {
            errors.description = "Please, provide poem's description";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="Poem Update Process"
        message="Update poem"
        trigger="Update"
        onSubmit={poem => service.update(poem)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.title) {
            errors.title = "Please, provide poem's title";
          }

          if (!values.description) {
            errors.description = "Please, provide poem's description";
          }

          return errors;
        }}
      />

      <DeleteForm
        title="Poem Delete Process"
        message="Are you sure you want to delete this poem?"
        trigger="Delete"
        onSubmit={poem => service.delete(poem)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

Example.propTypes = {};

ReactDOM.render(<Example />, document.getElementById("root"));


export default Poems;