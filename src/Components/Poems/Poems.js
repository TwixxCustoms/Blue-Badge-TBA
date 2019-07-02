import React, { useState, useEffect } from 'react';
import Poem from './Poem/Poem'
import './Poems.css';

const Poems = () => {
const [poems, setPoems ] = useState([]);

useEffect(() => fetchPoems(), []);

const fetchPoems = () => {
let url = 'https://xh-bbproject.herokuapp.com/poems/';

fetch(url)
.then(response => response.json())
.then(data => {
    console.log('poem data => ', data)
    setPoems(data)
})
.catch(err => console.log(err));

};

    return (
        <table>
            <thead>
                <tr>
                    <td>Name of Poem</td>
                    <td>Lines of Poem</td>
                    <td>Subject of Poem</td>
                    <td>Rating</td>
                </tr>
            </thead>
            <tbody>
                {
                    poems.map((data, index) => {
                        console.log('data => ', data);
                        return <Poem poem={data} />
                    })
                }
            </tbody>
        </table>
    )
}

export default Poems;