import React from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  makeStyles,
  Card,
  List,
  ListItemText, Checkbox, Switch,
  ListItem, ListItemIcon, ListItemSecondaryAction
} from "@material-ui/core";
import { IoIosSend } from "react-icons/io";
import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";
import { GiClockwork } from "react-icons/gi"


const GoalList = (props) => {




  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    archive: {
      float: "right",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant='h2'>{props.title}</Typography>
      <TextField
        id='standard-basic'
        label='Enter New Goal'
        fullWidth
        margin='normal'
        name='task'
        value={props.newtask.task}
        onChange={e=>props.handleChangeNewTask(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={e => props.handleSubmitNewTodo(e)}>
                <IoIosSend />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <IconButton onClick={()=> props.handleArchiveComplete(false, props.title)}>
        <BiArchiveIn />
      </IconButton>
      <IconButton className={classes.archive}>
        <BiArchiveOut onClick={()=> props.handleArchiveComplete(true,props.title)}/>
      </IconButton>

      <Card>
        <List className={classes.root}>
          {props.todos.map((todo) => {
            const labelId = `checkbox-list-label-${todo.task}`;
          return(
            todo.isVisible == true ? (
              <ListItem
                key={todo._id}
                role={undefined}
                dense
                button
                onClick={props.handleToggle(todo)}>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={todo.isComplete}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo.task} />
                <ListItemSecondaryAction>
                  <Switch color='primary' />
                  <IconButton edge='end' aria-label='comments'>
                    <GiClockwork />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ):null
          )
          })}
        </List>
      </Card>
    </div>
  );
};

export default GoalList;
