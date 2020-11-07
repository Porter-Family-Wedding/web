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
              <Grid item className={classes.note}>
                Thank you for your response.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}