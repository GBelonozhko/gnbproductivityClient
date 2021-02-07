import React, { useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import { IoIosSend } from "react-icons/io";

import {
  initTodoLists,
  setTodoLists,
  initCompleteCount,
  initTotalTasks,
  setCompleteCount,
} from "../store/actions/ToDo.Action";
import { useSelector, useDispatch } from "react-redux";
import GoalList from "./GoalList";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },

  archive: {
    float: "right",
  },
}));

const ListSelection = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.Auth.userId);
  const todoLists = useSelector((state) => state.Todos.todoLists);
  const completeCount = useSelector((state) => state.Todos.totalCompletes);
  const totalTasks = useSelector((state) => state.Todos.totalTasks);

  const [newtask, setnewtask] = useState({
    title: "",
    creator: userId,
    task: "create a list",
    isComplete: false,
    isVisible: true,
  });

  const [openDialog, setopenDialog] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([0]);
  const [switchedOn, setSwitchedOn] = useState([]);
  const [selected, setSelected] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  
  const classes = useStyles();

  useEffect(() => {
    dispatch(initCompleteCount(userId));
    dispatch(initTodoLists(userId));
    dispatch(initTotalTasks(userId));
  }, []);

  const initTodos = (todoListName) => {
    axios
      .get(`/api/todolist/${userId}/${todoListName}`)
      .then((res) => setTodos(res.data.todoData));
  };

  const handleOpen = (title) => {
    setIsLoading(true);
    setSelected(title);
    setnewtask({
      title: title,
      task: "",
      isComplete: false,
      isVisible: true,
      creator: userId,
    });
    initTodos(title);
    setOpen(true);
    setIsLoading(false);

    console.log(selected);
  };


  const handleClose = () => {
    setIsLoading(true);
    setSelected();
    setnewtask({
      title: "",
      creator: userId,
      task: "create a list",
      isComplete: false,
      isVisible: true,
    });
    setOpen(false);
    setIsLoading(false);
  };

  const handleToggleComplete = (todo) => () => {
    let isCompleteData = true;
    todo.isComplete == isCompleteData
      ? (isCompleteData = false)
      : (isCompleteData = true);

    axios
      .patch(`api/CompleteTodo/${todo._id}`, { isCompleteData })
      .then((res) => {
        axios.get(`api/todolistCompletes/${userId}`).then((res) => {
          dispatch(setCompleteCount(res.data.Completes));
        });
      });
    let dtodos = todos.map((dtodo, i) =>
      dtodo._id == todo._id ? { ...todo, isComplete: isCompleteData } : todos[i]
    );
    setTodos(dtodos);
  };

  const handleToggleRoutineSwitch = (todo) => {
    let isRoutineData = true;
    todo.isRoutine == isRoutineData
      ? (isRoutineData = false)
      : (isRoutineData = true);
    axios.patch(`/api/toggleRoutine/${todo._id}`, { isRoutineData });
    let dtodos = todos.map((dtodo, i) =>
      dtodo._id == todo._id ? { ...todo, isRoutine: isRoutineData } : todos[i]
    );
    setTodos(dtodos);
  };

  const handleSubmitNewTodoList = () => {
    axios.post("/api/addTodo/", { newtask }).then(() => {
      dispatch(initTodoLists(userId));
      dispatch(initTotalTasks(userId));
    });
    setnewtask({
      title: "",
      creator: userId,
      task: "create a list",
      isComplete: false,
      isVisible: true,
    });
  };

  const handleChangeNewTodoList = (event) => {
    setnewtask({
      [event.target.name]: event.target.value,
      task: "create a list",
      creator: userId,
    });
  };

  const handleSubmitNewTodo = () => {
    setIsLoading(true);
    setnewtask({ ...newtask, title: selected });
    axios.post("/api/addTodo", { newtask }).then((res) => {
      console.log(res.data);
      let ftodos = todos;
      ftodos.push(res.data);
      console.log(ftodos);
      setTodos(ftodos);
      dispatch(initTotalTasks(userId));
      setIsLoading(false);
      setnewtask({
        title: selected,
        task: "",
        isComplete: false,
        isVisible: true,
        creator: userId,
      });
    });
  };

  const handleChangeNewTask = (event) => {
    setnewtask({ ...newtask, [event.target.name]: event.target.value });
  };

  const handleArchiveComplete = (archiveStatus, todoListName) => {
    setIsLoading(true)
    let isVisibleData = archiveStatus;
    axios
      .patch(`api/archiveTodo/${userId}/${todoListName}`, { isVisibleData })
      .then(
        axios
          .get(`/api/todolist/${userId}/${todoListName}`)
          .then((res) => setTodos(res.data.todoData))
      );
    setIsLoading(false)
  };

  return (
    <Container maxWidth='lg'>
      <Card>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={10}>
            <TextField
              name='title'
              label='Enter New Goal List'
              fullWidth
              margin='normal'
              value={newtask.title}
              onChange={(e) => handleChangeNewTodoList(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleSubmitNewTodoList}>
                      <IoIosSend />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='caption' color='initial'>
              Completed Total of {completeCount} tasks of {totalTasks} tasks
              created!
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Card className='AuthTopMargin'>
        <CardActions onClick={() => handleOpen("TodaysAgenda")}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <Typography variant='h4' align='center'>
                Todays Agenda
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      <Card className='AuthTopMargin'>
        <CardActions onClick={() => handleOpen("InCompletes")}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <Typography variant='h4' align='center'>
                In Completes
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      <Card className='AuthTopMargin'>
        <CardActions onClick={() => handleOpen("OverDue")}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <Typography variant='h4' align='center'>
                Over Due
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>

      {todoLists.map((title) => (
        <Card key={title} className='AuthTopMargin'>
          <CardActions onClick={() => handleOpen(title)}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'>
              <Grid item>
                <Typography variant='h4' align='center'>
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ))}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          {isLoading === false ? (
            <GoalList
              title={selected}
              handleToggle={handleToggleComplete}
              checked={checked}
              todos={todos}
              handleSubmitNewTodo={handleSubmitNewTodo}
              handleChangeNewTask={handleChangeNewTask}
              newtask={newtask}
              handleArchiveComplete={handleArchiveComplete}
              handleToggleRoutineSwitch={handleToggleRoutineSwitch}
              openDialog={openDialog}
              setopenDialog={setopenDialog}
              isLoading={isLoading}
            />
          ) : (
            <CircularProgress />
          )}
        </Fade>
      </Modal>
    </Container>
  );
};

export default ListSelection;
