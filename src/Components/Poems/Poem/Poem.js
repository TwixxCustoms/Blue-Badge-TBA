import React from 'react';

const Poem = (props) => {
    return (
        <tr>
            <td>{props.poem.nameOfPoem}</td>
            <td>{props.poem.linesOfPoem}</td>
            <td>{props.poem.subjectOfPoem}</td>
            <td>{props.poem.rating}</td>
        </tr>
    )
}

export default Poem;