import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";

import { IoLogIn } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { CgPlayListCheck } from "react-icons/cg";
import { BsGraphUp } from "react-icons/bs";
import { FaJournalWhills } from "react-icons/fa";
import { GiScrollQuill } from "react-icons/gi";
import { MdMenu } from "react-icons/md";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <Link href='/'>
          <ListItem button>
            <ListItemIcon>
              <IoLogIn />
            </ListItemIcon>
            <ListItemText primary={"Sign In"} />
          </ListItem>
          <Divider />
        </Link>
        <Link href='/signup'>
          <ListItem button>
            <ListItemIcon>
              <FaUserAstronaut />
            </ListItemIcon>
            <ListItemText primary={"Sign Up"} />
          </ListItem>
          <Divider />
        </Link>

        <Link href='/ListSelection'>
          <ListItem button>
            <ListItemIcon>
              <GoChecklist />
            </ListItemIcon>
            <ListItemText primary={"List Selection"} />
          </ListItem>
          <Divider />
        </Link>
        <Link href='/FitnessTracker'>
          <ListItem button href='/FitnessTracker'>
            <ListItemIcon>
              <BsGraphUp />
            </ListItemIcon>
            <ListItemText primary={"Tracker"} />
          </ListItem>
          <Divider />
        </Link>
        <Link href='/JournalEntry'>
          <ListItem button href='/JournalEntry'>
            <ListItemIcon>
              <GiScrollQuill />
            </ListItemIcon>
            <ListItemText primary={"Journal Entry"} />
          </ListItem>
          <Divider />
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton color='inherit' onClick={toggleDrawer(anchor, true)}>
            <MdMenu />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
