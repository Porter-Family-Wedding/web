import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/styles';

import { getById } from 'js/redux/entities';
import { invites } from 'js/common/models';

import Header from '../Header';
import Settings from './Settings';

import styles from './style';

const useStyles = makeStyles(styles);

export default function Invite({ match: { params } }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const invite = useSelector((state) => state.entities.invites[params.id]);

  useEffect(() => {
    dispatch(getById(invites, params.id));
  }, []);

  return (
    <Grid container justify="center" alignItems="center">
      <Header />
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center" className={classes.container}>
          <Settings />
        </Grid>
      </Grid>
    </Grid>
  );
}
