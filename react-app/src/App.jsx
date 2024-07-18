import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Chater from './components/Chater/Chater';

function App() {
  // const [apiResponse, setApiResponse] = useState("");

  // useEffect(() => {
  //   callAPI();
  // }, []);

  // const callAPI = () => {
  //   fetch("http://localhost:9000/testAPI")
  //     .then(res => res.text())
  //     .then(res => setApiResponse(res));
  // }

  return (
    <Router> 
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />  
        <Route path='/' element={<Chater/>} />
      </Routes>    
    </Router>
  );
}

export default App;