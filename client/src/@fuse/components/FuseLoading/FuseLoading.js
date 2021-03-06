import React, {useState} from 'react';
import {Typography, LinearProgress} from '@material-ui/core';
import {useTimeout} from '@fuse/hooks';
import PropTypes from 'prop-types';
import clsx from "clsx";

function FuseLoading(props)
{
    const [showLoading, setShowLoading] = useState(!props.delay);
    const { marginTop } = props;

    useTimeout(() => {
        setShowLoading(true);
    }, props.delay);

    if ( !showLoading )
    {
        return null;
    }

    return (
        <div className={clsx(marginTop, "flex flex-1 flex-col items-center justify-center")}>
            <img className="w-60" src="assets/images/logos/hypertask.svg" alt="logo"/>
            <Typography className="text-20 ml-16 mb-16" color="textSecondary">Loading...</Typography>
            <LinearProgress className="w-xs" color="secondary"/>
        </div>
    );
}

FuseLoading.propTypes = {
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

FuseLoading.defaultProps = {
    delay: false
};

export default FuseLoading;
