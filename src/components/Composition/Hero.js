import React from 'react';
import PropTypes from 'prop-types';
import * as images from '../../assets/heroes'
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles(theme => (
    {
        hero: {
        },
        heroImg: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0
        },
        heroBig: {
            width: '180px',
            height: '310px'
        },
        heroSmall: {
            width: '90px',
            height: '155px'
        },
        heroTitle: {
            backgroundColor: 'white',
            zIndex: 5,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            color: 'black'
        }
    }
));

const parseName = (name) => {
    return name.toLowerCase().replace(' ', '_');
}

const Hero = (props) => {
    let { variant, showTitle, big, className, ...others } = props;
    let fileName = parseName(variant);

    const classes = useStyles();
    return (
        <div className={`${classes.hero} ${big ? classes.heroBig : classes.heroSmall} ${className ? className : ''}`} {...others}>
            <img src={images[fileName] ? images[fileName] : images.unknown} className={`${classes.heroImg} ${big ? classes.heroBig : classes.heroSmall}`}/>
            {showTitle ? <Typography variant="h6" className={classes.heroTitle} textAlign="center">{variant}</Typography> : null}
        </div>
    )
};

Hero.propTypes = {
    variant: PropTypes.string,
    showTitle: PropTypes.bool,
    big: PropTypes.bool
}

Hero.defaultProps = {
    variant: "Ana",
    showTitle: false,
    big: false
}

export default Hero;