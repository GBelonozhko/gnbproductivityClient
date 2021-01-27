import { combineReducers } from 'redux';

import Auth from './Auth.Reducer';
import Todos from './Todo.Reducer';

export default combineReducers({

    Auth,
    Todos
});
