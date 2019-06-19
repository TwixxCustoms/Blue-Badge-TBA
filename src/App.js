import React, {useState} from 'react';
import Navbar from './Components/Navbar/Navbar.js';
import Auth from './Components/Auth/Auth';
import Pies from './Components/Pies/Pies';
import './App.css';

function App() {
  const [token, setToken] = useState(undefined);

const storeToken = (token) => {
  setToken(token);
};

const clearToken = () => {
  setToken(undefined);
}

  return (
    <div className="App">
     <Navbar clearToken = { clearToken }/>
      {
        token ? <Pies /> : <Auth storeToken={ storeToken }/>
      }
    </div>
  );
};

export default App;