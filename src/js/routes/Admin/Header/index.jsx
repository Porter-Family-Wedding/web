import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';

import { logout } from 'js/redux/auth';

import style from './style';

const useStyles = makeStyles(style);

export default function Header({ elevated }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Grid item xs={12} className={`${classes.container} ${elevated && classes.elevated}`}>
      <Grid container style={{ height: '100%' }} justify="space-between" alignItems="center">
        <Grid item sm={4} xs={6}>
          <Typography variant="button">
            Porter & Sipes Wedding
          </Typography>
        </Grid>
        <Button variant="contained" color="secondary" size="small" onClick={() => dispatch(logout())}>
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