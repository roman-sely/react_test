import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import "./style.css";
import TransitionsModal from "../Modal";
import AirportInfo from "../AirportInfo";
import {generateId} from "../../helpers/index"

const useStyles = makeStyles((theme) => ( {
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: 200,
  },
  cardActionArea: {
    cursor: "default !important",
  },
  root: {
    width: "30%",
    maxWidth: 400,
    minWidth: 200,
    margin: "1%",
  },
  button: {
    width: "30%",
    backgroundColor: "tomato",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(277, 82, 65)",
    },
    margin: "0 auto 1em",
    cursor: "pointer",
  },
} ));

export default function Main() {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false);
  const [ currentCity, setCurrentCity ] = useState({});
  const cities = [
    { name: "Atlanta", icao: "katl", airportName: "Hartsfield–Jackson Atlanta International Airport" },
    { name: "New York", icao: "kjfk", airportName: "John F. Kennedy International Airport" },
    { name: "Amsterdam", icao: "eham", airportName: "Amsterdam Airport Schiphol" },
    { name: "London", icao: "egll", airportName: "London Heathrow Airport" },
    { name: "Tokyo", icao: "rjtt", airportName: "Tokyo Haneda Airport" },
    { name: "Los Angeles", icao: "klax", airportName: "Los Angeles International Airport" },
    { name: "Moscow", icao: "dme", airportName: "Domodedovo International" },
    { name: "Barcelona", icao: "lebl", airportName: "Barcelona–El Prat Airport" },
    { name: "Shanghai", icao: "zspd", airportName: "Shanghai Pudong International Airport" },
  ];
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <React.Fragment>
      <AppBar position="static" className="header">
        <Toolbar className="header-content">
          <Typography variant="h5" className={classes.title}>
            OpenSky
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="content">
        <div className="title">Top Airports by City</div>
        <div className="list-of-cities">
          {cities.map((city) => {
            return (
              <Card className={classes.root} key={generateId()}>
                <CardActionArea className={classes.cardActionArea}>
                  <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&w=1000&q=80"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className="city-name"
                    >
                      {city.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    className={classes.button}
                    onClick={() => {
                      setCurrentCity(city);
                      handleOpen();
                    }}
                  >
                    Airport
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
        <TransitionsModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          city={currentCity}
          open={open}
        >
          <AirportInfo icao24={currentCity.icao} airportName={currentCity.airportName}/>
        </TransitionsModal>
      </div>
    </React.Fragment>
  );
}
