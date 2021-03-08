import { GiBookmarklet } from "react-icons/gi";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { IoLogIn } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { CgPlayListCheck } from "react-icons/cg";
import { BsGraphUp } from "react-icons/bs";
import { FaJournalWhills } from "react-icons/fa";
import { GiScrollQuill } from "react-icons/gi";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}>
      <BottomNavigationAction
        label='List Selection'
        icon={
          <Link to='/ListSelection'>
            {" "}
            <GoChecklist />{" "}
          </Link>
        }
      />

      <BottomNavigationAction
        label='Tracker'
        icon={
          <Link to='/FitnessTracker'>
            {" "}
            <BsGraphUp />{" "}
          </Link>
        }
      />
      <BottomNavigationAction
        label='Journal'
        icon={
          <Link to='/JournalEntry'>
            {" "}
            <GiScrollQuill />{" "}
          </Link>
        }
      />
    </BottomNavigation>
  );
}
