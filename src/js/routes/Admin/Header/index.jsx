import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

import style from './style';

const useStyles = makeStyles(style);

export default function Header({ elevated }) {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <Grid item xs={12} className={`${classes.container} ${elevated && classes.elevated}`}>
      <Grid container style={{ height: '100%' }} justify="space-between" alignItems="center">
        <Grid item sm={4} xs={6}>
          <Typography variant="button">
            Porter & Sipes Wedding
          </Typography>
        </Grid>
        <Button variant="contained" color="secondary" size="small">
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  elevated: PropTypes.bool,
};

Header.defaultProps = {
  elevated: false,
};