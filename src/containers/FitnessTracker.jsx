import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import {
  Card,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Grid,
} from "@material-ui/core";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import SubmitCard from "../components/SubmitCard";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "3%",
  },
  container: {
    maxHeight: 440,
  },
});

const FitnessTracker = () => {
  const classes = useStyles();

  const userId = useSelector((state) => state.Auth.userId);

  const [titles, setTitles] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [selectedValues, setSelectedValues] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [numTrack, setNumTrack] = React.useState({
    creator: userId,
    value: "",
    title: "",
  });

  const columns = [
    {
      id: "createdAt",
      label: "Date",
      minWidth: 170,
      align: "center",
      format: Date,
    },

    {
      id: "value",
      label: selected,
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  React.useEffect(() => {
    axios.get(`/api/getnumtackertitles/${userId}`).then((res) => {
      setTitles(res.data.numtrackTitle);
    });
  }, []);

  const handleSelected = (title) => {
    setSelected(title);
    setPage(0);
    setRowsPerPage(10);

    axios
      .get(`/api/numtracker/${userId}/${title}`)
      .then((res) => setRows(res.data.numtracker));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNumTrackTitleSubmit = () => {
    axios.post(`/api/addnumtracker/`, { numTracker: numTrack });
    setSelected(numTrack.title);
    axios.get(`/api/getnumtackertitles/${userId}`).then((res) => {
      setTitles(res.data.numtrackTitle);
    });
  };

  const handleNumTrackValueSubmit = (numTrack) => {
    setSelected("");
    axios.post(`/api/addnumtracker/`, { numTracker: numTrack });

    setNumTrack({
      creator: userId,
      value: "",
      title: "",
    });
    
    setSelected(numTrack.title)
  };

  const handleChangeTitle = (event) => {
    setNumTrack({
      ...numTrack,
      [event.target.name]: event.target.value,
      value: 0,
    });
  };

  const handleChangeValue = (event) => {
    setNumTrack({
      ...numTrack,
      [event.target.name]: event.target.value,
      title: selected,
    });
  };

  return (
    <div>
      <Container>
        <SubmitCard
          newtask={numTrack.title}
          handleChangeNewTodoList={handleChangeTitle}
          handleSubmitNewTodoList={handleNumTrackTitleSubmit}
          displayString={""}
          label='Enter New Goal List'
          name='title'
        />

       
        <Grid
          container
          direction='row'
          justify='space-evenly'
          alignItems='center'
          className={classes.root}>
          {titles.map((title) => (
            <div key={title}>
              <Grid>
                <Chip
                  label={title}
                  clickable
                  color={selected === title ? "primary" : "default"}
                  onClick={() => handleSelected(title)}
                />
              </Grid>
            </div>
          ))}
        </Grid>
        {selected && (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row._id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value.length > 20
                                  ? moment(value).fromNow(true) + " ago"
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid
              container
              direction='row'
              justify='space-evenly'
              alignItems='center'>
              <Grid item xs={7}>
                <TextField
                  id='standard-basic'
                  label={"Enter New " + selected}
                  margin='normal'
                  name='value'
                  fullWidth
                  value={numTrack.value}
                  onChange={(e) => handleChangeValue(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => {
                            handleNumTrackValueSubmit(numTrack);
                          }}>
                          <IoIosSend />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default FitnessTracker;
