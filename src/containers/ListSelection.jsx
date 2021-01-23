import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";

import { IoIosSend } from "react-icons/io";
import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";
import { GiClockwork } from "react-icons/gi";

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

const ListSelection = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <Container maxWidth='md'>
      <Card>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid>
            <TextField
              id='standard-basic'
              label='Enter New Goal List'
              fullWidth
              margin='normal'
              endAdorn
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
          </Grid>
        </Grid>
      </Card>

      <Card className='AuthTopMargin'>
        <CardActions onClick={handleOpen}>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid xs={3}>
              <Typography>Completes: 0 / Incompletes:0</Typography>
            </Grid>

            <Grid xs={5}>
              <Typography align='center' variant='h3'>
                Goal List Title
              </Typography>
            </Grid>

            <Grid xs={3}></Grid>
            <IconButton>
              <IoIosSend />
            </IconButton>
          </Grid>
        </CardActions>
      </Card>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant='h2'>Goal List Title</Typography>
            <TextField
              id='standard-basic'
              label='Enter New Goal'
              fullWidth
              margin='normal'
              endAdorn
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
                      <ListItemText
                        id={labelId}
                        primary={`Line item ${value + 1}`}
                      />
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
        </Fade>
      </Modal>
    </Container>
  );
};

export default ListSelection;