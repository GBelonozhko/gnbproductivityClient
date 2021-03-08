import  Typography  from '@material-ui/core/Typography';
import  Grid  from '@material-ui/core/Grid';
import  CardActions  from '@material-ui/core/CardActions';
import  Card  from '@material-ui/core/Card';
import React from "react";

const TodoListTitles = (props) => {
  return (
    <React.Fragment>
      {props.todoLists.map((title) => (
        <Card key={title} className='AuthTopMargin'>
          <CardActions onClick={() => props.handleOpen(title)}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'>
              <Grid item>
                <Typography variant='h4' align='center'>
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default TodoListTitles;
