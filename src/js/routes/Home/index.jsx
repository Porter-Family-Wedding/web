import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/styles';

import RSVP from 'img/rsvp.svg';

import styles from './style';

const useStyles = makeStyles(styles);

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <Paper elevation={8} className={classes.paper}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <img className={classes.svg} src={RSVP} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item className={classes.note}>
                THE WEDDING OF KALOB PORTER AND KENDRA SIPES TO TAKE PLACE ON DECEMBER 19th, 2020 AT THE BROWN COUNTY INN
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container>
              <Grid item xs={12} md={6} className={classes.textField}>
                First Name
                <TextField
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.textField}>
                Last Name
                <TextField
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} className={classes.textField}>
                How many people are in your party?
                <br />
                <TextField
                  variant="outlined"
                  type="number"
                />
              </Grid>
              
              <Grid item xs={12} className={classes.textField}>
                How will you celebrate?
                <Button fullWidth variant="contained" color="primary" className={classes.button}>
                  In Person
                </Button>
                <Button fullWidth variant="contained" color="error" className={classes.error}>
                  From Afar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}