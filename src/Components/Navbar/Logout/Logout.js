import React from 'react';
import logoutPic from '../../../Assets/logoutPic.png';
import './Logout.css';

const Logout = (props) => {
    return (
        <img onClick={props.clearToken} className="logout-img" src={logoutPic} alt ="logout" />
    )
};

export default Logout;