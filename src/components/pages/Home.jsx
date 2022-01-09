import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const columns = [
  { id: "song", label: "Song", minWidth: 170 },
  { id: "artist", label: "Artist", minWidth: 100 },
  {
    id: "album",
    label: "Album",
    minWidth: 170,
  },
  {
    id: "time",
    label: "Time",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Home() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [attribute, setAttribute] = useState("all");

  const baseURL = "https://itunes.apple.com/search";

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const artistGet = async () => {
    await axios
      .get(baseURL, {
        params: {
          term: search,
          media: attribute,
        },
      })
      .then((response) => {
        setSongs(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAttributeChange = (event) => {
    setAttribute(event.target.value);
  };

  return (
    <div style={{ padding: "50px" }}>
      <div>
        <InputBase
          value={search}
          placeholder="Search input"
          onChange={handleChange}
        />
        <FormControl>
          <InputLabel>Attribute</InputLabel>
          <Select value={attribute} onChange={handleAttributeChange}>
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"music"}>Music</MenuItem>
            <MenuItem value={"movie"}>Movie</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => artistGet()}
        >
          Search
        </Button>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {songs &&
                songs.map((song, index) => (
                  <TableRow key={index}>
                    <TableCell>{song.trackName}</TableCell>
                    <TableCell>{song.artistName}</TableCell>
                    <TableCell>{song.collectionName}</TableCell>
                    <TableCell>{song.trackTimeMillis}</TableCell>
                    <TableCell>{song.trackPrice}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={songs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
