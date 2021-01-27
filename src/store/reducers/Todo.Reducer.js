import * as actionTypes from '../actions/types';
import {updateObject} from '../../shared/utility';

const initialState= {
  todoLists:[],
  totalCompletes:0,
  totalTasks:0

};

const setTodoLists = (state, action) => {
  return updateObject(state,{
    todoLists:action.todoLists
  }

  )
};

const setTodoList = (state, action) => {
  return updateObject(state,{
   todos:action.todoListData
  }

  )
};

const setCompleteCount =(state, action) => {
  return updateObject(state,{
    totalCompletes:action.totalCompletes
  })
}

const setTotalTasks = (state, action) => {
  return updateObject(state, {totalTasks:action.totalTasks})
}



const reducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TODO_LISTS: return setTodoLists( state, action );
    case actionTypes.SET_TODOS: return setTodoList( state, action );
    case actionTypes.SET_COMPLETE_COUNT: return setCompleteCount( state, action );
    case actionTypes.SET_TOTAL_TASKS: return setTotalTasks( state, action );
    default: return state;
  }
}

export default reducer;