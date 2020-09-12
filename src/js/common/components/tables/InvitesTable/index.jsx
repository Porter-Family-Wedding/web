import React from 'react';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/styles';

import styles from './style';

const useStyles = makeStyles(styles);

export default function InvitesTable() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      
    </Grid>
  );
}
