import  Button  from '@material-ui/core/Button';
import  TextField  from '@material-ui/core/TextField';
import  Card from '@material-ui/core/Card';
import React from 'react';

const JournalSubmit =(props) =>{

    return(
        <Card>
        <form>
          <TextField
            fullWidth
            multiline={true}
            margin='normal'
            value={props.journal}
            onChange={(event) => props.setJournal(event.target.value)}
          />
          <Button type='submit' fullWidth onClick={props.handleSubmitJournal}>
            Submit
          </Button>
        </form>
      </Card>
    )
}

export default JournalSubmit;