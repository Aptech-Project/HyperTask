import { FuseAnimateGroup, FuseLoading, FusePageSimple } from "@fuse";
import { Hidden, Icon, IconButton, Menu, MenuItem, Tab, Tabs, Card, CardContent, Typography } from "@material-ui/core";
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
import WidgetMembers from "./widgets/WidgetMembers";
import Widget5 from "./widgets/Widget5";
import WidgetTaskDistribution from "./widgets/WidgetTaskDistribution";
import WidgetTasksDetails from "./widgets/WidgetTasksDetails";
import Widget8 from "./widgets/Widget8";
import Widget9 from "./widgets/Widget9";
import WidgetTotal from "./widgets/WidgetTotal";
import WidgetActivity from "./widgets/WidgetActivity";
import ModernInvoicePage from "app/main/pages/invoices/modern/ModernInvoicePage";
import DashboardReport from "./widgets/DashboardReport";

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
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
    },
}));

function ProjectDashboardApp(props) {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("user_authenticated");
    const user = useSelector((state) => state.login.findId);
    const state = useSelector((state) => state);
    console.log("state");
    console.log(state);
    const boardsStatistic = useSelector(({ projects }) => projects.boardsStatistic);
    const loading = useSelector(({ projects }) => projects.loading);
    const allUsers = useSelector(({ projects }) => projects.allUsers);
    console.log("boardsStatistic");
    console.log(boardsStatistic);
    console.log(allUsers);
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const [projects, setProjects] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentTaskType, setCurrentTaskType] = useState(null);

    useEffect(() => {
        if (userId !== "undefined") {
            dispatch(Actions.getDashBoardData(userId));
            dispatch(Actions.getAllUserInfo());
        }
    }, []);

    useEffect(() => {
        if (boardsStatistic && Object.keys(boardsStatistic).length) {
            const projects = [];
            Object.keys(boardsStatistic).forEach((project) => {
                projects.push(project);
            });
            setProjects(projects);
            setSelectedProject({ name: projects[0], menuEl: null });
            setCurrentTaskType({ name: "doingCards", label: "On going tasks" });
        }
    }, [boardsStatistic]);

    const onTaskTypeChange = (taskType) => {
        console.log(taskType);
        setCurrentTaskType(taskType);
    };

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
                        <Icon className={classes.headerIcon}>insert_chart_outlined</Icon>
                    </div>
                    {projects && projects.length ? (
                        <div className="flex items-end">
                            <div className="flex items-center">
                                <div className={clsx(classes.selectedProject, "flex items-center h-40 px-16 text-16")}>
                                    {projects.find((project) => project === selectedProject.name)}
                                </div>
                                <IconButton
                                    className={clsx(classes.projectMenuButton, "h-40 w-40 p-0")}
                                    aria-owns={selectedProject.menuEl ? "project-menu" : undefined}
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
                                                    handleChangeProject(project);
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
                !loading && boardsStatistic && Object.keys(boardsStatistic).length ? (
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full border-b-1 px-24"
                    >
                        <Tab className="text-14 font-600 normal-case" label="Overview" />
                        <Tab className="text-14 font-600 normal-case" label="Team Members" />
                        <Tab className="text-14 font-600 normal-case" label="Report" />
                    </Tabs>
                ) : null
            }
            content={
                !loading ? (
                    boardsStatistic && selectedProject && Object.keys(boardsStatistic).length && allUsers ? (
                        <div className="p-12">
                            {tabValue === 0 && (
                                <FuseAnimateGroup
                                    className="flex flex-wrap"
                                    enter={{
                                        animation: "transition.slideUpBigIn",
                                    }}
                                >
                                    <div className="w-full p-12">
                                        <WidgetActivity
                                            activities={boardsStatistic[selectedProject.name].cardsActivities}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <WidgetTotal
                                            title="On going"
                                            data={{
                                                label: "DOING TASKS",
                                                count: boardsStatistic[selectedProject.name].doingCards.length,
                                                extra: {
                                                    heading: "Remember",
                                                    label: "Keep track",
                                                },
                                            }}
                                            type={{ name: "doingCards", label: "On going tasks" }}
                                            onTaskTypeChange={onTaskTypeChange}
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
                                                    label: "Expand the due date",
                                                },
                                            }}
                                            type={{ name: "overdueCards", label: "Overdue tasks" }}
                                            onTaskTypeChange={onTaskTypeChange}
                                            color="red"
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <WidgetTotal
                                            title="Complete on time"
                                            data={{
                                                label: "MEET THE DUE DATE TASKS",
                                                count: boardsStatistic[selectedProject.name].completeBeforeDueCards
                                                    .length,
                                                extra: {
                                                    heading: "Test phase",
                                                    label: "Make test case",
                                                },
                                            }}
                                            type={{ name: "completeBeforeDueCards", label: "Complete on time tasks" }}
                                            onTaskTypeChange={onTaskTypeChange}
                                            color="green"
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <WidgetTotal
                                            title="Complete after due"
                                            data={{
                                                label: "LATE-SUBMITTED TASKS",
                                                count: boardsStatistic[selectedProject.name].completeAfterDueCards
                                                    .length,
                                                extra: {
                                                    heading: "Check",
                                                    label: "The reason",
                                                },
                                            }}
                                            type={{ name: "completeAfterDueCards", label: "Complete after due tasks" }}
                                            onTaskTypeChange={onTaskTypeChange}
                                            color="orange"
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 p-12">
                                        <WidgetTaskDistribution
                                            allCards={boardsStatistic[selectedProject.name].allCards}
                                            data={boardsStatistic[selectedProject.name].tasksByLabels}
                                        />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 p-12">
                                        <WidgetTasksDetails
                                            label={currentTaskType.label}
                                            data={boardsStatistic[selectedProject.name][currentTaskType.name]}
                                        />
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
                                    <div className="widget flex w-full p-12">
                                        <WidgetMembers
                                            allUsers={allUsers}
                                            data={boardsStatistic[selectedProject.name].members}
                                        />
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
                                    <DashboardReport
                                        projectName={selectedProject.name}
                                        user={user}
                                        allUsers={allUsers}
                                        data={boardsStatistic[selectedProject.name]}
                                    />
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
                                        <Typography variant="h4" className="mb-16">
                                            Hey! Thank you for checking out our app.
                                        </Typography>

                                        <Typography variant="h6" color="textSecondary" className="max-w-md">
                                            Manage your projects from start to finish. With all of your projects in
                                            Hyper Task, you’ll always know who’s doing what, by when.
                                        </Typography>
                                        <Link className="font-medium pt-24" to="/apps/scrumboard/boards">
                                            Go create board now!
                                        </Link>
                                    </CardContent>
                                </Card>
                            </FuseAnimate>
                        </div>
                    )
                ) : (
                    <FuseLoading marginTop="mt-96" />
                )
            }
            ref={pageLayout}
        />
    );
}

export default withReducer("projects", reducer)(ProjectDashboardApp);
