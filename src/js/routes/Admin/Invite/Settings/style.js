const style = (theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: '40vw',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  }
});

export default style;
