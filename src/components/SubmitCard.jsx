import { Typography } from '@material-ui/core';
import { IoIosSend } from 'react-icons/io';
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton } from '@material-ui/core';

const SubmitCard = (props) => {

    return(
        <Card className='MBSmall'>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={10}>
            <TextField
              name={props.name}
              label={props.label}
              fullWidth
              margin='normal'
              value={props.newtask.title}
              onChange={(e) => props.handleChangeNewTodoList(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={props.handleSubmitNewTodoList}>
                      <IoIosSend />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant='caption' color='initial'>
              {props.displayString}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    )
}

export default  SubmitCard;