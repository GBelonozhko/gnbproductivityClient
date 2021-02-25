import React, { useEffect, useState } from "react";

import {
  Container,
  Card,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  CardHeader,
  Divider,
  CircularProgress,
  Chip,
  Modal,
  Fade,
  makeStyles,
  Backdrop,
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import Rating from "@material-ui/lab/Rating";
import { useSelector, useDispatch } from "react-redux";
import {
  initTodoLists,
  setTodoLists,
  initCompleteCount,
  initTotalTasks,
  setCompleteCount,
} from "../store/actions/ToDo.Action";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },

  archive: {
    float: "right",
  },
}));

const Journal = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userId = useSelector((state) => state.Auth.userId);
  const todoLists = useSelector((state) => state.Todos.todoLists);
  const completeCount = useSelector((state) => state.Todos.totalCompletes);
  const totalTasks = useSelector((state) => state.Todos.totalTasks);

  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState([0, 0]);
  const [catagory, setCatagory] = useState(["Happieness", "Productivity"]);
  const [journal, setJournal] = useState("");
  const [previousJournals, setpreviousJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState({ rating: [] });
  const [limit, setLimit] = useState(2);
  const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);

  useEffect(() => {
    dispatch(initCompleteCount(userId));
    dispatch(initTodoLists(userId));
    dispatch(initTotalTasks(userId));
    constructRatings();
    initJournal();
  }, []);

  const constructRatings = () => {
    let ratingObj = rating;
    let catagoryObj = catagory;
    todoLists.map((catagory) => {
      ratingObj.push(0);
      catagoryObj.push(catagory);
    });
    setRating(ratingObj);
  };

  const initJournal = () => {
    axios.get(`api/alljournals/${userId}`).then((res) => {
      setpreviousJournals(res.data.journals);
    });
  };

  const handleGetEntry = (journal) => {
    setSelectedJournal(journal);
    console.log(selectedJournal);
  };

  const handleChangeRating = (index, newRating) => {
    setIsLoading(true);
    let ratingObj = rating;
    ratingObj[index] = newRating;
    setRating(ratingObj);

    setIsLoading(false);
    console.log(rating);
  };

  const handleSubmitJournal = () => {
    let ratingObj = [];
    catagory.map((catagory, i) => {
      ratingObj.push({ catagory: catagory, rating: rating[i] });
    });
    const submitObj = { creator: userId, journal: journal, rating: ratingObj };

    axios.post("api/addjournal/", { journalEntry: submitObj });
  };

  return (
    <div>
      {!isLoading ? (
        <Container>
          <Grid
            container
            direction='row'
            justify='space-evenly'
            >
            <Grid item xs={8}>
              <Typography variant='h3' align='center' color='secondary'>
                Journal Entry
              </Typography>
              <Card>
                <form>
                  <TextField
                    fullWidth
                    multiline={true}
                    margin='normal'
                    value={journal}
                    onChange={(event) => setJournal(event.target.value)}
                  />
                  <Button type='submit' fullWidth onClick={handleSubmitJournal}>
                    Submit
                  </Button>
                </form>
              </Card>
              <Card className='AuthTopMargin'>
                <Grid
                  container
                  direction='row'
                  justify='space-evenly'
                  alignItems='center'>
                  {previousJournals.map((journali) => {
                    return (
                      <div key={journali._id}>
                        <Grid xs={3}>
                          <Typography variant='body1' gutterBottom display='block'>
                            {journali.journal}
                          </Typography>
                        </Grid>
                        <Grid xs={3}>
                          {journali.rating.map((rate) => {
                            return (
                              <div>
                                {rate.catagory}
                                <Rating
                                  value={rate.rating}
                                  disabled
                                  precision={0.5}
                                />
                              </div>
                            );
                          })}
                        </Grid>
                      </div>
                    );
                  })}
                  <Pagination count={10} color="primary" />
                </Grid>
                
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card>
                <List>
                  <Divider />
                  {rating.map((listName, i) => (
                    <ListItem key={i} divider>
                      <ListItemText>{catagory[i]}</ListItemText>

                      <Rating
                        name={catagory[i]}
                        value={listName.rating}
                        onChange={(event, newValue) => {
                          handleChangeRating(i, newValue);
                        }}
                        precision={0.5}
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Journal;
