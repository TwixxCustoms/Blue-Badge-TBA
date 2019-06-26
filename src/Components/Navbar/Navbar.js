import React from 'react';
import Poem from "../../Assets/poem.jpg";
import Logout from "./Logout/Logout"
import './Navbar.css';

const Navbar = (props) => {
    return (
        <nav>
            <img className="nav-img" src={Poem} alt ="Poem" />
            <h1>Totem Poem</h1>
            <Logout clearToken={ props.clearToken }/>
        </nav>
    )
}

export default Navbar;