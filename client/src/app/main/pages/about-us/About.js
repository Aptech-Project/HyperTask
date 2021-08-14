import React from "react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate, FuseAnimateGroup } from "@fuse";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import clsx from "clsx";
import { toggleChatPanel } from "app/fuse-layouts/shared-components/chatPanel/store/actions";

const useStyles = makeStyles((theme) => ({
    header: {
        height: 600,
        color: theme.palette.primary.contrastText,
        backgroundImage: `url('assets/images/backgrounds/aboutBg.jpg')`,
        backgroundSize: "cover",
        // backgroundRepeat: true,
    },
    badge: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.getContrastText(theme.palette.error.main),
    },
    price: {
        backgroundColor: theme.palette.primary[600],
        color: theme.palette.getContrastText(theme.palette.primary[600]),
    },
}));

function About() {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div>
            <div className={clsx(classes.header, "flex")}>
                <div className="p-24 w-full max-w-2xl mx-auto">
                    <div className="text-center my-128 mx-24">
                        <FuseAnimate
                            animation="transition.slideUpIn"
                            duration={400}
                            delay={100}
                        >
                            <Typography variant="h3" className="font-extrabold">
                                <div style={{ textShadow: '1px 3px 5px black' }}>Thank you for chosing us!</div>
                            </Typography>
                        </FuseAnimate>

                        <FuseAnimate duration={400} delay={600}>
                            <Typography
                                variant="h5"
                                color="inherit"
                                className="opacity-75 mt-16 mx-auto max-w-xl"
                            >
                                <div style={{ textShadow: '1px 2px 3px black' }}>Together We Change The Way We Do Business</div>
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>
            </div>

            <div className="-mt-192">
                <div className="w-full max-w-3xl mx-auto">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn",
                        }}
                        className="flex items-center justify-center flex-wrap"
                    >
                        <div className="w-full max-w-400 sm:w-1/4 p-12">
                            <Card className="relative">
                                <div className="p-32 text-center">
                                    <Typography className="text-24">
                                        Duong Ngoc Hai
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">
                                    <div
                                        className={clsx(
                                            classes.price,
                                            "flex items-end justify-center py-24 px-32"
                                        )}
                                    >
                                        <Typography className="text-18" color="inherit">
                                            Team Leader
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            0375911341
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            ngochaiitech@gmail.com
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            github.com/SimpleCray
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="w-full max-w-400 pt-64 sm:w-1/4 p-12">
                            <Card className="relative">
                                <div className="p-32 text-center">
                                    <Typography className="text-24">
                                        Le Tuan Khang
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">
                                    <div
                                        className={clsx(
                                            classes.price,
                                            "flex items-end justify-center py-24 px-32"
                                        )}
                                    >
                                        <Typography className="text-18" color="inherit">
                                            Team Member
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            0976553787
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            khangletuan098@gmail.com
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            github.com/tuankhang39
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="w-full max-w-400 pt-64 sm:w-1/4 p-12">
                            <Card className="relative">
                                <div className="p-32 text-center">
                                    <Typography className="text-24">
                                        Nguyen Hien Long
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">
                                    <div
                                        className={clsx(
                                            classes.price,
                                            "flex items-end justify-center py-24 px-32"
                                        )}
                                    >
                                        <Typography className="text-18" color="inherit">
                                            Team Member
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            0786831675
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            nguyenhienlong96@gmail.com
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            github.com/aegone-nguyen
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="w-full max-w-400 sm:w-1/4 p-12">
                            <Card className="relative">
                                <div className="p-32 text-center">
                                    <Typography className="text-24">
                                        Nguyen Xuan Phong
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">
                                    <div
                                        className={clsx(
                                            classes.price,
                                            "flex items-end justify-center py-24 px-32"
                                        )}
                                    >
                                        <Typography className="text-18" color="inherit">
                                            Team Member
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            0366624443
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            nguyenxuan.phong.1998@gmail.com
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16 text-18"
                                        >
                                            github.com/SimpleCray
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </FuseAnimateGroup>

                    <div className="flex flex-col items-center py-96 text-center sm:text-left max-w-xl mx-auto">
                        <Typography variant="h4" className="pb-32 font-light">
                            About Hyper Task
                        </Typography>

                        <Typography variant="h6" className="pb-32 font-light max-w-md text-center">
                            We believe in teams. Yours and ours. Our mission, culture, and commitment to fostering a diverse, inclusive workplace let us build a product people love and stay true to ourselves.
                        </Typography>
                        
                        <div className="flex flex-wrap w-full">

                            <div className="w-full sm:w-1/2 p-24">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Icon>lock</Icon>
                                    <Typography className="text-20 mb-8">
                                        &nbsp; Who We Are
                                    </Typography>
                                </div>
                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    A group of young developers with full of enthusiasm and intense desire 
                                    to dedicate themselves to produce the best software
                                </Typography>
                            </div>

                            

                            <div className="w-full sm:w-1/2 p-24">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Icon>insert_chart</Icon>
                                    <Typography className="text-20 mb-8">
                                        &nbsp; What We Do
                                    </Typography>
                                </div>

                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    Ensure a smooth, organizanization-wide digital transformation for how peoples all work together
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Icon>assignment</Icon>
                                    <Typography className="text-20 mb-8">
                                        &nbsp; Our Misson
                                    </Typography>
                                </div>
                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    Help humanity thrive by enabling the world's teams to work together effortlessly.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Icon>comment</Icon>
                                    <Typography className="text-20 mb-8">
                                        &nbsp; Our Slogan
                                    </Typography>
                                </div>
                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    
                                    "Build yourself up to stand out and be recognized in a crowd."
                                </Typography>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
