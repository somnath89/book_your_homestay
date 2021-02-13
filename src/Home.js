import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
/*import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';*/
import {NavigationBar} from './AppBar.js';
import {Switch, Route} from 'react-router-dom';

function Home() {
  return (
    <div className="App">
       <NavigationBar title={"Welcome "+Auth.user.username}/>
     <img src={process.env.PUBLIC_URL+'/images/img1.jpg'}/>
   </div>);
}

export default withAuthenticator(Home);
