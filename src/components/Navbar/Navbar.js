import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: "block",
    right: 0,
    paddingRight: theme.spacing(2)
  },
  logo: {
    maxWidth: "50px",
    paddingRight: theme.spacing(1),
    position: "relative",
    float: "left"
  },
  title: {
    position: "relative",
    float: "left",
    paddingTop: theme.spacing(1)
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  logoLink: {
    textDecoration: "none",
    color: "black",
    left: 0,
    paddingLeft: theme.spacing(2)
  },
  appBar: {
      backgroundColor: "white",
      height: '50px',
      padding: theme.spacing(1),
      verticalAlign: 'middle',
      position: 'relative'
  },
  verticalCenter: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
  }
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.appBar}>
      <Link to="/" className={`${classes.logoLink} ${classes.verticalCenter}`}>
        <img src={props.logo} className={classes.logo} />
        <Typography variant="h4" className={classes.title}>
          {props.title}
        </Typography>
      </Link>
      <div className={`${classes.navlinks} ${classes.verticalCenter}`}>
        {props.links.map((link) => (
          <Link to={link.link} className={classes.link} key={link.link}>
            <Button color="inherit">{link.label}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
