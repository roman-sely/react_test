import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";




const useStyles = makeStyles((theme) => ( {
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: 'tomato',
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: 'rgb(277, 82, 65)'
    },
  },
  cssLabel: {
    color: 'tomato'
  },
  
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `rgb(277, 82, 65) !important`,
    }
  },
  
  cssFocused: {},
  
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'rgb(277, 82, 65) !important'
  },
} ));

export default function SignIn({ history }) {
  const classes = useStyles();
  const [ name, isName ] = useState('');
  const [ password, isPassword ] = useState('');
  
  function login() {
    if (name === 'demo' && password === 'demo') {
      localStorage.setItem('user', JSON.stringify({ name, password }));
      history.push('/');
    } else {
      console.log('forbidden')
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User name"
            name="name"
            autoComplete="Name"
            autoFocus
            onChange={(e) => isName(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: "numeric"
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => isPassword(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              inputMode: "numeric"
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login()}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
