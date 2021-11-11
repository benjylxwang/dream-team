import { makeStyles } from "@mui/styles";
import Hero from "./Hero";
import Player from "./Player";

const useStyles = makeStyles(theme => ({
    heroSummary: {
        margin: theme.spacing(1),
        width: '150px',
        height: '150px',
        position: 'relative',
    },
    heroSummaryHero: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    heroSummaryPlayer: {
        position: 'absolute',
        right: 0,
        bottom: 0
    }
}))


const HeroSummary = (props) => {
    let { hero, player, ...others} = props;
    const classes = useStyles();

    return (
        <div {...others} className={classes.heroSummary}>
            <Hero variant={hero} className={classes.heroSummaryHero} />
            <Player player={player} className={classes.heroSummaryPlayer} />
        </div>
    )
}

export default HeroSummary;