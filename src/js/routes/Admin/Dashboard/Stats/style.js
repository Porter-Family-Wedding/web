const style = (theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  stat: {
    width: 100,
    background: theme.palette.common.white,
    height: 100,
    boxShadow: theme.shadows[2],
    borderRadius: theme.spacing(0.75),
    '& h3': {
      fontSize: 50,
      width: 100,
      textAlign: 'center',
      margin: 0,
      display: 'block',
    },
    '& span': {
      width: 100,
      textAlign: 'center',
      display: 'block'
    }
  },
});

export default style;
