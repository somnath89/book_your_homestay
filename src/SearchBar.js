import React,{useState,useEffect,useRef} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import SearchResults from './Home/SearchResults.js';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    /*height: '100%',*/
    /*position: 'absolute',*/
    /*pointerEvents: 'none',*/
    borderRadius:'50px',
    border:'1px solid grey',
    display: 'flex',
    alignItems: 'center',
    color:'white',
    margin:'10px',
    backgroundColor:'black',
    justifyContent: 'center',
  }
}));

export default function SearchBar(props) {
    const classes = useStyles();
    const [state, setState] = useState({location: "",checkin:"",checkout:""});
    const stateRef = useRef(state);

    stateRef.current  = state;

   /* useEffect(() => {
       console.log('Do something after counter has changed', counter);
    }, [counter]);*/

    const handleLocationChange = (event)=>{
        setState({...state, location: event.target.value});
    };
    const handleCheckInChange = (event)=>{
        setState({...state, checkin: event.target.value});
    };
    const handleCheckOutChange = (event)=>{
            setState({...state, checkout: event.target.value});
        };
    const handleClick = async (text) =>{

      console.log(state);
      const requestOptions = {
              method: 'POST',
              /*mode:'no-cors',*/
              headers: { 'Access-Control-Allow-Origin':'*','Accept': 'application/json','Content-Type': 'application/json' },
              body: JSON.stringify({location: state.location})
          };

      /*fetch('https://5jvdsw44gj.execute-api.us-east-1.amazonaws.com/uat/searchStays',requestOptions)
        .then(response => {
           console.log(response);
            return response.json();
        })
        .then(data => console.info("Data received--->"+JSON.stringify(data)));
*/
   const response = await fetch('https://5jvdsw44gj.execute-api.us-east-1.amazonaws.com/uat/searchStays',requestOptions);
   const data = await response.json();

   console.log("Data retrieved ---->"+JSON.stringify(data));
   }
  return (
    <div className={classes.grow}>
      <Paper elevation={3} style={{display:'flex',padding:'10px',position:'fixed',right:'230px',top:'6px'}}>
           <TextField id="outlined-basic" label="Location" variant="outlined" style={{padding:'5px'}} onChange={(e) => handleLocationChange(e)}/>
           <TextField id="outlined-basic" label="Check-In" variant="outlined" style={{padding:'5px'}} onChange={(e) => handleCheckInChange(e)}/>
           <TextField id="outlined-basic" label="Check-Out" variant="outlined" style={{padding:'5px'}} onChange={(e) =>handleCheckOutChange(e)}/>
           <div className={classes.searchIcon} onClick={(e) => handleClick("Search")}><SearchIcon/>Search</div>
      </Paper>
     </div>
  );
}
