import React, { Component } from 'react';
import styles from './app.module.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {setUserListings,showLoading} from '../actions/index';
import Paper from '@material-ui/core/Paper';
import { Auth } from 'aws-amplify';
import {NavigationBar} from '../AppBar.js';
//import Amplify, { Interactions } from 'aws-amplify';
import {AmplifyChatbot} from '@aws-amplify/ui-react';

import botStyles from '@aws-amplify/ui/dist/style.css';


class Help extends Component {
  constructor(props)
  {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.state={
               showHelp:false
            };
  }
  componentDidMount(){

  }
  showHelp(){
    this.setState({showHelp:!this.state.showHelp});
  }
   handleComplete(err, confirmation) {
      if (err) {
        alert('Bot conversation failed')
        return;
      }
     alert('Success: ' + JSON.stringify(confirmation, null, 2));
      return 'Trip booked. Thank you! what would you like to do next?';
    }

  render() {

    var hideBot = [styles.amplifychatbot,styles.hideBot];
    var showBot = [styles.amplifychatbot,styles.showBot];
    return (
      <div className="container-fluid">
      <div className={styles.showHelp} style={{display:this.state.showHelp?'none':'flex'}} onClick={(e) => this.showHelp()}>Help</div>
      <div className={styles.closeHelp} style={{display:this.state.showHelp?'flex':'none'}} onClick={(e) => this.showHelp()}>Close Help</div>
        <Paper elevation={3} className={this.state.showHelp?showBot:hideBot}>
        <AmplifyChatbot
                    title="My Bot"
                    botName="BookYourHomestay"
                    welcomeMessage="Welcome, how can I help you today?"
                  />
      </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_listings : state.user_listed_properties
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUserListings:setUserListings,
    showLoading:showLoading
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Help);
