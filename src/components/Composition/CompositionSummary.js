import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HeroSummary from "./HeroSummary";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  compositionSummary: {
    padding: theme.spacing(1),
  },
  compositionTitle: {
    paddingTop: theme.spacing(2),
  },
  detailsBox: {
    position: "relative",
    width: "20%",
  },
}));

const CompositionSummary = (props) => {
  let { comp, onEditClick, onDeleteClick, goats, isFirst, isLast, onClickUp, onClickDown, ow2Mode, ...others } = props;
  const classes = useStyles();

  return (
    <Paper {...others} className={classes.compositionSummary}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Stack className={classes.detailsBox}>
          <Typography variant="h4" className={classes.compositionTitle}>
            {comp.title}
          </Typography>
          <Divider />
          <Typography variant="body" textAlign="left">
            {comp.notes}
          </Typography>
          <Stack direction="horizontal" className={classes.buttonBar}>
            <Button onClick={() => onEditClick(comp)}>Edit</Button>
            <Button onClick={() => onDeleteClick(comp.id)}>Delete</Button>
            <Button disabled={isFirst} onClick={() => onClickUp(comp.id)}>
              <ArrowUpwardIcon />
            </Button>
            <Button disabled={isLast} onClick={() => onClickDown(comp.id)}>
              <ArrowDownwardIcon />
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <HeroSummary summary={comp.tank1} goats={goats} />
          {!ow2Mode && <HeroSummary summary={comp.tank2} goats={goats} />}
          <HeroSummary summary={comp.dps1} goats={goats} />
          <HeroSummary summary={comp.dps2} goats={goats} />
          <HeroSummary summary={comp.heal1} goats={goats} />
          <HeroSummary summary={comp.heal2} goats={goats} />
        </Box>
      </Box>
    </Paper>
  );
};

export default CompositionSummary;
