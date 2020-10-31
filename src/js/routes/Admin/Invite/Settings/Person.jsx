import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/styles';

import { update } from 'js/redux/entities';
import { people } from 'js/common/models';
import useDebouncedFunc from 'js/hooks/useDebouncedFunc';

import styles from './style';

const useStyles = makeStyles(styles);

export default function InviteSettingsPeople({ id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const debouncedUpdate = useDebouncedFunc((...args) => dispatch(update(...args)) , 1000)

  const person = useSelector((state) => Object.values(state.entities.people).find((p) => id === p.id));

  useEffect(() => {
    if (firstName || lastName || phoneNumber) {
      debouncedUpdate(people, id, { firstName, lastName, phoneNumber });
    }
  }, [firstName, lastName, phoneNumber]);

  return (
    <Grid item xs={12} className={classes.person}>
      <Grid container justify="space-between">
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName ?? person.firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName ?? person.lastName}
          onChange={({ target: { value } }) => setLastName(value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phoneNumber ?? person.phoneNumber}
          onChange={({ target: { value } }) => setPhoneNumber(value)}
        />
        <IconButton>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
}

InviteSettingsPeople.propTypes = {
  peopleIds: PropTypes.array,
};

InviteSettingsPeople.defaultProps = {
  peopleIds: [],
};
