import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/styles';

import { create, getById } from 'js/redux/entities';
import { people as peopleModel, invites } from 'js/common/models';

import Person from './Person';

import styles from './style';

const useStyles = makeStyles(styles);

export default function InviteSettingsPeople({ peopleIds }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id: inviteId } = useParams();

  const newPerson = async () => {
    await dispatch(create(peopleModel, { inviteId }, false));
    await dispatch(getById(invites, inviteId));
  }

  return (
    <Grid item xs={12}>
      <Paper elevation={3} className={classes.paper}>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Typography variant="h6">
              People
            </Typography>
            <IconButton>
              <Add onClick={newPerson} />
            </IconButton>
          </Grid>
        </Grid>
       {
         !peopleIds.length && <p>No people found</p>
       }
       {
         peopleIds.map((id) => <Person id={id} />)
       }
      </Paper>
    </Grid>
  );
}

InviteSettingsPeople.propTypes = {
  peopleIds: PropTypes.array,
};

InviteSettingsPeople.defaultProps = {
  peopleIds: [],
};
