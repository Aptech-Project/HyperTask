import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

function LogoLoading() {
    return (
        <div className="flex items-center">
            <img
                className="w-xs logo-icon"
                src="assets/images/logos/hypertask.svg"
                alt="logo"
            />
            <CircularProgress />
        </div>
    );
}

export default LogoLoading;
