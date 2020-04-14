import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ( {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid tomato",
    borderRadius: "5px",
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3),
    width: "90%",
    height: "70%",
    overflowY: "scroll"
  },
  close: {
    position: "absolute",
    right: "100px"
  },
} ));

export default function TransitionsModal(
  {
    handleClose,
    handleOpen,
    city,
    open,
    children
  }) {
  const classes = useStyles();
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton component="button" onClick={handleClose}  className={classes.close}>
              <CancelIcon/>
            </IconButton>
            <Typography variant="h2">
              {city.name}
            </Typography>
            <Typography variant="h4">
              {city.airportName}
            </Typography>
            {/*<p id="transition-modal-description">{city.icao}</p>*/}
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
