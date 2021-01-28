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

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };


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
      <Typography variant='h2'>Goal List Title</Typography>
      <TextField
        id='standard-basic'
        label='Enter New Goal'
        fullWidth
        margin='normal'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton>
                <IoIosSend />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <IconButton>
        <BiArchiveIn />
      </IconButton>
      <IconButton className={classes.archive}>
        <BiArchiveOut />
      </IconButton>

      <Card>
        <List className={classes.root}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemSecondaryAction>
                  <Switch color='primary' />
                  <IconButton edge='end' aria-label='comments'>
                    <GiClockwork />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
  );
};

export default GoalList;
