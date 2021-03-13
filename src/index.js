import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import Amplify from 'aws-amplify';
import config from './aws-exports';

import { Provider } from "react-redux";
import {createStore} from 'redux';
import reducer from './reducers/index';

let initialState = {
  loading:false,
  search_results: [],
  user_listed_properties:[]
};

const store = createStore(reducer,initialState);

Amplify.configure(config);

Amplify.configure({Interactions: {
                  bots: {
                    "BookYourHomestay": {
                      "name": "BookYourHomestay",
                      "alias": "$LATEST",
                      "region": "us-east-1",
                    },
                  }
                }
             })

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <BrowserRouter>
      <App/>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

