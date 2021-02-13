import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function App() {
  //console.log("User Details-->"+Auth.currentUserInfo());
  getUserInfo();
  return (
    <div className="App">
    <h1>Welcome {Auth.user.username}</h1>

      <img src={process.env.PUBLIC_URL+'/images/img1.jpg'}/>
      <AmplifySignOut />
    </div>
  );
}

function getUserInfo(){

  Auth.currentUserInfo().then(response => console.log('response-->'+JSON.stringify(response)));

}
export default withAuthenticator(App);
