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
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Select,
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
      padding: theme.spacing(10, 20, 10),
      margin: theme.spacing(2, 4, 3),
    },

    archive: {
      float: "right",
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

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
                  <IconButton onClick={handleClickAnchor} aria-label='comments'>
                    <GiClockwork />
                  </IconButton>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseAnchor}>
                    <MenuItem onClick={handleCloseAnchor}>
                      <Select>
            
                      </Select>
                    </MenuItem>
                  </Menu>
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
