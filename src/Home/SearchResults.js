import React, { Component } from 'react';
import styles from './app.module.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {search,showLoading} from '../actions/index';

import imgBackground from '../images/img2.jpg';

import PhotoCard from './PropertyCard';

class SearchResults extends Component {
  constructor(props)
  {
    super(props);
    this.paintCardImages = this.paintCardImages.bind(this);
    this.getTop5Stays = this.getTop5Stays.bind(this);
    this.state={
        searchItems:[]
    }
  }
  componentDidMount(){
    this.getTop5Stays();
  }

  /*async getTop5Stays(){
    this.props.showLoading(true);
      const requestOptions = {
                method: 'POST',
                headers: { 'Access-Control-Allow-Origin':'*','Accept': 'application/json','Content-Type': 'application/json' },
                body: JSON.stringify({location: "*"})
            };
      //dynamoDb end-point
     //const response = await fetch('https://d27je0z2652pbs.cloudfront.net/default/search',requestOptions);
     //mongoDb end-point
     const response = await fetch('https://2kvzxgurig.execute-api.us-east-1.amazonaws.com/default/mongoConnector',requestOptions);
     const data = await response.json();

     console.log("Data in search ---->"+JSON.stringify(data));
     this.props.search(data);
     this.props.showLoading(false);
  }*/

  async getTop5Stays(){
      this.props.showLoading(true);
        const requestOptions = {
                  method: 'GET',
                  headers: { 'Access-Control-Allow-Origin':'*','Accept': 'application/json','Content-Type': 'application/json' },
               };
        //dynamoDb end-point
       //const response = await fetch('https://d27je0z2652pbs.cloudfront.net/default/search',requestOptions);
       //mongoDb end-point
       const response = await fetch('https://2kvzxgurig.execute-api.us-east-1.amazonaws.com/default/mongoConnector',requestOptions);
       const data = await response.json();

       console.log("Data in search ---->"+JSON.stringify(data));
       this.props.search(data);
       this.props.showLoading(false);
    }


  paintCardImages(items){

    let newcontent = [];

    for(var i=0;i<items.length;i++){
     newcontent.push(<PhotoCard property={items[i]}/>);
    }
    return newcontent;
    }
  render() {
    console.log("search--->"+JSON.stringify(this.props.search));
    return (
      <div className="backgroundImage">
      <p>   </p>
      {this.props.loading?<div className={styles.overlay}><div className={styles.loader}></div></div>:null}
      {/*this.props.loading?<img className={styles.overlay} src={process.env.PUBLIC_URL+'/images/loading_transparent.gif'}/>:null*/}
    {this.props.search_items.length>0?<div style={{display:'inline-flex'}}>{this.paintCardImages(this.props.search_items)}</div>:null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    search_items : state.search_results,
    loading:state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    search:search,
    showLoading:showLoading
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResults);
