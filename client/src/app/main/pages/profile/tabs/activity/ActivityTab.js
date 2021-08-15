import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Card,
    CardContent,
    OutlinedInput,
    Icon,
    TextField,
    Typography,
    CardActions,
    Divider,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    LinearProgress,
    Avatar,
    Tooltip,
} from "@material-ui/core";
import * as Actions from "../store/actions";
import { getUsersActivity } from "./ActivityFunction";
import history from "@history";
import { openCardDialog } from "app/main/apps/scrumboard/store/actions";

const columns = [
    { id: "boardName", label: "Board", minWidth: 170 },
    { id: "message", label: "Activity", minWidth: 170 },
    { id: "time", label: "Date", minWidth: 170 },
];

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    header: {
        backgroundColor: "rgb(52,57,71)",
    },
    container: {
        maxHeight: 440,
    },
});

export default function ActivityTab() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchText, setSearchText] = useState("");
    const [selectedBoard, setSelectedBoard] = useState("all");
    const [activities, setActivities] = React.useState([]);
    const [filteredData, setFilteredData] = useState(activities);
    const boardsInfo = useSelector((state) => state.ProfilePage.card.boards);
    const userId = localStorage.getItem("user_authenticated");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        dispatch(Actions.getBoards());
    }, [dispatch]);

    useEffect(() => {
        if (boardsInfo.length) {
            const activities = getUsersActivity(userId, boardsInfo);
            console.log(activities);
            setActivities(activities);
        }
    }, [boardsInfo]);

    useEffect(() => {
        if (activities?.length) {
            let filteredActivities = activities.filter(activity => activity.message.toLowerCase().includes(searchText.toLowerCase()));
            if (selectedBoard !== "all") {
                filteredActivities = filteredActivities.filter(activity => activity.boardId == selectedBoard);
            }
            setFilteredData(filteredActivities);
        }
    }, [searchText, activities, selectedBoard]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleActivityClick(activity) {
        history.push({
            pathname: "/apps/scrumboard/boards/" + activity.boardId,
        });
        if (activity.card) {
            setTimeout(function () {
                dispatch(openCardDialog(activity.card))
            }, 1500);
        }
    }

    return filteredData ? (
        <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-12">
                <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                    <TextField
                        label="Search for a card"
                        placeholder="Enter card name..."
                        className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                        value={searchText}
                        inputProps={{
                            "aria-label": "Search",
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                        <InputLabel htmlFor="board-label-placeholder">Board name</InputLabel>
                        <Select
                            value={selectedBoard}
                            onChange={(e) => setSelectedBoard(e.target.value)}
                            input={<OutlinedInput labelWidth={80} name="board" id="board-label-placeholder" />}
                        >
                            <MenuItem value="all">
                                <em>All</em>
                            </MenuItem>

                            {boardsInfo.map((board) => (
                                <MenuItem value={board.id} key={board.id}>
                                    {board.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <Paper className={classes.root}>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow className={classes.header}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <Typography variant="subtitle1" style={{ color: "white" }}>
                                            {column.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow style={{cursor: "pointer"}} onDoubleClick={() => handleActivityClick(row)} hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    ) : null;
}
