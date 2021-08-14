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
        backgroundImage: `url('assets/images/backgrounds/featureBg2.jpg')`,
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

function Features() {
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
                                <div style={{ textShadow: '1px 3px 5px black' }}>Visualize your work however you want!</div>
                            </Typography>
                        </FuseAnimate>

                        <FuseAnimate duration={400} delay={600}>
                            <Typography
                                variant="h5"
                                color="inherit"
                                className="opacity-75 mt-16 mx-auto max-w-512"
                            >
                                Hyper Task is built for everyone, so you can
                                plan and structure work how you want.
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>
            </div>

            <div className="-mt-192">
                <div className="w-full max-w-2xl mx-auto">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn",
                        }}
                        className="flex items-center justify-center flex-wrap"
                    >
                        <div className="w-full max-w-320 sm:w-1/3 p-12">
                            <Card className="relative">
                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Communication
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">
                                    <div
                                        className={clsx(
                                            classes.price,
                                            "flex items-end justify-center py-24 px-32"
                                        )}
                                    >
                                        <Typography color="inherit">
                                            Tie your communication to teams
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Online chatting
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Task comments
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Task assignees
                                        </Typography>
                                        <Typography color="textSecondary">
                                            And many more...
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    <Button
                                        onClick={(ev) =>
                                            dispatch(toggleChatPanel())
                                        }
                                        variant="contained"
                                        color="secondary"
                                        className="w-full"
                                    >
                                        CHAT NOW
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <div className="w-full max-w-320 sm:w-1/3 p-12">
                            <Card className="relative" raised>
                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Project Management
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        className="text-16 font-medium"
                                    ></Typography>
                                </div>

                                <CardContent className="text-center p-0">
                                    <div
                                        className={clsx(
                                            classes.price,
                                            "flex items-end justify-center py-24 px-32"
                                        )}
                                    >
                                        <Typography color="inherit">
                                            Manage your projects from A - Z
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Unlimited projects
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Unlimited lists
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Unlimited cards
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Custom fields
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Due dates and times
                                        </Typography>
                                        <Typography color="textSecondary">
                                            And many more...
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    <Button
                                        component={Link}
                                        to="/apps/scrumboard/boards"
                                        variant="contained"
                                        color="secondary"
                                        className="w-full"
                                    >
                                        GO CREATE BOARD
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <div className="w-full max-w-320 sm:w-1/3 p-12">
                            <Card className="relative">
                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Data analytics
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">
                                    <div
                                        className={clsx(
                                            classes.price,
                                            "flex items-end justify-center py-24 px-32"
                                        )}
                                    >
                                        <Typography color="inherit">
                                            Real-time overview of your works
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Your tasks
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Timeline
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            className="mb-16"
                                        >
                                            Calendar view
                                        </Typography>
                                        <Typography color="textSecondary">
                                            And many more...
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    <Button
                                        component={Link}
                                        to="/dashboard"
                                        variant="contained"
                                        color="secondary"
                                        className="w-full"
                                    >
                                        DASHBOARD
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </FuseAnimateGroup>
                    <div className="flex flex-col items-center py-96 text-center sm:text-left max-w-xl mx-auto">
                        <Typography variant="h4" className="pb-32 font-light">
                            Understand Hyper Task’s core features
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
                                    <Icon>assignment</Icon>
                                    <Typography className="text-20 mb-8">
                                        &nbsp; Project Management
                                    </Typography>
                                </div>
                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    Manage your projects from start to finish.
                                    With all of your projects in Hyper Task, you’ll
                                    always know who’s doing what, by when.
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
                                        &nbsp; Communication
                                    </Typography>
                                </div>
                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    Tie your communication to teams, projects,
                                    or tasks to give your team clarity about
                                    where work stands.
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
                                    <Icon>lock</Icon>
                                    <Typography className="text-20 mb-8">
                                        &nbsp; Admin controls
                                    </Typography>
                                </div>
                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    Create and manage teams and team settings to
                                    ensure that everyone has access to the right
                                    information.
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
                                        &nbsp; Views and reporting
                                    </Typography>
                                </div>

                                <Typography
                                    className="text-16"
                                    color="textSecondary"
                                >
                                    Easily know where work stands and see what’s
                                    happening across your entire organization
                                    with reporting capabilities.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
