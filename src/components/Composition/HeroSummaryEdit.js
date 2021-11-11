import { Menu, MenuItem, Modal, Paper, Select, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Hero from "./Hero";
import Player from "./Player";
import heroList from "../../assets/heroList.json";
import playerList from "../../assets/playerList.json";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  heroSummaryEdit: {
    position: "relative",
    height: "165px",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  editable: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  editablePlayer: {
    position: "absolute",
    left: 0,
    margin: theme.spacing(1),
    top: "25px",
  },
  editableHero: {
    position: "absolute",
    right: 0,
    margin: theme.spacing(1),
  },
  editModalAs: {
    position: "absolute",
    left: "50%",
    top: "50%",
    "-ms-transform": "translateY(-50%) translateX(-50%)",
    transform: "translateY(-50%) translateX(-50%)",
  },
}));

const HeroSummaryEdit = (props) => {
  const [heroMenuAnchor, setHeroMenuAnchor] = useState(null);
  const showHeroMenu = Boolean(heroMenuAnchor);
  const [playerMenuAnchor, setPlayerMenuAnchor] = useState(null);
  const showPlayerMenu = Boolean(playerMenuAnchor);

  let { summary, setHero, setPlayer, position, type, ...others } = props;
  const classes = useStyles();

  const editHero = (event) => {
    setHeroMenuAnchor(event.currentTarget);
  };
  const handleHeroSelection = (hero) => {
    setHero(hero, position);
    setHeroMenuAnchor(null);
  };

  const editPlayer = (event) => {
      setPlayerMenuAnchor(event.currentTarget);
  };
  const handlePlayerSelection = (player) => {
    setPlayer(player, position);
    setPlayerMenuAnchor(null);
  };

  return (
    <div>
      <Paper className={classes.heroSummaryEdit}>
        <Stack direction="horizontal" {...others}>
          <Player
            player={summary.player}
            onClick={editPlayer}
            showTitle
            className={`${classes.editable} ${classes.editablePlayer}`}
          />
          <Menu
            open={showPlayerMenu}
            onClose={() => setPlayerMenuAnchor(null)}
            anchorEl={playerMenuAnchor}
          >
            {playerList.sort().map((player) => (
              <MenuItem key={player} value={player} onClick={() => handlePlayerSelection(player)}>
                {player}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h5" className={classes.editModalAs}>
            as
          </Typography>
          <Hero
            variant={summary.hero}
            showTitle
            onClick={editHero}
            className={`${classes.editable} ${classes.editableHero}`}
          />
          <Menu
            open={showHeroMenu}
            onClose={() => setHeroMenuAnchor(null)}
            anchorEl={heroMenuAnchor}
          >
            {heroList[type].sort().map((hero) => (
              <MenuItem key={hero} value={hero} onClick={() => handleHeroSelection(hero)}>
                {hero}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Paper>
    </div>
  );
};

export default HeroSummaryEdit;
