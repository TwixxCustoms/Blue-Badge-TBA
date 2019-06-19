import React from 'react';
import pi from "../../Assets/pi.jpg";
import Logout from "./Logout/Logout"
import './Navbar.css';

const Navbar = (props) => {
    return (
        <nav>
            <img className="nav-img" src={pi} alt ="Pie" />
            <h1>Pies!</h1>
            <Logout clearToken={ props.clearToken }/>
        </nav>
    )
}

export default Navbar;

//Pie Picture

//Logout Picture
