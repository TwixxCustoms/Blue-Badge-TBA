import React, {useState} from 'react';
import './Auth.css';

import APIURL from '../../helpers/environment'

const Auth = (props) => {

    const [ login, setLogin] = useState(false);
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    const loginToggle = (event) => {
        event.preventDefault();
        setLogin(!login);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let url = login ? `${APIURL}/auth/signin` :
        `${APIURL}/auth/signup`;

        let reqBody = {
            firstName : firstName,
            lastName :  lastName,
            email : email,
            password : password
        };

        fetch(url, {               //THIS NEEDS TO BE REVIEWED
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({user: reqBody})
        })
        .then(res => res.json())
        .then(data => props.storeToken(data.sessionToken))
        .catch(err => console.log(err));
    };

    return(
        <form className="card" onSubmit={(e) => handleSubmit(e)}>
            <h1>{login ? 'Sign In' : 'Sign Up'}</h1>

            {
                login ? null
                :<React.Fragment>
                    <label htmlFor="firstName">First Name</label>
                    <input type ="text" name ="firstName" />
                    <label htmlFor="lastName">Last Name</label>
                    <input type ="text" name ="lastName" />
                </React.Fragment>
            }
            

            <label htmlFor="email">Email</label>
            <input onChange={(e) =>setEmail(e.target.value)} type ="text" name="email" />
            <label htmlFor="password">Password</label>
            <input onChange={(e) =>setPassword(e.target.value)}type ="text" name ="password" />
            <br />
            <button onClick={(e) =>loginToggle (e)}href="#" className="myButton">Login/Sign Up Toggle</button>
            <button  href="#" className="myButton">Submit</button>
        </form>
    )
}

export default Auth;