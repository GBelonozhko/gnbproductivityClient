import axios from 'axios';

import * as actionTypes from './types';


export const initTodoLists = (userId) =>{
  return dispatch => {
    axios.get(`api/todolists/${userId}`, {params:{"userId":userId}})
      .then( res => {
        console.log(res.data.todos)
        dispatch(setTodoLists(res.data.todos));
    }).catch(error => {
      dispatch(fetchTodosFailed())
    })

  };
};

export const setTodoLists =(TodoListTitles) => {
  return {
    type: actionTypes.SET_TODO_LISTS,
    todoLists:TodoListTitles
  }
}

export const initCompleteCount = (userId) => {
  return  dispatch => {
    axios.get(`api/todolistCompletes/${userId}`)
      .then(res => {
        dispatch(setCompleteCount(res.data.Completes))
      })
  }
}

export const setCompleteCount = (CompleteCount) => {
  return {
    type: actionTypes.SET_COMPLETE_COUNT,
    totalCompletes:CompleteCount
  }
}

export const initTotalTasks = (userId) => {
  return dispatch => {
    axios.get(`api/todolisttasksCreated/${userId}`)
      .then(res => {
        dispatch(setTotalTasks(res.data.totalTasks))
      } )
  }
}

export const setTotalTasks = (totalTasks) => {
  return {
    type:actionTypes.SET_TOTAL_TASKS,
    totalTasks:totalTasks
  }
}


export const initTodoList = () =>{
  return dispatch => {
  axios.get(`/api/todolistdata`)
    .then(res=>{
      console.log(res)
      dispatch(setTodoList(res.todos))
    })
    .catch(error => {
      dispatch(fetchTodosFailed())
    })
  }
}

export const setTodoList =(Todos) => {
  return {
    type: actionTypes.SET_TODOS,
    todos:Todos
  }
}


export const fetchTodosFailed = () => {
  return {
      type: actionTypes.FETCH_TODOS_FAILED
  };
};



