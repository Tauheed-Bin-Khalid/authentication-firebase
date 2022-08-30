import logo from './logo.svg';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
 
} from "react-router-dom";
import ForgetPassword from './Components/ForgetPassword';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Data from './Components/Data';
import Home from './Components/Home';
import Table from './Components/Table';
import EditUpdate from './Components/EditUpdate';

function App() {
  
 useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user,"app")
     
      // ...
    } else {
      // User is signed out
      // ...
      console.log("user logged out")
    }})
 },[])
  return (
    <Router>




      <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/signin"  element={<SignIn />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/forgetPassword" element={<ForgetPassword/>}/>
          <Route path="/data" element={<Data/>}/>
          <Route path="/table" element={<Table/>}/>
          <Route path="/editProduct/:id" element={<EditUpdate/>}/>




           
          
        </Routes>

    </Router>





  );
}

export default App;
