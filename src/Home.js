import React from 'react';
import logo from './logo.svg';
import './index.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import {NavigationBar} from './AppBar.js';
import SearchBarNew from './Home/SearchBarNew.js';
import SearchResults from './Home/SearchResults.js';
import {Switch, Route} from 'react-router-dom';

function Home(props) {
  let url = process.env.PUBLIC_URL+'/images/img1.jpg';
  return (
    <div className="App">
       <NavigationBar title={"Welcome "+Auth.user.username}/>
       <SearchBarNew/>
       <SearchResults/>
   </div>);
}


export default (withAuthenticator(Home));
