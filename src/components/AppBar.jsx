import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { MdMenu } from "react-icons/md";
import { GiCyberEye } from "react-icons/gi";
import Drawer from './Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:'20px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration:'line-through'
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
        <IconButton color='inherit'><GiCyberEye/></IconButton>
       
          <Typography variant='h6' className={classes.title} >
            Productive
          </Typography>
       
          <Drawer/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
