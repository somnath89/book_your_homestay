import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import {NavigationBar} from './AppBar.js';

function MyAccount() {
  return (
    <div className="App">
        <NavigationBar title={"Welcome "+Auth.user.username}/>
        <h1>This is my account details</h1>
    </div>);
}

export default withAuthenticator(MyAccount);
