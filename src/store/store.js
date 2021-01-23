import { createStore, applyMiddleware, } from 'redux';
import {composeWithDevTools, actionCreators,} from 'redux-devtools-extension';
// middlewares
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../Reducers';




const initialState = {};

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

/**
 * Create a Redux store that holds the app state.
 * 
 
 */
const composeEnhancers = composeWithDevTools({ 
    name: `Redux`,
    realtime: true,
    trace: true,
    traceLimit: 25
}); 

