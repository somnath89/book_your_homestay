import React, { Component } from 'react';
import styles from'./App.module.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addStudent,deleteStudent,updateStudent,search} from '../actions/index';

import PhotoCard from './PropertyCard';

class Home extends Component {
  constructor(props)
  {
    super(props);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.editStudentSubmit = this.editStudentSubmit.bind(this);
    this.paintCardImages = this.paintCardImages.bind(this);
    this.state={
        searchItems:[]
    }
  }
  componentWillMount(){

  }
  async addNewStudent()
  {
  const requestOptions = {
                method: 'POST',
                headers: { 'Access-Control-Allow-Origin':'*','Accept': 'application/json','Content-Type': 'application/json' },
                body: JSON.stringify({location: "Bangalore"})
            };

     const response = await fetch('https://5jvdsw44gj.execute-api.us-east-1.amazonaws.com/uat/searchStays',requestOptions);
     const data = await response.json();

     console.log("Data retrieved ---->"+JSON.stringify(data));

    /*let newcontent = [];
     data.Items.map(item=>{
        //this.props.addStudent({id:item.property_ID,name:item.property_name,grade:item.rating,school:item.host_name});
        newcontent.push(<PhotoCard image={imgArr[i]}/>);
     })*/

     this.setState({searchItems:data.Items});

    //console.log("Data retrieved ---->"+JSON.stringify(item));

     //this.props.addStudent(item[0]);
     this.props.search(data);
  }

  deleteStudent(id)
  {
    let r = window.confirm("Do you want to delete this item");
    if( r === true)
    {
    this.props.deleteStudent(id);
   
  }
  }
  editStudentSubmit(id,name,grade,school)
  {
this.props.updateStudent({id:id,name:name,grade:grade,school:school});
  }
  paintCardImages(items){

     /*let imgArr =["https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(152).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(42).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(151).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(40).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(148).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(149).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(148).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(150).jpg",
                 "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(151).jpg"];*/

    let newcontent = [];

    for(var i=0;i<items.length;i++){
     newcontent.push(<PhotoCard property={items[i]}/>);
    }
    return newcontent;
    }
  render() {
    return (
      <div className="container-fluid">
    <div className="row mt-3"><div className="col-lg-12">
      <div className="card">
  <div className="card-header">
    Student Registry
  </div>
  <div className="card-body">
  <button className="btn btn-dark pull-left" onClick={this.addNewStudent}>Add New</button>

        {/*<div className="row" style={{display:'inline-flex'}}>{this.paintCardImages()}</div>*/}
        {this.state.searchItems.length>0?<div className="row" style={{display:'inline-flex'}}>{this.paintCardImages(this.state.searchItems)}</div>:null}
      </div></div></div></div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addStudent:addStudent,
    deleteStudent:deleteStudent,
    updateStudent:updateStudent,
    search:search
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
