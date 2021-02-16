import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {
  const [value, setValue] = React.useState(props.value);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
      
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            props.changeValue(props.catagory, value)
          }}
        />
      </Box>
     
    </div>
  );
}
