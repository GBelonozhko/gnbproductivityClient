import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";

const FeatureToDoList = (props) => {
  return (
    <React.Fragment  >
      
      <Button
        variant='contained'
        color='default'
        onClick={() => props.handleOpen("InCompletes")}>
        In Completes
      </Button>

      

      <Button
        variant='contained'
        color='secondary'
        onClick={() => props.handleOpen("TodaysAgenda")}>
        Todays Agenda
      </Button>


      <Button
        variant='contained'
        color='primary'
        onClick={() => props.handleOpen("ActiveRoutines")}>
        Active Routines
      </Button>

      <Button
        variant='contained'
        color='default'
        onClick={() => props.handleOpen("OverDue")}>
        Over Due
      </Button>
      
    </React.Fragment>
  );
};

export default FeatureToDoList;
