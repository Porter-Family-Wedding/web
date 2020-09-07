const style = theme => ({
  main: {
    height: '100vh',
  },
  paper: {
    padding: `${theme.spacing(5)} ${theme.spacing(15)}`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
    },
  },
  textField: {
    margin: '0 auto',
    display: 'block',
    width: theme.spacing(35),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  login: {
    width: theme.spacing(20),
    marginTop: theme.spacing(5),
  },
  error: {
    color: theme.palette.common.white,
    background: theme.palette.error.main,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  loginMessage: {
    color: theme.palette.common.white,
    background: theme.palette.primary[500],
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
});

export default style;