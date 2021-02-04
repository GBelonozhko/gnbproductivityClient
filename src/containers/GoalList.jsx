import React, { useRef } from "react";
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
  ListItemSecondaryAction,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Button,
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

  const hours = useRef(0);
  const minutes = useRef(0);

  const classes = useStyles();

  return (
    <div className={classes.paper}>
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
              <ListItem
                key={todo._id}
                divider
                button
                onClick={props.handleToggle(todo)}>
                <ListItemIcon>
                  <Checkbox edge='start' checked={todo.isComplete} />
                  <Switch
                    color='primary'
                    checked={todo.isRoutine}
                    onChange={() => props.handleToggleRoutineSwitch(todo)}
                    edge='end'
                  />
                </ListItemIcon>
                <ListItemText> {todo.task} </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      props.setopenDialog(true);
                    }}
                    aria-label='comments'>
                    <GiClockwork />
                  </IconButton>
                  <Dialog
                    open={props.openDialog}
                    onClose={() => {
                      props.setopenDialog(false);
                    }}>
                    <DialogTitle>Save Complete Time </DialogTitle>
                    <DialogContent>
                      <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                          <TextField
                            type='number'
                            id='hours'
                            label='Enter Hours'
                            ref={hours}
                          />
                          <TextField
                            type='number'
                            id='minutes'
                            label='Enter Minutes'
                            ref={minutes}
                          />
                        </FormControl>
                      </form>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => props.setopenDialog(false)}
                        color='primary'>
                        Cancel
                      </Button>
                      <Button
                        onClick={() =>
                          props.handleSubmitDuration(todo._id, {
                            hours: hours,
                            minutes: minutes,
                          })
                        }
                        color='primary'>
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ListItemSecondaryAction>
              </ListItem>
            ) : null;
          })}
        </List>
      </Card>
    </div>
  );
};

export default GoalList;
