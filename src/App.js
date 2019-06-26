import React, {useState} from 'react';
import Navbar from './Components/Navbar/Navbar.js';
import Auth from './Components/Auth/Auth';
import Poems from './Components/Poems/Poems';
import './App.css';

function App() {
  const [token, setToken] = useState(undefined);

const storeToken = (token) => {
  console.log('token => ', token)
  setToken(token);
};



const clearToken = () => {
  setToken(undefined);
}

  return (
    <div className="App">
     <Navbar clearToken = { clearToken }/>
      {
        token ? <Poems /> : <Auth storeToken={ storeToken }/>
      }
    </div>
  );
};

export default App;