import Background from 'img/bg.jpg';

const style = (theme) => ({
  container: {
    padding: theme.spacing(2),
    minHeight: '100vh',
    background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ), url(${Background})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
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
