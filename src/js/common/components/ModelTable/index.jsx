import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { push } from 'connected-react-router';
import pluralize from 'pluralize';

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
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/styles';

import { getTable, create } from 'js/redux/entities';
import useDebounce from 'js/hooks/useDebounce';

import styles from './style';

const useStyles = makeStyles(styles);

export default function ModelTable({ model, additionalFields, excludedFields = ['deletedAt'] }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState('createdAt:desc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [columns, setColumns] = useState([]);

  const debouncedSearch = useDebounce(search, 300);

  const tableData = useSelector((state) => state.entities[model]?.tableData);

  const data = useSelector((state) => tableData.items.map((id) => state.entities[model][id]));

  const refreshTableData = () => {
    dispatch(getTable(model, { page, limit, sortBy, search }));
  }

  useEffect(refreshTableData, []);

  useEffect(refreshTableData, [sortBy, debouncedSearch, page, limit]);

  useEffect(() => {
    if (data[0] && !columns.length) {
      setColumns(Object.keys(data[0]).filter((key) => {
        if (key.includes('Id')) return false;
    
        if (excludedFields.includes(key)) return false;
    
        if (Object.keys(model.schema.schema).includes(key)) return false;
    
        return true;
      }));
    }
  }, [data]);

  if (tableData.loading && !tableData.items.length) {
    return null;
  }

  if (!tableData.items.length && !columns.length) {
    return (
      <Grid container justify="center">
        <Grid item xs={12} className={classes.table}>
          <Typography variant="h6" align="center">
            It would appear there are no {model.toString()} yet...
          </Typography>
        </Grid>

        <Button
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<Add />}
          className={classes.table}
          onClick={() => dispatch(create(model))}
        >
          Create the first {pluralize.singular(model.toString())}
        </Button>
      </Grid>
    )
  }

  const [sortedColumn, direction] = tableData.sort_by.split(':');

  const toggleSort = (column) => {
    let isAsc = true;

    if (column === sortedColumn) {
      isAsc = direction === 'desc';
    }

    setSortBy(`${column}:${isAsc ? 'asc' : 'desc'}`);
  }

  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <Grid item xs={8}>
        <TextField
          variant="filled"
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
          }}
          fullWidth
          size="small"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<Add />}
            onClick={() => dispatch(create(model))}
          >
            New {pluralize.singular(model.toString())}
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.table}>
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
                      onClick={() => toggleSort(column)}
                    >
                      {column}
                    </TableSortLabel>
                  </TableCell>
                ))
              }
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !data.length && (
                <TableRow>
                  <TableCell>
                    No results found...
                  </TableCell>
                </TableRow>
              )
            }
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
                  <TableCell>
                    <IconButton onClick={() => dispatch(push(`/admin/${model}/${data.id}`))}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
