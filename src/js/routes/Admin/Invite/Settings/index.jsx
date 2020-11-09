import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { makeStyles } from '@material-ui/styles';

import { invites, addresses } from 'js/common/models';
import { getById, update } from 'js/redux/entities';
import Loading from 'js/common/components/Loading';
import useDebouncedFunc from 'js/hooks/useDebouncedFunc';

import People from './People';

import styles from './style';

const useStyles = makeStyles(styles);

export default function Settings() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { id } = useParams();

  const invite = useSelector((state) => state.entities.invites[id]);
  const address = useSelector((state) => state.entities.addresses[invite?.address]);

  const debouncedUpdate = useDebouncedFunc((...args) => dispatch(update(...args)) , 1000)

  useEffect(() => {
    dispatch(getById(invites, id));
  }, [id]);

  const [sent, setSent] = useState();
  const [notes, setNotes] = useState();

  const [to, setTo] = useState();
  const [street, setStreet] = useState();
  const [suite, setSuite] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [sizeOfParty, setSizeOfParty] = useState();

  useEffect(() => {
    const newInvite = {
      sent,
      notes,
      sizeOfParty,
    };

    const newAddress = {
      to,
      street,
      suite,
      city,
      state,
      zipCode
    };

    let updateInvite, updateAddress;

    Object.keys(newInvite).forEach((key) => {
      if (invite?.[key] != newInvite[key]) updateInvite = true;
    });

    Object.keys(newAddress).forEach((key) => {
      if (address?.[key] != newAddress[key]) updateAddress = true;
    });

    if (invite && updateInvite) {
      debouncedUpdate(invites, id, newInvite);
    }

    if (address && updateAddress) {
      debouncedUpdate(addresses, address.id, newAddress);
    }
  }, [sent, notes, to, street, suite, city, state, zipCode, sizeOfParty]);

  if (!invite) return <Loading />;

  return (
    <Grid container justify="flex-start" alignItems="center" className={classes.container}>
      <Grid item xs={12} className={classes.container}>
        <Grid container justify="space-between">
          <Typography variant="h4">
            Invite Settings
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
                checked={sent ?? invite?.sent}
                onChange={({ target: { checked } }) => setSent(checked)}
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
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="viewed"
                disabled
                value={invite?.viewed}
              />
            }
            label="Viewed"
          />
        </Paper>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Paper elevation={3} className={classes.paper}>
            <TextField
              label="Size Of Party"
              fullWidth
              variant="outlined"
              value={sizeOfParty ?? invite?.sizeOfParty}
              onChange={({ target: { value } }) => setSizeOfParty(value)}
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
              rows={5}
              maxRows={20}
              variant="outlined"
              value={notes ?? invite?.notes}
              onChange={({ target: { value } }) => setNotes(value)}
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Addressed To"
              variant="outlined"
              fullWidth
              value={to ?? address?.to}
              onChange={({ target: { value } }) => setTo(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Street"
              variant="outlined"
              fullWidth
              value={street ?? address?.street}
              onChange={({ target: { value } }) => setStreet(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              label="Suite/Apartment"
              variant="outlined"
              fullWidth
              value={suite}
              onChange={({ target: { value } }) => setSuite(value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-between">
              <TextField
                className={classes.field}
                label="City"
                variant="outlined"
                value={city ?? address?.city}
                onChange={({ target: { value } }) => setCity(value)}
              />
              <TextField
                className={classes.field}
                label="State"
                variant="outlined"
                value={state ?? address?.state}
                onChange={({ target: { value } }) => setState(value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="flex-start">
              <TextField
                className={classes.field}
                label="Zip Code"
                variant="outlined"
                value={zipCode ?? address?.zipCode}
                onChange={({ target: { value } }) => setZipCode(value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <People peopleIds={invite?.people} />
    </Grid>
  );
}
