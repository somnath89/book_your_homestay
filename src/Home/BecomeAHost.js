import React, { Component } from 'react';
import styles from './app.module.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {setUserListings,showLoading} from '../actions/index';

import ListingsCard from './ListingsCard';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Auth } from 'aws-amplify';

class BecomeAHost extends Component {
  constructor(props)
  {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchListedProperties = this.fetchListedProperties.bind(this);
    this.paintListings = this.paintListings.bind(this);
    this.state={
                 amenities: "",
                 price: "",
                 prop_location: "",
                 property_name: "",
                 type: ""
               };
  }
  componentDidMount(){
     this.fetchListedProperties();
  }
  handleChange(event){
    this.setState({...this.state, [event.target.id]: event.target.value});
  }
  async fetchListedProperties(){
      this.props.showLoading(true);
      const requestOptions = {
          method: 'POST',
          headers: { 'Access-Control-Allow-Origin':'*','Accept': 'application/json','Content-Type': 'application/json' },
          body: JSON.stringify({host_name:Auth.user.username})
      };

       const response = await fetch('https://5jvdsw44gj.execute-api.us-east-1.amazonaws.com/default/view_my_listed_properties',requestOptions);
       const data = await response.json();

       console.log("Properties retrieved ---->"+JSON.stringify(data));
       this.props.showLoading(false);
       this.props.setUserListings(data);
  }
  async handleClick(){
      this.props.showLoading(true);
      var propId = ""+Math.floor(1000 + Math.random() * 9000); //random 4-digit number
      var payload = {...this.state,host_name:Auth.user.username,property_ID:propId,rating:"4.3"}
     console.log("Payload--->"+JSON.stringify(payload));
      const requestOptions = {
                method: 'POST',
                headers: { 'Access-Control-Allow-Origin':'*','Accept': 'application/json','Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };

     const response = await fetch('https://5jvdsw44gj.execute-api.us-east-1.amazonaws.com/default/becomeAHost',requestOptions);
     const data = await response.json();

     console.log("Data retrieved ---->"+JSON.stringify(data));
     //this.props.search(data);
     this.props.showLoading(false);
     this.fetchListedProperties();
   }

paintListings(items){

    let newcontent = [];

    for(var i=0;i<items.length;i++){
     newcontent.push(<ListingsCard property={items[i]}/>);
    }
    return newcontent;
    }

  render() {

   console.log("State--->"+JSON.stringify(this.state));
    return (
      <div className="container-fluid">
        <Paper elevation={3} style={{display:'flex',padding:'10px'}}>
           <TextField id="type" label="Type" variant="outlined" style={{padding:'5px'}} onChange={(e) => this.handleChange(e)}/>
           <TextField id="property_name" label="Property Name" variant="outlined" style={{padding:'5px'}} onChange={(e) => this.handleChange(e)}/>
           <TextField id="prop_location" label="Location" variant="outlined" style={{padding:'5px'}} onChange={(e) =>this.handleChange(e)}/>
           <TextField id="price" label="Price/night" variant="outlined" style={{padding:'5px'}} onChange={(e) =>this.handleChange(e)}/>
           <TextField id="amenities" label="Amenities" variant="outlined" style={{padding:'5px'}} onChange={(e) =>this.handleChange(e)}/>
           <div className={styles.searchIcon} onClick={(e) => this.handleClick()}>Register</div>
      </Paper>
      <h3>My Listed Properties</h3>
       {this.props.user_listings.length>0?<div style={{display:'inline-flex'}}>{this.paintListings(this.props.user_listings)}</div>:null}

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

export default connect(mapStateToProps,mapDispatchToProps)(BecomeAHost);
