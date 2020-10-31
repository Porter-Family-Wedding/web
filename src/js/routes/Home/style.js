import Background from 'img/bg.jpg';

const style = (theme) => ({
  container: {
    padding: theme.spacing(2),
    minHeight: '100vh',
    background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ), url(${Background})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  svg: {
    width: '100%',
    maxWidth: 400,
    marginBottom: theme.spacing(2),
  },
  textField: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  error: {
    background: theme.palette.error.main,
  },
  note: {
    fontSize: theme.spacing(2),
    fontWeight: 800,
    maxWidth: 600,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  paper: {
    maxWidth: 800,
    width: '100%',
    padding: theme.spacing(2),
  }
});

export default style;
