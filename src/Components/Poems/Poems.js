import React, { useState, useEffect } from 'react';
import Poem from './Poem/Poem'
import './Poems.css';

const Poems = () => {
const [poems, setPoems ] = useState([]);

useEffect(() => fetchPoems(), []);

const fetchPoems = () => {
let url = 'http://localhost:3005/poems/';

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