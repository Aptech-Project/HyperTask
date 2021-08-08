import React from 'react';
import {Icon, Typography, Paper, IconButton} from '@material-ui/core';

function WidgetTotal(props) {
    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                <Typography className="text-16">{props.title}</Typography>
                <IconButton aria-label="more">
                    <Icon>more_vert</Icon>
                </IconButton>
            </div>
            <div className="text-center pt-12 pb-28">
                <Typography
                    className={`text-72 leading-none text-${props.color}`}>{props.data.count}</Typography>
                <Typography className="text-16" color="textSecondary">{props.data.label}</Typography>
            </div>
            <div className="flex items-center px-16 h-52 border-t-1">
                <Typography className="text-15 flex w-full" color="textSecondary">
                    <b className="truncate">{props.data.extra.heading}</b>
                    :
                    <span className="pl-8">{props.data.extra.label}</span>
                </Typography>
            </div>
        </Paper>
    );
}

export default React.memo(WidgetTotal);
