import React from 'react';
import logo from './logo.svg';
//import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
/*import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';*/
import {NavigationBar} from './AppBar.js';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Host from './Host';
import MyAccount from './MyAccount';

import { connect } from "react-redux";
import store from "./store";

function App() {
  console.log("Store-->"+JSON.stringify(store.getState()));
  getUserInfo();
  return (
    <Switch>
      <Route exact path='/' render={() => (<Home/>)}/>
      <Route path='/host' component={Host}/>
      <Route path='/myAccount' component={MyAccount}/>
    </Switch>

  );
}

function getUserInfo(){

  Auth.currentUserInfo().then(response => console.log('response-->'+JSON.stringify(response)));

}

const mapStateToProps = state => {
  return { articles: state.articles };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withAuthenticator(App));
