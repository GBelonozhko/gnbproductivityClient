import React, { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
  CardHeader,Divider
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

const Journal = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.Auth.userId);
  const todoLists = useSelector((state) => state.Todos.todoLists);
  const completeCount = useSelector((state) => state.Todos.totalCompletes);
  const totalTasks = useSelector((state) => state.Todos.totalTasks);

  const [rating, setRating] = useState([]);

  useEffect(() => {
    dispatch(initCompleteCount(userId));
    dispatch(initTodoLists(userId));
    dispatch(initTotalTasks(userId));
  }, []);

const handleChangeRating = (listName, newRating) => {};

const handleSubmitJournal = () =>{};



  return (
    <div>
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
              

                
              

              <TextField fullWidth multiline={true} margin="normal" />
              <Button fullWidth>Submit</Button>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card>
              <List>
                {todoLists.map((listName) => (
                  <ListItem key={listName} divider>
                    <ListItemText>{listName}</ListItemText>

                    <Rating name="pristine" value={null} />
                  </ListItem>
                ))}
                <ListItem devider>
                  <ListItemText>Happiness</ListItemText>

                  <Rating name="pristine" value={null} />
                </ListItem>
<Divider/>
                <ListItem>
                  <ListItemText>Productivity <br/> {completeCount}</ListItemText>
                  <Rating name="pristine" value={null} />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Journal;
