import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { invites } from 'js/common/models';
import { list } from 'js/redux/entities';

import Header from '../Header';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list(invites));
  }, [])

  return (
    <Grid container>
      <Header elevated />
      <div>
        ello!
      </div>
    </Grid>
  )
}