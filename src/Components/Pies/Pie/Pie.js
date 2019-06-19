import React from 'react';

const Pie = (props) => {
    return (
        <tr>
            <td>{props.pie.nameOfPie}</td>
            <td>{props.pie.baseOfPie}</td>
            <td>{props.pie.crust}</td>
            <td>{props.pie.timeToBake}</td>
            <td>{props.pie.servings}</td>
            <td>{props.pie.rating}</td>
        </tr>
    )
}

export default Pie;