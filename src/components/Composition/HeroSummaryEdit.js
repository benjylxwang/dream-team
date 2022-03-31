import { IconButton, Menu, MenuItem, Modal, Paper, Select, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Hero from "./Hero";
import Player from "./Player";
import heroList from "../../assets/heroList.json";
import playerList from "../../assets/playerList.json";
import { useState } from "react";
import NewPlayer from "./NewPlayer";
import { Box } from "@mui/system";

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

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
    position: "relative",
    marginTop: "10px",
  },
  editableHero: {
    position: "relative",
  },
  editModalAs: {
    position: "relative",
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

const HeroSummaryEdit = (props) => {
  const [heroMenuAnchor, setHeroMenuAnchor] = useState(null);
  const showHeroMenu = Boolean(heroMenuAnchor);
  const [playerMenuAnchor, setPlayerMenuAnchor] = useState(null);
  const showPlayerMenu = Boolean(playerMenuAnchor);

  const [addingNewPlayer, setAddingNewPlayer] = useState(false);

  let { summary, setHero, setPlayer, setCaller, setTracker, position, type, ...others } = props;
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
    setAddingNewPlayer(false);
  };

  const handleAddNewPlayer = () => {
    setAddingNewPlayer(true);
    setPlayerMenuAnchor(null);
  };

  const handleSetCaller = () => {
    let value = summary ? !summary.shotcaller : true;
    setCaller(value, position);
  };
  const handleSetTracker = () => {
    let value = summary ? !summary.ulttracker : true;
    setTracker(value, position);
  };

  return (
    <div>
      <Paper className={classes.heroSummaryEdit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <Stack>
            <Player
              player={summary.player}
              onClick={editPlayer}
              showTitle
              className={`${classes.editable} ${classes.editablePlayer}`}
            />
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
              <IconButton
                color={summary && summary.shotcaller ? "secondary" : "default"}
                onClick={handleSetCaller}
              >
                <RecordVoiceOverIcon />
              </IconButton>
              <IconButton
                color={summary && summary.ulttracker ? "secondary" : "default"}
                onClick={handleSetTracker}
              >
                <TrackChangesIcon />
              </IconButton>
            </Box>
            <Menu open={showPlayerMenu} onClose={() => setPlayerMenuAnchor(null)} anchorEl={playerMenuAnchor}>
              {playerList.sort().map((player) => (
                <MenuItem key={player} value={player} onClick={() => handlePlayerSelection(player)}>
                  {player}
                </MenuItem>
              ))}
              <MenuItem onClick={() => handleAddNewPlayer()}>+ New Player</MenuItem>
            </Menu>
          </Stack>
          <Typography variant="h5" className={classes.editModalAs} sx={{ flex: 1 }}>
            as
          </Typography>
          <Hero
            variant={summary.hero}
            showTitle
            onClick={editHero}
            className={`${classes.editable} ${classes.editableHero}`}
          />
          <Menu open={showHeroMenu} onClose={() => setHeroMenuAnchor(null)} anchorEl={heroMenuAnchor}>
            {heroList[type].sort().map((hero) => (
              <MenuItem key={hero} value={hero} onClick={() => handleHeroSelection(hero)}>
                {hero}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Paper>
      <NewPlayer editing={addingNewPlayer} onCancel={() => setAddingNewPlayer(false)} onSave={handlePlayerSelection} />
    </div>
  );
};

export default HeroSummaryEdit;
