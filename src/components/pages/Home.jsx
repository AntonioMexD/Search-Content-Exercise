import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import {
  alpha,
  AppBar,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  container: {
    maxHeight: 440,
  },
  paper: {
    height: "300px !important",
    textAlign: "center",
    background: "#d0d7db",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default function Home() {
  const classes = useStyles();

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [attribute, setAttribute] = useState("all");

  const baseURL = "https://itunes.apple.com/search";

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
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} xl={4} md={4} sm={4}>
              <Typography variant="h6" color="inherit">
                Search Content iTunes
              </Typography>
            </Grid>
            <Grid item xs={12} xl={3} md={4} sm={4}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={handleChange}
                  value={search}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
            <Grid item xs={12} xl={3} md={2} sm={2}>
              <FormControl>
                <InputLabel>Attribute</InputLabel>
                <Select value={attribute} onChange={handleAttributeChange}>
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"music"}>Music</MenuItem>
                  <MenuItem value={"movie"}>Movie</MenuItem>
                  <MenuItem value={"podcast"}>Podcast</MenuItem>
                  <MenuItem value={"musicVideo"}>Music Video</MenuItem>
                  <MenuItem value={"audiobook"}>Audiobook</MenuItem>
                  <MenuItem value={"tvShow"}>Tv Show</MenuItem>
                  <MenuItem value={"software"}>Software</MenuItem>
                  <MenuItem value={"shortFilm"}>Short Film</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} xl={2} md={2} sm={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => artistGet()}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "50px" }}>
        <Grid container justifyContent="center" spacing={2}>
          {songs &&
            songs.map((song, index) => (
              <Grid key={index} item xs={12} sm={6} xl={3} md={4}>
                <Paper className={classes.paper}>
                  <Typography>{song.trackName}</Typography>
                  <Typography>{song.artistName}</Typography>
                  <Typography>{song.collectionName}</Typography>
                  <Typography>
                    {millisToMinutesAndSeconds(song.trackTimeMillis)}
                  </Typography>
                  <Typography>{song.trackPrice}</Typography>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={song.artworkUrl100}
                  />
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}
