import { Link } from "react-router-dom";
import { Button, Fab, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import goat from "../../assets/logo/goat.png";
import ow2Logo from "../../assets/logo/ow2.png";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: "block",
    right: 0,
    paddingRight: theme.spacing(2),
  },
  logo: {
    maxWidth: "50px",
    paddingRight: theme.spacing(1),
    position: "relative",
    float: "left",
  },
  title: {
    position: "relative",
    float: "left",
    paddingTop: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  logoLink: {
    textDecoration: "none",
    color: "black",
    left: 0,
    paddingLeft: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "white",
    height: "50px",
    padding: theme.spacing(1),
    verticalAlign: "middle",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0px 5px 5px",
  },
  verticalCenter: {
    margin: 0,
    position: "absolute",
    top: "50%",
    "-ms-transform": "translateY(-50%)",
    transform: "translateY(-50%)",
  },
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
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Fab variant="extended" color="white" onClick={props.toggleOw2Mode}>
          {props.ow2Mode ? (
            "Back to OW1"
          ) : (
            <Stack direction="horizontal">
              <img src={ow2Logo} style={{ maxHeight: "30px" }} />
              <Typography variant="subtitle1" textAlign="center" style={{ paddingTop: "2px", paddingLeft: "4px" }}>
                Overwatch 2
              </Typography>
            </Stack>
          )}
        </Fab>
        <Fab color={props.goats ? "disabled" : "secondary"} onClick={props.letThereBeGoats}>
          <img src={goat} style={{ maxHeight: "30px" }} />
        </Fab>
      </Box>
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
