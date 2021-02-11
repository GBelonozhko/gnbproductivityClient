import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Container,
  Card,
  TextField,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const Journal = () => {
  const [value, setValue] = React.useState(2);

  return (
    <div>
      <Container>
        <Grid
          container
          direction='row'
          justify='space-evenly'
          alignItems='center'>
          <Grid item xs={8}>
            <Card>
              <TextField fullWidth multiline={true} margin='normal' />
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card>
              <List>
                <ListItem>
                  health
                  <Rating name='pristine' value={null} />
                </ListItem>
                <ListItem>
                  DEV
                  <Rating name='pristine' value={null} />
                </ListItem>
                <ListItem>
                  Prof
                  <Rating name='pristine' value={null} />
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
