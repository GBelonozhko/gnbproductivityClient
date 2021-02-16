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
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useSelector, useDispatch } from "react-redux";
import {
  initTodoLists,
  setTodoLists,
  initCompleteCount,
  initTotalTasks,
  setCompleteCount,
} from "../store/actions/ToDo.Action";
import { updateObject } from "../shared/utility";
import RatingComp from "../components/Rating";

const Journal = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.Auth.userId);
  const todoLists = useSelector((state) => state.Todos.todoLists);
  const completeCount = useSelector((state) => state.Todos.totalCompletes);
  const totalTasks = useSelector((state) => state.Todos.totalTasks);

  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState([
    { catagory: "Happiness", rating: 0 },
    { catagory: "Productivity", rating: 0 },
  ]);

  useEffect(() => {
    dispatch(initCompleteCount(userId));
    dispatch(initTodoLists(userId));
    dispatch(initTotalTasks(userId));
    constructRatings();
  }, []);

  const constructRatings = () => {
    let ratingObj = rating;
    todoLists.map((catagory) => {
      ratingObj.push({ catagory: catagory, rating: 0 });
    });
    setRating(ratingObj);
  };

  const handleChangeRating = (listName, newRating) => {
    setIsLoading(true);
    let ratingObj = rating;
    const rIndex = ratingObj.findIndex((obj) => obj.catagory === listName);
    ratingObj[rIndex] = { catagory: listName, rating: newRating };
    setRating(ratingObj);
    setIsLoading(false);
    console.log(ratingObj);
  };

  const handleSubmitJournal = () => {};

  return (
    <div>
      {!isLoading ? (
        <Container>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item xs={8}>
              <Typography variant="h3" align="center" color="secondary">
                Journal Entry
              </Typography>
              <Card>
                <form>
                  <TextField fullWidth multiline={true} margin="normal" />
                  <Button type="submit" fullWidth onClick={() => {}}>
                    Submit
                  </Button>
                </form>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card>
                <List>
                  {rating.map((listName) => (
                    <ListItem key={listName.catagory} divider>
                      <ListItemText>{listName.catagory}</ListItemText>
                      <RatingComp catagory={listName.catagory} value={listName.rating} changeValue={handleChangeRating} />

                      <Rating
                        name={listName.catagory}
                        value={listName.rating}
                        onChange={(event, newValue) => {
                          handleChangeRating(listName.catagory, newValue);
                        }}
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
