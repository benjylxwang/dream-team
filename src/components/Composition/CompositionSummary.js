import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HeroSummary from "./HeroSummary";

const useStyles = makeStyles((theme) => ({
  compositionSummary: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    position: 'relative',
  },
  compositionTitle: {
    paddingTop: theme.spacing(2)
  },
  buttonBar: {
  },
  detailsBox: {
      position: 'relative',
      width: '20%'
  }
}));

const CompositionSummary = (props) => {
  let { comp, onEditClick, onDeleteClick, goats, ...others } = props;
  const classes = useStyles();

  return (
    <Paper {...others} className={classes.compositionSummary}>
      <Stack direction="horizontal">
        <Stack className={classes.detailsBox}>
          <Typography variant="h4" className={classes.compositionTitle}>
            {comp.title}
          </Typography>
          <Divider />
          <Typography variant="body" textAlign="left">{comp.notes}</Typography>
          <Stack direction="horizontal" className={classes.buttonBar}>
              <Button onClick={() => onEditClick(comp)}>Edit</Button>
              <Button onClick={() => onDeleteClick(comp.id)}>Delete</Button>
          </Stack>
        </Stack>
        <Stack direction="horizontal">
          <HeroSummary hero={comp.tank1.hero} player={comp.tank1.player} goats={goats}/>
          <HeroSummary hero={comp.tank2.hero} player={comp.tank2.player}  goats={goats}/>
          <HeroSummary hero={comp.dps1.hero} player={comp.dps1.player} goats={goats} />
          <HeroSummary hero={comp.dps2.hero} player={comp.dps2.player} goats={goats} />
          <HeroSummary hero={comp.heal1.hero} player={comp.heal1.player} goats={goats} />
          <HeroSummary hero={comp.heal2.hero} player={comp.heal2.player} goats={goats}/>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CompositionSummary;
