import React, { useState, useEffect } from "react";
import axios from "axios"

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";

import AircraftInfo from "../AircraftInfo";

import { MIN_PER_HOUR, getBeginTime, getEndTime, getMockArrayICAO } from "../../helpers"

const useStyles = makeStyles((theme) => ( {
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
} ));
export const AirportInfo = ({ icao24 = 'klax', airportName }) => {
  const [ aircrafts, setAircrafts ] = useState([]);
  const classes = useStyles();
  const [ time, setTime ] = React.useState(10);
  const [ endDate, setEndDate ] = useState(getEndTime());
  const [ startDate, setStartDate ] = useState(getBeginTime(endDate, time));
  const [ isMockData, setIsMockData ] = useState(false);
  
  const handleChange = (event) => {
    setStartDate(getBeginTime(endDate, event.target.value));
    setEndDate(getEndTime())
    setTime(event.target.value)
  };
  
  useEffect(() => {
    axios.get(`https://opensky-network.org/api/flights/arrival?airport=${icao24}&begin=${startDate}&end=${endDate}`)
      .then(res => {
        setIsMockData(false);
        setAircrafts(res.data);
      })
      .catch(e => {
        setIsMockData(true);
        setAircrafts(getMockArrayICAO(time));
      })
    
  }, [ startDate, endDate, time, icao24 ]);
  return (
    <Typography component="div" style={{ backgroundColor: '#fff' }}>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          onChange={handleChange}
        >
          <MenuItem value={10}>10 minutes</MenuItem>
          <MenuItem value={20}>20 minutes</MenuItem>
          <MenuItem value={30}>30 minutes</MenuItem>
          <MenuItem value={MIN_PER_HOUR}>1 hour</MenuItem>
          <MenuItem value={2 * MIN_PER_HOUR}>2 hours</MenuItem>
          <MenuItem value={3 * MIN_PER_HOUR}>3 hours</MenuItem>
          <MenuItem value={6 * MIN_PER_HOUR}>6 hours</MenuItem>
          <MenuItem value={12 * MIN_PER_HOUR}>12 hours</MenuItem>
          <MenuItem value={24 * MIN_PER_HOUR}>24 hours</MenuItem>
          <MenuItem value={48 * MIN_PER_HOUR}>48 hours</MenuItem>
        </Select>
      </FormControl>
      <AircraftInfo aircrafts={aircrafts} isMockData={isMockData}/>
    </Typography>
  )
};
