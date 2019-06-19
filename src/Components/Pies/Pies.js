import React, { useState, useEffect } from 'react';
import Pie from './Pie/Pie'
import './Pies.css';

const Pies = () => {
const [pies, setPies ] = useState([]);

useEffect(() => fetchPies(), []);

const fetchPies = () => {
let url = 'http://localhost:3005/pies/';

fetch(url)
.then(response => response.json())
.then(data => setPies(data))
.catch(err => console.log(err));

};

    return (
        <table>
            <thead>
                <tr>
                    <td>Name of Pie</td>
                    <td>Base of Pie</td>
                    <td>Crust Type</td>
                    <td>Time to Bake</td>
                    <td>Servings</td>
                    <td>Rating</td>
                </tr>
            </thead>
            <tbody>
                {
                    pies.map((data, index) => {
                        return <Pie pie={data} />
                    })
                }
            </tbody>
        </table>
    )
}

export default Pies;