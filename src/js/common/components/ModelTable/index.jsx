import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/styles';

import { getTable } from 'js/redux/entities';

import styles from './style';

const useStyles = makeStyles(styles);

export default function ModelTable({ model, fields }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTable(model));
  }, []);

  const tableData = useSelector((state) => state.entities[model]?.tableData);

  const data = useSelector(
    (state) =>
      Object.values(state.entities[model])
        .filter((entity) => tableData.items.includes(entity?.id?.toString()))
  );

  if (!data.length || !tableData.items.length) {
    return null;
  }

  const disabledColumns = ['deletedAt'];

  const columns = Object.keys(data[0]).filter((key) => {
    if (key.includes('Id')) return false;

    if (disabledColumns.includes(key)) return false;

    if (Object.keys(model.schema.schema).includes(key)) return false;

    return true;
  });

  const [sortedColumn, direction] = tableData.sortBy.split(':');

  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                columns.map((column) => (
                  <TableCell
                    key={`${model}-${column}-header`}
                    sortDirection={sortedColumn === column ? direction : 'asc'}
                  >
                    <TableSortLabel
                      active={sortedColumn === column}
                      direction={sortedColumn === column ? direction : 'asc'}
                    >
                      {column}
                    </TableSortLabel>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((data) => (
                <TableRow key={`${model}-${data.id}`}>
                  {
                    columns.map((column) => {
                      let content = data[column];

                      if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(content)) {
                        content = moment(content).local().format('lll');
                      }

                      if (typeof content === 'boolean') {
                        content = <Checkbox checked={content} disabled />
                      }

                      return <TableCell key={`${model}-${data.id}-${column}`}>{content}</TableCell>;
                    })
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
