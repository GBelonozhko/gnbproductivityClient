import React, { useState } from "react";
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
import * as action from "../store/actions/Auth.Action";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

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
  const dispatch = useDispatch();
  const classes = useStyles();

  const auth = useSelector((state) => state.Auth);

  const [isSignup, setIsSignup] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    dispatch(action.auth(email, password, isSignup));
  };

  const redirectUser = () => {
    if (auth.userId !== null) {
      return <Redirect to='/listselection' />;
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth='md'>
        <Card className='AuthTopMargin'>
          <Typography
            variant='h3'
            color='primary'
            align='center'
            component='h2'>
            {isSignup ? "Sign Up" : "Sign In"}
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
            <form>
              <Grid className={classes.spaceBetween}>
                <TextField
                  fullwidth
                  variant='outlined'
                  label='Enter Email'
                  type='email'
                  onChange={handleChange("email")}
                  value={email}
                />
              </Grid>

              <Grid className={classes.spaceBetween}>
                <TextField
                  fullwidth
                  variant='outlined'
                  label='Enter Password'
                  type='password'
                  value={password}
                  onChange={handleChange("password")}
                />
              </Grid>
              <Grid className={classes.spaceBetween}>
                <Button
                  type='submit'
                  onClick={clickSubmit}
                  variant='contained'
                  color='primary'
                  fullWidth>
                  Submit
                </Button>
              </Grid>
              <Grid>
                <Button fullWidth onClick={()=>setIsSignup(!isSignup)}>{!isSignup?'New User':'Login'} </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Container>
      {redirectUser()}
    </React.Fragment>
  );
};

export default Auth;
