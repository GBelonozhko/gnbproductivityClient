import React, { useState, useCallback } from 'react';
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

import AppBar from './components/AppBar.jsx';

const Routes =() =>{

    return(
        <BrowserRouter>
        <AppBar/>
        <Switch>
        <Route path ='/' exact component={Auth}/>
        <Route path ='/signup' exact component={Auth}/>
        <Route path ='/ListSelection' exact component={ListSelection}/>
        <Route path ='/Agenda' exact component={Agenda}/>
        <Route path ='/FitnessTracker' exact component={FitnessTracker}/>
        <Route path ='/JournalEntry' exact component={JournalEntry}/>
        <Route path ='/Journal' exact component={Journal}/>
        </Switch>
        </BrowserRouter>
    );

}

export default Routes