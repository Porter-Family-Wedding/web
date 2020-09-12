import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';

import Header from '../Header';

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <Grid container>
      <Header elevated />
      <div>
        ello!
      </div>
    </Grid>
  )
}