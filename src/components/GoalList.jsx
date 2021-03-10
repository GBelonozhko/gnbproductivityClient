import React from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  makeStyles,
  Card,
  List,
  ListItemText,
  Checkbox,
  Switch,
  ListItem,
  ListItemIcon,
  Grid,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
import { IoIosSend } from "react-icons/io";
import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";
import { GiClockwork, GiMonumentValley } from "react-icons/gi";
import { MdCheck } from "react-icons/md";

import moment from "moment";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const GoalList = (props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(7, 10, 7),
    },

    root: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 400,
      
    },

    fabProgress: {
      color: green[500],
      position: "absolute",
      top: -6,
      left: -6,
      zIndex: 1,
    },

    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },

    archive: {
      float: "right",
    },
  }));

  const classes = useStyles();
  

  return (
    <div className={classes.paper}>
      {props.isLoading === false ? (
        <div>
          <Typography variant='h2'>{props.title}</Typography>
          {props.title !== "TodaysAgenda" &&
          props.title !== "InCompletes" &&
          props.title !== "OverDue" &&
          props.title !== "ActiveRoutines" ? (
            <div>
            <form>
              <TextField
                id='standard-basic'
                label='Enter New Goal'
                fullWidth
                autoFocus
                margin='normal'
                name='task'
                value={props.newtask.task}
                onChange={(e) => props.handleChangeNewTask(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton type='submit' onClick={(e) => props.handleSubmitNewTodo(e)}>
                        <IoIosSend />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </form>
              <IconButton
                onClick={() => props.handleArchiveComplete(false, props.title)}>
                <BiArchiveIn />
              </IconButton>
              <IconButton className={classes.archive}>
                <BiArchiveOut
                  onClick={() => props.handleArchiveComplete(true, props.title)}
                />
              </IconButton>
            </div>
          ) : null}
          <Card>
            <List className={classes.root} >
              {props.todos.map((todo) => {
                return todo.isVisible === true ? (
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'>
                    <ListItem key={todo._id} divider>
                    
                      <ListItemIcon>
                        <Switch
                          color='primary'
                          checked={todo.isRoutine}
                          onChange={() => props.handleToggleRoutineSwitch(todo)}
                          edge='end'
                        />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        {todo.task} <br />{" "}
                        {moment(todo.createdAt).fromNow(true)} ago
                      </ListItemText>

                      <Grid xs={2}>
          


                        {(props.inProgress === "" || props.inProgress === todo._id) &&
                          todo.endTime == null && (
                            <div className={classes.wrapper}>
                              <Fab
                                aria-label='save'
                                color='primary'
                                className={props.buttonClassname}
                                onClick={() => props.handleTimerButtonClick(todo)}
                                size='small'>
                                {props.success ? <MdCheck /> : <GiClockwork />}
                              </Fab>
                              {props.timerOn && (
                                <CircularProgress
                                  size={53}
                                  className={classes.fabProgress}
                                  onClick={() => props.handleTimerButtonClick(todo)}
                                />
                              )}
                            </div>
                          )}
                      </Grid>
                      {todo.endTime !== null && (
                        <Checkbox
                          edge='start'
                          checked={todo.isComplete}
                          onClick={props.handleToggle(todo)}
                        />
                      )}
                    </ListItem>
                  </Grid>
                ) : null;
              })}
            </List>
          </Card>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default GoalList;
