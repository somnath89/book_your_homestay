import React, { Component } from 'react';
import styles from './app.module.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {search,showLoading} from '../actions/index';


import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import PhotoCard from './PropertyCard';

class SearchBarNew extends Component {
  constructor(props)
  {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCheckInChange = this.handleCheckInChange.bind(this);
    this.handleCheckOutChange = this.handleCheckOutChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state={location: "",checkin:"",checkout:""};
  }
  handleLocationChange(event){
    this.setState({location: event.target.value});
  }
  handleCheckInChange(event){
      this.setState({checkin: event.target.value});
    }
    handleCheckOutChange(event){
        this.setState({checkout: event.target.value});
   }
   async handleClick(){
      this.props.showLoading(true);
      const requestOptions = {
                method: 'POST',
                headers: { 'Access-Control-Allow-Origin':'*','Accept': 'application/json','Content-Type': 'application/json' },
                body: JSON.stringify({location: this.state.location})
            };

     //dynamoDb end-point
     //const response = await fetch('https://5jvdsw44gj.execute-api.us-east-1.amazonaws.com/uat/searchStays',requestOptions);
     //mongoDb end-point
     const response = await fetch('https://2kvzxgurig.execute-api.us-east-1.amazonaws.com/default/mongoConnector',requestOptions);
     const data = await response.json();

     console.log("Data retrieved ---->"+JSON.stringify(data));
     this.props.search(data);
     this.props.showLoading(false);
   }


  render() {
    return (
      <div className="container-fluid">
        <Paper elevation={3} style={{display:'flex',padding:'10px',position:'fixed',right:'316px',top:'6px'}}>
           <TextField id="outlined-basic" label="Location" variant="outlined" style={{padding:'5px'}} onChange={(e) => this.handleLocationChange(e)}/>
           <TextField id="outlined-basic" label="Check-In" variant="outlined" style={{padding:'5px'}} onChange={(e) => this.handleCheckInChange(e)}/>
           <TextField id="outlined-basic" label="Check-Out" variant="outlined" style={{padding:'5px'}} onChange={(e) =>this.handleCheckOutChange(e)}/>
           <div className={styles.searchIcon} onClick={(e) => this.handleClick("Search")}><SearchIcon/>Search</div>
      </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    search:search,
    showLoading:showLoading
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBarNew);
