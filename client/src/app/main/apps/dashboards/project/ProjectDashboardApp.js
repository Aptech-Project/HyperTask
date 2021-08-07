import React, { useEffect, useRef, useState } from "react";
import {
    Menu,
    MenuItem,
    Hidden,
    Icon,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@material-ui/core";
import { FuseAnimateGroup, FusePageSimple } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import _ from "lodash";
import clsx from "clsx";
import * as Actions from "./store/actions/projects.actions";
import reducer from "./store/reducers/projects.reducer";
import WidgetTotal from "./widgets/WidgetTotal";
import Widget2 from "./widgets/Widget2";
import Widget3 from "./widgets/Widget3";
import Widget4 from "./widgets/Widget4";
import Widget5 from "./widgets/Widget5";
import Widget6 from "./widgets/Widget6";
import Widget7 from "./widgets/Widget7";
import Widget8 from "./widgets/Widget8";
import Widget9 from "./widgets/Widget9";
import Widget10 from "./widgets/Widget10";
import Widget11 from "./widgets/Widget11";
import { makeStyles } from "@material-ui/styles";
import { projectData } from './MockData';

const useStyles = makeStyles((theme) => ({
    content: {
        "& canvas": {
            maxHeight: "100%",
        },
    },
    selectedProject: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "8px 0 0 0",
    },
    projectMenuButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "0 8px 0 0",
        marginLeft: 1,
    },
    headerIcon: {
        position: 'absolute',
        top: 0,
        left: '80%',
        opacity: .2,
        fontSize: 160,
        width: 200,
        height: 200,
        pointerEvents: 'none'
    }
}));

function ProjectDashboardApp(props) {
    const dispatch = useDispatch();
    const projects = projectData.projects;
    const widgets = projectData.widgets;
    const user = useSelector((state)=>state.login.findId);

    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const [selectedProject, setSelectedProject] = useState({
        id: 1,
        menuEl: null,
    });

    useEffect(() => {
        if (user) {
            dispatch(Actions.getDashBoardData(user.id));
        }
    }, [])

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    function handleChangeProject(id) {
        setSelectedProject({
            id,
            menuEl: null,
        });
    }

    function handleOpenProjectMenu(event) {
        setSelectedProject({
            id: selectedProject.id,
            menuEl: event.currentTarget,
        });
    }

    function handleCloseProjectMenu() {
        setSelectedProject({
            id: selectedProject.id,
            menuEl: null,
        });
    }

    return (
        <FusePageSimple
            classes={{
                header: "min-h-160 h-160",
                toolbar: "min-h-48 h-48",
                rightSidebar: "w-288",
                content: classes.content,
            }}
            header={
                <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                    <div className="flex justify-between items-start">
                        <Typography className="py-0 sm:py-24" variant="h4">
                            Welcome back, {(user && user.fullname) || "Guest "} !
                        </Typography>
                            <Icon className={classes.headerIcon}>insert_chart_outlined</Icon>
                            {/* <Icon style={{left:'60%'}} className={classes.headerIcon}>show_chart</Icon>
                            <Icon style={{left:'70%'}} className={classes.headerIcon}>bubble_chart</Icon> */}
                        <Hidden lgUp>
                            <IconButton
                                onClick={(ev) =>
                                    pageLayout.current.toggleRightSidebar()
                                }
                                aria-label="open left sidebar"
                            >
                                <Icon>menu</Icon>
                            </IconButton>
                        </Hidden>
                    </div>
                    <div className="flex items-end">
                        <div className="flex items-center">
                            <div
                                className={clsx(
                                    classes.selectedProject,
                                    "flex items-center h-40 px-16 text-16"
                                )}
                            >
                                {
                                    _.find(projects, ["id", selectedProject.id])
                                        .name
                                }
                            </div>
                            <IconButton
                                className={clsx(
                                    classes.projectMenuButton,
                                    "h-40 w-40 p-0"
                                )}
                                aria-owns={
                                    selectedProject.menuEl
                                        ? "project-menu"
                                        : undefined
                                }
                                aria-haspopup="true"
                                onClick={handleOpenProjectMenu}
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="project-menu"
                                anchorEl={selectedProject.menuEl}
                                open={Boolean(selectedProject.menuEl)}
                                onClose={handleCloseProjectMenu}
                            >
                                {projects &&
                                    projects.map((project) => (
                                        <MenuItem
                                            key={project.id}
                                            onClick={(ev) => {
                                                handleChangeProject(project.id);
                                            }}
                                        >
                                            {project.name}
                                        </MenuItem>
                                    ))}
                            </Menu>
                        </div>
                    </div>
                </div>
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full border-b-1 px-24"
                >
                    <Tab
                        className="text-14 font-600 normal-case"
                        label="Home"
                    />
                    <Tab
                        className="text-14 font-600 normal-case"
                        label="Budget Summary"
                    />
                    <Tab
                        className="text-14 font-600 normal-case"
                        label="Team Members"
                    />
                </Tabs>
            }
            content={
                <div className="p-12">
                    {tabValue === 0 && (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn",
                            }}
                        >
                            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                <WidgetTotal widget={widgets.widget1} />
                            </div>
                            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                <Widget2 widget={widgets.widget2} />
                            </div>
                            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                <Widget3 widget={widgets.widget3} />
                            </div>
                            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                <Widget4 widget={widgets.widget4} />
                            </div>
                            <div className="widget flex w-full p-12">
                                <Widget5 widget={widgets.widget5} />
                            </div>
                            <div className="widget flex w-full sm:w-1/2 p-12">
                                <Widget6 widget={widgets.widget6} />
                            </div>
                            <div className="widget flex w-full sm:w-1/2 p-12">
                                <Widget7 widget={widgets.widget7} />
                            </div>
                        </FuseAnimateGroup>
                    )}
                    {tabValue === 1 && (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn",
                            }}
                        >
                            <div className="widget flex w-full sm:w-1/2 p-12">
                                <Widget8 widget={widgets.widget8} />
                            </div>
                            <div className="widget flex w-full sm:w-1/2 p-12">
                                <Widget9 widget={widgets.widget9} />
                            </div>
                            <div className="widget flex w-full p-12">
                                <Widget10 widget={widgets.widget10} />
                            </div>
                        </FuseAnimateGroup>
                    )}
                    {tabValue === 2 && (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn",
                            }}
                        >
                            <div className="widget flex w-full p-12">
                                <Widget11 widget={widgets.widget11} />
                            </div>
                        </FuseAnimateGroup>
                    )}
                </div>
            }
            ref={pageLayout}
        />
    );
}

export default withReducer("projectDashboardApp", reducer)(ProjectDashboardApp);
