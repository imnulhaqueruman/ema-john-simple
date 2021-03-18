import React, { useContext } from 'react';

import { useState } from 'react';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, firebaseFrameWork, handleFbSignIn, handleSignIn, handleSignOut, signInWithEmailAndPassword } from './loginManager';




function Login() {
  const[newUser, setNewUser] = useState(false);
  const[user,setUser] = useState({
    isSignedIn:false,
    name:'',
    picture:'',
    password:'',
    email:''
  })

  firebaseFrameWork();

  const[loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
   
  const googleSignIn = () =>{
      handleSignIn()
      .then(res => {
         handleRespones(res,true);
      })
  }
  const fbSignIn = () =>{
      handleFbSignIn()
      .then(res => {
       handleRespones(res, true);
    })
  }
 const SignOut = () =>{
     handleSignOut()
     .then(res=>{
       handleRespones(res,false);
     })
 }
 const handleRespones = (res,redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from)
    }
   
 }
  
  
  

  const handleChange = (event) =>{
     let isFormedValid = true;
      if(event.target.name === 'email'){
           isFormedValid = /\S+@\S+\.\S+/.test(event.target.value);
          console.log(isFormedValid);
      }
      if(event.target.name === 'password'){
          const isPasswordValid = event.target.value.length>6;
          const passwordHasNumber =  /\d{1}/.test(event.target.value);
          isFormedValid = (passwordHasNumber && isPasswordValid);
      }
      if(isFormedValid){
          let newUserInfo = {...user};
          newUserInfo[event.target.name] = event.target.value;
          setUser(newUserInfo);
      }
  }
  const handleSubmit = (e) =>{
    console.log(user.email, user.password)
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email, user.password)
      .then(res =>{
         handleRespones(res,true);
      })
    }
    if(!newUser && user.email && user.password){
     signInWithEmailAndPassword(user.email,user.password)
     .then(res =>{
        handleRespones(res,true);
     })
    }
    e.preventDefault();

  }
  
   
  
  return (
    <div style={{textAlign:'center'}}>
     { 
       user.isSignedIn ? <button onClick ={SignOut}>Sign Out</button> :
       <button onClick ={googleSignIn}>Sign in </button>
     }
     <button onClick ={fbSignIn}>Sign in With Facebook </button>
     {
       user.isSignedIn && <div>
           <p>Welcome,{user.name}</p>
           <p>Email:{user.email}</p>
           <img src={user.picture} alt=""/>
       </div>
     }

     <h1>Our own Authentication</h1>
     <input type="checkbox" onChange ={() => setNewUser(!newUser)}name="newUser" id=""/>
     <label htmlFor>NewUser Sign up </label>
     <form onSubmit={handleSubmit}>
       {newUser && <input type="name" name="name" onBlur={handleChange} placeholder="Enter your name"/>}
       <br/>
     <input type="text" name="email" onBlur={handleChange} placeholder="Your Email address" required/>
     <br/>
     <input type="password" name="password" id="" onBlur={handleChange} placeholder="Your password" required/>
     <br/>
    <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
     </form>
    <p>{user.error}</p>
    {
      user.success && <p style={{color:'green'}}>User { newUser? 'created' : 'Logged in '} Successfully</p>
    }
    </div>
  );
}

export default Login;

