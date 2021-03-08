import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Auth from './containers/Auth.jsx';
import FitnessTracker from './containers/FitnessTracker.jsx';
import Agenda from './containers/Agenda.jsx';
import Journal from './containers/Journal.jsx';
import JournalEntry from './containers/JournalEntry.jsx';
import ListSelection from './containers/ListSelection.jsx';
import GoalList from './components/GoalList'

import AppBar from './components/AppBar.jsx';
import BottomNav from './components/BottomNav';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/Auth.Action'

const Routes =() =>{

  const dispatch = useDispatch()

  useEffect (() => { 
   dispatch(actions.authCheckState())
      
  
  },  []  );


  
    return(
        <BrowserRouter>
        <AppBar/>
        <Switch>
        <Route path ='/' exact component={Auth}/>
        <Route path ='/signup' exact component={Auth}/>
        <Route path ='/ListSelection' exact component={ListSelection}/>

        <Route path ='/FitnessTracker' exact component={FitnessTracker}/>
        <Route path ='/JournalEntry' exact component={JournalEntry}/>

        </Switch>
        <BottomNav/>
        </BrowserRouter>
    );

}

export default Routes