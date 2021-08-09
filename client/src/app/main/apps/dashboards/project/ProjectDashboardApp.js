import { FuseAnimateGroup, FuseLoading, FusePageSimple } from "@fuse";
import {
    Hidden,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import withReducer from "app/store/withReducer";
import clsx from "clsx";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectData } from "./MockData";
import { FuseAnimate } from "@fuse";
import { Link } from "react-router-dom";
import * as Actions from "./store/actions/projects.actions";
import reducer from "./store/reducers/projects.reducer";
import Widget10 from "./widgets/Widget10";
import Widget11 from "./widgets/Widget11";
import Widget5 from "./widgets/Widget5";
import WidgetTaskDistribution from "./widgets/WidgetTaskDistribution";
import WidgetInprocessing from "./widgets/WidgetInprocessing";
import Widget8 from "./widgets/Widget8";
import Widget9 from "./widgets/Widget9";
import WidgetTotal from "./widgets/WidgetTotal";

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
        position: "absolute",
        top: 0,
        left: "80%",
        opacity: 0.2,
        fontSize: 160,
        width: 200,
        height: 200,
        pointerEvents: "none",
    },
    loading: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
}));

function ProjectDashboardApp(props) {
    const dispatch = useDispatch();
    // const projects = projectData.projects;
    const widgets = projectData.widgets;
    const userId = localStorage.getItem('user_authenticated');
    const user = useSelector((state)=>state.login.findId);
    const boardsStatistic = useSelector(
        ({ projects }) => projects.boardsStatistic
    );
    const loading = useSelector(({ projects }) => projects.loading);
    console.log("boardsStatistic");
    console.log(boardsStatistic);
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const [projects, setProjects] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (userId !== 'undefined') {
            dispatch(Actions.getDashBoardData(userId));
        }
    }, []);

    useEffect(() => {
        if (boardsStatistic && Object.keys(boardsStatistic).length) {
            const projects = [];
            Object.keys(boardsStatistic).forEach((project) => {
                projects.push(project);
            });
            setProjects(projects);
            setSelectedProject({name: projects[0], menuEl: null});
        }
    }, [boardsStatistic]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    function handleChangeProject(projectName) {
        setSelectedProject({
            name: projectName,
            menuEl: null,
        });
    }

    function handleOpenProjectMenu(event) {
        setSelectedProject({
            name: selectedProject.name,
            menuEl: event.currentTarget,
        });
    }

    function handleCloseProjectMenu() {
        setSelectedProject({
            name: selectedProject.name,
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
                            Welcome, {(user && user.fullname) || "Guest"} !
                        </Typography>
                        <Icon className={classes.headerIcon}>
                            insert_chart_outlined
                        </Icon>
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
                    {projects && projects.length ? (
                        <div className="flex items-end">
                            <div className="flex items-center">
                                <div
                                    className={clsx(
                                        classes.selectedProject,
                                        "flex items-center h-40 px-16 text-16"
                                    )}
                                >
                                    {projects.find(project => project === selectedProject.name)}
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
                                                key={project}
                                                onClick={(ev) => {
                                                    handleChangeProject(
                                                        project
                                                    );
                                                }}
                                            >
                                                {project}
                                            </MenuItem>
                                        ))}
                                </Menu>
                            </div>
                        </div>
                    ) : null}
                </div>
            }
            contentToolbar={
                !loading &&
                boardsStatistic &&
                Object.keys(boardsStatistic).length ? (
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
                        {/* haiduongtodo: implement detail tab*/}
                        {/* <Tab
                            className="text-14 font-600 normal-case"
                            label="Budget Summary"
                        /> */}
                        <Tab
                            className="text-14 font-600 normal-case"
                            label="Team Members"
                        />
                    </Tabs>
                ) : null
            }
            content={
                !loading ? (
                    boardsStatistic && selectedProject && Object.keys(boardsStatistic).length ? (
                        <div className="p-12">
                            {tabValue === 0 && (
                                <FuseAnimateGroup
                                    className="flex flex-wrap"
                                    enter={{
                                        animation: "transition.slideUpBigIn",
                                    }}
                                >
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <WidgetTotal
                                            title="On going"
                                            data={{
                                                label: "DOING TASKS",
                                                count: boardsStatistic[selectedProject.name].doingCards.length,
                                                extra: {
                                                    heading: "Remember",
                                                    label: "Keep track"
                                                }
                                            }}
                                            color="blue"
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <WidgetTotal
                                            title="Overdue"
                                            data={{
                                                label: "OVER DATED TASKS",
                                                count: boardsStatistic[selectedProject.name].overdueCards.length,
                                                extra: {
                                                    heading: "Importance",
                                                    label: "Expand the due date"
                                                }
                                            }}
                                            color="red"
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <WidgetTotal
                                            title="Complete on time"
                                            data={{
                                                label: "MEET THE DUE DATE TASKS",
                                                count: boardsStatistic[selectedProject.name].completeBeforeDueCards.length,
                                                extra: {
                                                    heading: "Test phase",
                                                    label: "Make test case"
                                                }
                                            }}
                                            color="green"
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <WidgetTotal
                                            title="Complete after due"
                                            data={{
                                                label: "LATE-SUBMITTED TASKS",
                                                count: boardsStatistic[selectedProject.name].completeAfterDueCards.length,
                                                extra: {
                                                    heading: "Check",
                                                    label: "The reason"
                                                }
                                            }}
                                            color="orange"
                                        />
                                    </div>
                                    {/* haiduongtodo: implement multi chart*/}
                                    {/* <div className="widget flex w-full p-12">
                                        <Widget5 widget={widgets.widget5} />
                                    </div> */}
                                    <div className="widget flex w-full sm:w-1/2 p-12">
                                        <WidgetTaskDistribution allCards={boardsStatistic[selectedProject.name].allCards} data={boardsStatistic[selectedProject.name].tasksByLabels}/>
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 p-12">
                                        <WidgetInprocessing data={boardsStatistic[selectedProject.name].doingCards} widget={widgets.widget7} />
                                    </div>
                                </FuseAnimateGroup>
                            )}
                            {/* haiduongtodo: implement detail tab*/}
                            {/* {tabValue === 1 && (
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
                            )} */}
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
                    ) : (
                        <div className="flex flex-col p-84 items-center justify-center w-full">
                            <FuseAnimate animation="transition.expandIn">
                                <Card className="w-full max-w-700">
                                    <CardContent className="flex flex-col items-center justify-center p-32 text-center">
                                        <img
                                            className="w-192 m-32"
                                            src="assets/images/logos/hypertask.svg"
                                            alt="logo"
                                        />
                                        <Typography
                                            variant="h4"
                                            className="mb-16"
                                        >
                                            Hey! Thank you for checking out our
                                            app.
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            color="textSecondary"
                                            className="max-w-md"
                                        >
                                            Manage your projects from start to
                                            finish. With all of your projects in
                                            Hyper Task, you’ll always know who’s
                                            doing what, by when.
                                        </Typography>
                                        <Link
                                            className="font-medium pt-24"
                                            to="/apps/scrumboard/boards"
                                        >
                                            Go create board now!
                                        </Link>
                                    </CardContent>
                                </Card>
                            </FuseAnimate>
                        </div>
                    )
                ) : (
                    <FuseLoading marginTop="mt-96"/>
                )
            }
            ref={pageLayout}
        />
    );
}

export default withReducer("projects", reducer)(ProjectDashboardApp);
