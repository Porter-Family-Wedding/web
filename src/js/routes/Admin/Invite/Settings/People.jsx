import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/styles';

import styles from './style';

const useStyles = makeStyles(styles);

export default function InviteSettingsPeople({ people = ['test'] }) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper elevation={3} className={classes.paper}>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Typography variant="h6">
              People
            </Typography>
            <IconButton>
              <Add />
            </IconButton>
          </Grid>
        </Grid>
       {
         people.map((p) => (
          <Grid item xs={12}>
            <Grid container justify="space-between">
              <TextField
                label="First Name"
                variant="outlined"
              />
              <TextField
                label="Last Name"
                variant="outlined"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
              />
              <IconButton>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
         ))
       }
      </Paper>
    </Grid>
  );
}
