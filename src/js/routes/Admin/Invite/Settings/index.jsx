import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { makeStyles } from '@material-ui/styles';

import styles from './style';

const useStyles = makeStyles(styles);

export default function Settings() {
  const classes = useStyles();

  return (
    <Grid container justify="flex-start" alignItems="center" className={classes.container}>
      <Grid item xs={12} className={classes.container}>
        <Grid container justify="space-between">
          <Typography variant="h4">
            Invite Settings
          </Typography>
          <Typography variant="button">
            fancy-code
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Paper elevation={3} className={classes.paper}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
                checkedIcon={<CheckBoxIcon fontSize="medium" />}
                name="Sent"
              />
            }
            label="Sent"
          />
        </Paper>
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Paper elevation={3} className={classes.paper}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
                checkedIcon={<CheckBoxIcon fontSize="medium" />}
                name="viewed"
                disabled
              />
            }
            label="Viewed"
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={20}
              maxRows={20}
              variant="outlined"
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
