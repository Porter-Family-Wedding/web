import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/styles';

import api from 'js/api';

import styles from './style';

const useStyles = makeStyles(styles);

export default function Stats() {
  const classes = useStyles();

  const [attending, setAttending] = useState(0);

  const getAttending = async () => {
    const attending = await api.countAttending();

    setAttending(attending?.total);
  }

  useEffect(() => {
    getAttending();
  }, []);

  return (
    <Grid container justify="flex-start" alignItems="center" className={classes.container}>
      <Grid item className={classes.stat}>
        <h3>
          {attending ?? 0}
        </h3>
        <span>
          Attending
        </span>
      </Grid>
    </Grid>
  );
}
