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
  Grid,CircularProgress
} from "@material-ui/core";
import { IoIosSend } from "react-icons/io";
import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";
import { GiClockwork } from "react-icons/gi";

const GoalList = (props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(7, 10, 7),
    },

    archive: {
      float: "right",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paper}>
    {props.isLoading === false ? (<div>
      <Typography variant='h2'>{props.title}</Typography>
      {props.title !== "TodaysAgenda" &&
      props.title !== "InCompletes" &&
      props.title !== "OverDue" ? (
        <div>
          <TextField
            id='standard-basic'
            label='Enter New Goal'
            fullWidth
            margin='normal'
            name='task'
            value={props.newtask.task}
            onChange={(e) => props.handleChangeNewTask(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={(e) => props.handleSubmitNewTodo(e)}>
                    <IoIosSend />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
        <List>
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
                  <ListItemText> {todo.task}</ListItemText>

                  <Checkbox
                    edge='start'
                    checked={todo.isComplete}
                    onClick={props.handleToggle(todo)}
                  />
                  <Grid xs={4}>
                    <TextField
                      id='time'
                      label='Start Time'
                      type='time'
                      defaultValue=''
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id='time'
                      label='Complete Time'
                      type='time'
                      defaultValue=''
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />

                  
                  </Grid>
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
