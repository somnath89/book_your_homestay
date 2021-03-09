import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import {NavigationBar} from './AppBar.js';
import BecomeAHost from './Home/BecomeAHost.js'

function Host() {
  return (
    <div className="App">
        <NavigationBar title={"Welcome "+Auth.user.username}/>
        <BecomeAHost/>
    </div>);
}

export default withAuthenticator(Host);
