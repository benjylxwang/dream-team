
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as images from '../../assets/players'

const useStyles = makeStyles(theme => (
    {
        player: {
        },
        playerImg: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            width: '100%',
            borderRadius: '100%',
            border: '4px black solid',
            backgroundColor: 'white'
        },
        playerBig: {
            width: '180px',
            height: '180px'
        },
        playerSmall: {
            width: '90px',
            height: '90px'
        },
        playerTitle: {
            zIndex: 5,
            position: 'absolute',
            bottom: '-35px',
            width: '100%',
            color: 'black',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center'
        }
    }
));

const parseName = (name) => {
    return name.toLowerCase().replace(' ', '_');
}

const Player = (props) => {
    let { player, big, className, showTitle, ...others} = props;
    const defImg = images.pepe;

    const classes = useStyles();
    let fileName = parseName(player);

    return (
        <div className={`${classes.player} ${big ? classes.playerBig : classes.playerSmall} ${className ? className : ''}`} {...others}>
            <img src={images[fileName] ? images[fileName] : defImg} className={`${classes.playerImg}`} />
            {showTitle ? <Typography variant="h6" className={`${classes.playerTitle}`} textAlign="center">{player}</Typography> : null}
        </div>    
    );
}

export default Player;