import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Container from "@material-ui/core/Container";
const Journal = () => {
  return (
    <div>
      <Container>
        <TextareaAutosize
          aria-label='minimum height'
          rowsMin={10}
          placeholder='Minimum 3 rows'
        
   
        />
      </Container>
    </div>
  );
};

export default Journal;
