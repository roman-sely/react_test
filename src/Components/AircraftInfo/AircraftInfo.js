import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import mockAircrafts from '../../MockData/aircrafts'
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { generateId } from "../../helpers";

export function AircraftInfo({ aircrafts: rows, isMockData }) {
  const [ aircrafts, setAircrafts ] = useState([]);
  useEffect(() => {
    if (isMockData) {
      setAircrafts(rows);
    } else {
      try {
        const aircraftsMetadataPromises = rows.map(item => {
          let metadata;
          try {
            metadata = axios.get(`https://opensky-network.org/api/metadata/aircraft/icao/${item.icao24}`).then(res => res.data);
          } catch (e) {
          }
          return metadata
        });
        Promise.all(aircraftsMetadataPromises).then(aircrafts => {
          setAircrafts(aircrafts);
        })
      } catch (e) {
        setAircrafts(mockAircrafts);
      }
    }
  }, [ rows, isMockData ]);
  return (
    <React.Fragment>
      <Typography variant="h5">
        Recent Flights
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ICAO Classification</TableCell>
            <TableCell>Registration</TableCell>
            <TableCell>Aircraft Manufacturer</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Typecode</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Built</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aircrafts.map((row) => (
            <TableRow key={generateId()}>
              <TableCell>{row.icao24}</TableCell>
              <TableCell>{row.registration}</TableCell>
              <TableCell>{row.manufacturername}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.typecode}</TableCell>
              <TableCell>{row.serialnumber}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.built}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
