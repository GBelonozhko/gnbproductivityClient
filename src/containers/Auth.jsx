import React from "react";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { GiKeyLock } from "react-icons/gi";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },

  spaceBetween: {
    marginTop: "1rem",
  },
}));

const Auth = () => {
  const classes = useStyles();
  return (
    <React.Fragment >
      <Container maxWidth='md'>
        <Card className='AuthTopMargin'>
          <Typography
            variant='h3'
            color='primary'
            align='center'
            component='h2'>
            Sign In / Up
          </Typography>
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='center'>
            <Grid>
              <Avatar className={classes.green} sizes='lg'>
                <GiKeyLock />
              </Avatar>
            </Grid>

            <Grid className={classes.spaceBetween}>
              <TextField
                fullwidth
                variant='outlined'
                label='Enter Email'
                type='email'
              />
            </Grid>

            <Grid className={classes.spaceBetween}>
              <TextField
                fullwidth
                variant='outlined'
                label='Enter Password'
                type='password'
              />
            </Grid>
            <Grid className={classes.spaceBetween}>
              <Button variant='contained' color ='primary'>Submit</Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Auth;
