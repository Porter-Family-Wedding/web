import React from 'react';

import Grid from '@material-ui/core/Grid';

import ModelTable from 'js/common/components/ModelTable';
import { invites } from 'js/common/models';

import Header from '../Header';

export default function Dashboard() {

  return (
    <Grid container>
      <Header elevated />
      <ModelTable model={invites} additionalFields={[['addressed to', 'address.to']]} excludedFields={['deletedAt', 'notes']} />
    </Grid>
  )
}