import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as images from "../../assets/players";
import CircleText from "./CircleText";

const useStyles = makeStyles((theme) => ({
  img: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "105%",
  },
  playerImg: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    width: "calc(100% - 8px)",
    height: "calc(100% - 8px)",
    borderRadius: "100%",
    border: "4px black solid",
    backgroundColor: "black",
    overflow: "hidden",
  },
  playerBig: {
    width: "180px",
    height: "180px",
  },
  playerSmall: {
    width: "100px",
    height: "100px",
  },
  playerTitle: {
    zIndex: 5,
    position: "absolute",
    bottom: "-35px",
    width: "100%",
    color: "black",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  imageText: {
    zIndex: 5,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  grayscale: {
    // filter: "grayscale(100%)",
  },
}));

const parseName = (name) => {
  return name.toLowerCase().replace(" ", "_");
};

const Player = (props) => {
  let { player, big, className, showTitle, goat, ...others } = props;
  const defImg = images.pepe;

  const classes = useStyles();
  let fileName = parseName(player);

  let imgsrc = images[fileName] ? images[fileName] : defImg;
  imgsrc = goat ? images.goat : imgsrc;

  return (
    <div
      className={`${classes.player} ${big ? classes.playerBig : classes.playerSmall} ${className ? className : ""}`}
      {...others}
    >
      <div className={`${classes.playerImg} ${fileName && !images[fileName] ? classes.grayscale : ""}`}>
        <img src={imgsrc} className={`${classes.img}`} style={{ width: "70%" }} />
      </div>
      <CircleText className={`${classes.imageText}`} text={player.toUpperCase()} />
    </div>
  );
};

export default Player;
