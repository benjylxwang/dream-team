import { makeStyles } from "@mui/styles";
import Hero from "./Hero";
import Player from "./Player";

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  heroSummary: {
    margin: theme.spacing(1),
    width: "150px",
    height: "180px",
    position: "relative",
  },
  heroSummaryHero: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  heroSummaryPlayer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 10,
  },
}));

const HeroSummary = (props) => {
  let { summary, goats, ...others } = props;
  const classes = useStyles();

  let { hero, player, shotcaller, ulttracker } = summary;

  let strings = [];
  if (shotcaller) strings.push("Shotcaller");
  if (ulttracker) strings.push("Ult Tracker");
  
  let tooltip = "No roles";
  if (strings.length > 0) tooltip = strings.join(", ")
  return (
    <div {...others} className={classes.heroSummary}>
      <Tooltip title={tooltip} placement="bottom-end">
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 8,
            backgroundColor: "white",
            border: "3px solid black",
            paddingTop: 0.2,
            paddingLeft: 4,
            paddingBottom: 0.2,
            paddingRight: 0.2,
            borderBottomRightRadius: 10,
          }}
        >
          <RecordVoiceOverIcon color={shotcaller ? "info" : "disabled"} />
          <TrackChangesIcon color={ulttracker ? "secondary" : "disabled"} />
        </Box>
      </Tooltip>
      <Hero variant={hero} className={classes.heroSummaryHero} goat={goats} />
      <Player player={player} className={classes.heroSummaryPlayer} goat={goats} />
    </div>
  );
};

export default HeroSummary;
