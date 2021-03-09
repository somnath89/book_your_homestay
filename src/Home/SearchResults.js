import React, { Component } from 'react';
import styles from './app.module.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addStudent,deleteStudent,updateStudent,showLoading} from '../actions/index';

import imgBackground from '../images/img2.jpg';

import PhotoCard from './PropertyCard';

class SearchResults extends Component {
  constructor(props)
  {
    super(props);
    this.paintCardImages = this.paintCardImages.bind(this);
    this.state={
        searchItems:[]
    }
  }
  componentWillMount(){

  }


  paintCardImages(items){

    let newcontent = [];

    for(var i=0;i<items.length;i++){
     newcontent.push(<PhotoCard property={items[i]}/>);
    }
    return newcontent;
    }
  render() {
    console.log("Loading--->"+this.props.loading);
    return (
      <div className="backgroundImage">
      <p>   </p>
      {this.props.loading?<div className={styles.overlay}><div className={styles.loader}></div></div>:null}
      {/*this.props.loading?<img className={styles.overlay} src={process.env.PUBLIC_URL+'/images/loading_transparent.gif'}/>:null*/}
    {this.props.search.length>0?<div style={{display:'inline-flex'}}>{this.paintCardImages(this.props.search)}</div>:null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    search : state.search_results,
    loading:state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addStudent:addStudent,
    showLoading:showLoading
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResults);
