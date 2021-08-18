import React, { useEffect, useMemo, useState } from "react";
import {
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
import history from "@history";

import { makeStyles, useTheme } from "@material-ui/styles";
import { FuseAnimate, FuseAnimateGroup } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import clsx from "clsx";
import _ from "@lodash";
import { Link } from "react-router-dom";
import moment from 'moment';
import * as Actions from "../store/actions";
import * as actionsCard from "app/main/apps/scrumboard/store/actions";
const useStyles = makeStyles((theme) => ({
    header: {
        background:
            "linear-gradient(to right, " +
            theme.palette.primary.dark +
            " 0%, " +
            theme.palette.primary.main +
            " 100%)",
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    headerIcon: {
        position: "absolute",
        top: -64,
        left: 0,
        opacity: 0.04,
        fontSize: 512,
        width: 512,
        height: 512,
        pointerEvents: "none",
    },
    card: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    cardCover: {
        display: "block",
        width: "274px",
        height: "154px",
        objectFit: "cover",
    }
}));

function CardsTab(props) {
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const theme = useTheme();
    const [searchText, setSearchText] = useState("");
    const [selectedBoard, setSelectedBoard] = useState("all");
    const [selectedDone, setSelectedDone] = useState("notDone");
    const boardsInfo = useSelector(state => state.ProfilePage.card.boards)
    const [lists, setLists] = useState(null);
    const [cards, setCards] = useState(null);
    const [filteredData, setFilteredData] = useState(cards);
    const userID = localStorage.getItem("user_authenticated");
    useEffect(() => {
        dispatch(Actions.getBoards());
    }, [dispatch]);
    useEffect(() => {
        if (boardsInfo != []) {
            let arryList = []
            boardsInfo.forEach(element => {
                let tmpObject = JSON.parse(element.lists)
                tmpObject.boardId = element.id
                tmpObject.boardName = element.name
                arryList.push(tmpObject)
            });
            setLists(arryList)
        }
    }, [boardsInfo]);
    useEffect(() => {
        if (lists && lists != []) {
            let arryCards = []
            lists.forEach(element => {
                element.forEach(element1 => {
                    element1.cards.forEach(element2 => {
                        if (element2.members.includes(parseInt(userID)) && element2.isDone == false) {
                            let obj = element2
                            obj.boardId = element.boardId
                            obj.boardName = element.boardName
                            obj.CardIndex = arryCards.length + 1
                            arryCards.push(obj)
                        }
                        if (parseInt(element2.author) == parseInt(userID)) {
                            let obj = element2
                            obj.boardId = element.boardId
                            obj.boardName = element.boardName
                            obj.CardIndex = arryCards.length + 1
                            if (!arryCards.includes(obj)) {
                                arryCards.push(obj)
                            }
                        }

                    });
                });
            });
            setCards(arryCards)
        }
    }, [lists]);
    useEffect(() => {
        if (cards && cards != []) {
            let filteredCards = cards.filter(card => card.name.toUpperCase().includes(searchText.toUpperCase()));
            if (selectedBoard != "all") {
                filteredCards = filteredCards.filter(card => card.boardId == selectedBoard);
            }
            if (selectedDone == "done") {
                filteredCards = filteredCards.filter(card => card.isDone == true);
            }
            if (selectedDone == "notDone") {
                filteredCards = filteredCards.filter(card => card.isDone == false);
            }
            setFilteredData(filteredCards);
        }
    }, [searchText, cards, selectedBoard, selectedDone]);

    function handleCardClick(ev, card) {
        ev.preventDefault();
        let boardId = card.boardId
        for (let index = 0; index < ["boardId", "boardName", "CardIndex"].length; index++) {
            const element = ["boardId", "boardName", "CardIndex"][index];
            if (element in card) {
                delete card[element]
            }
        }
        history.push({
            pathname: "/apps/scrumboard/boards/" + boardId,
        });
        setTimeout(function () {
            dispatch(actionsCard.openCardDialog(card))
        }, 1200);

    }
    function getCheckItemsChecked(card) {
        return _.sum(
            card.checklist.map((list) =>
                _.sum(list.checkItems.map((x) => (x.checked ? 1 : 0)))
            )
        );
    }
    function getCheckItems(card) {
        return _.sum(card.checklist.map((x) => x.checkItems.length));
    }
    function getCommentsCount(card) {
        return _.sum(card.activities.map((x) => (x.type === "comment" ? 1 : 0)));
    }
    return (
        <div className="flex flex-col flex-1 w-full">
            <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
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
                    <FormControl
                        className="flex w-full sm:w-320 mx-16"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="board-label-placeholder">
                            Status
                        </InputLabel>
                        <Select
                            value={selectedDone}
                            onChange={(e) => setSelectedDone(e.target.value)}
                            input={
                                <OutlinedInput
                                    labelWidth={80}
                                    name="Status"
                                    id="board-label-placeholder"
                                />
                            }
                        >
                            <MenuItem value="notDone" key="notDone">
                                <em>Not Done</em>
                            </MenuItem>
                            <MenuItem value="done" key="done">
                                <em>Done</em>
                            </MenuItem>
                            <MenuItem value="all" key="allStatus">
                                <em>All</em>
                            </MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl
                        className="flex w-full sm:w-320 mx-16"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="board-label-placeholder">
                            Board name
                        </InputLabel>
                        <Select
                            value={selectedBoard}
                            onChange={(e) => setSelectedBoard(e.target.value)}
                            input={
                                <OutlinedInput
                                    labelWidth={80}
                                    name="board"
                                    id="board-label-placeholder"
                                />
                            }
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
                {useMemo(
                    () =>
                        filteredData &&
                        (filteredData.length > 0 ? (
                            <FuseAnimateGroup
                                enter={{
                                    animation: "transition.slideUpBigIn",
                                }}
                                className="flex flex-wrap py-24"
                            >
                                {filteredData.map((card) => {
                                    return (
                                        <div
                                            className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16"
                                            key={card.CardIndex}
                                        >
                                            <Card
                                                className={clsx(classes.card, "w-full mb-16 rounded-4 cursor-pointer border-1")}
                                                onDoubleClick={(ev) => handleCardClick(ev, card)}
                                            >
                                                {card.idAttachmentCover && card.idAttachmentCover !== "" && (
                                                    <img
                                                        className={clsx(classes.cardCover, "block")}
                                                        src={
                                                            _.find(card.attachments, { id: card.idAttachmentCover }).src
                                                        }
                                                        alt="card cover"
                                                    />
                                                )}
                                                {(!card.idAttachmentCover || card.idAttachmentCover == "") && (
                                                    <img className="block" src="assets/images/logos/teamwork.png" alt="card cover" />
                                                )}
                                                <div className="p-16 pb-0">

                                                    {card.labels.length > 0 && (
                                                        <div className="flex flex-wrap mb-8">
                                                            {card.labels.map(id => {
                                                                const board = boardsInfo.find(board => board.id === card.boardId);
                                                                const labels = JSON.parse(board.labels)
                                                                const label = _.find(labels, { id });
                                                                return (
                                                                    label && < Tooltip title={label.name} key={id} >
                                                                        <div className={clsx(label.class, "w-32  h-6 rounded-6 mr-6 mb-6")} />
                                                                    </Tooltip>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    <Typography className="font-600 mb-12">{card.name}</Typography>
                                                    {!card.isDone && (card.due || (card.checklist && card.checklist.length > 0)) && (
                                                        <div className="flex items-center mb-12">
                                                            {card.due && (
                                                                <div
                                                                    className={clsx("flex items-center px-8 py-4 mr-8 rounded-sm", moment() > moment(card.due) ? "bg-red text-white" : "bg-green text-white")}>
                                                                    <Icon className="text-16 mr-4">access_time</Icon>
                                                                    <span>{moment(card.due).format("MMM Do YY")}</span>
                                                                </div>
                                                            )}

                                                            {card.checklist && card.checklist.length > 0 && (
                                                                <div
                                                                    className={clsx("flex items-center px-8 py-4 mr-8 rounded-sm", getCheckItemsChecked(card) === getCheckItems(card) ? "bg-green text-white" : "bg-grey-dark text-white")}
                                                                >
                                                                    <Icon className="text-16 mr-4">check_circle</Icon>
                                                                    <span>{getCheckItemsChecked(card)}</span>
                                                                    <span>/</span>
                                                                    <span>{getCheckItems(card)}</span>
                                                                </div>
                                                            )}

                                                        </div>
                                                    )}
                                                    {card.isDone && (card.due || (card.checklist && card.checklist.length > 0)) && (
                                                        <div className="flex items-center mb-12">
                                                            {card.due && (
                                                                <div
                                                                    className={clsx("flex items-center px-8 py-4 mr-8 rounded-sm", moment(card.due) > moment(card.doneAt) ? "bg-red text-white" : "bg-green text-white")}>
                                                                    <Icon className="text-16 mr-4">access_time</Icon>
                                                                    <span>{moment(card.due).format("MMM Do YY")}</span>
                                                                </div>
                                                            )}

                                                            {card.checklist && card.checklist.length > 0 && (
                                                                <div
                                                                    className={clsx("flex items-center px-8 py-4 mr-8 rounded-sm", getCheckItemsChecked(card) === getCheckItems(card) ? "bg-green text-white" : "bg-grey-dark text-white")}
                                                                >
                                                                    <Icon className="text-16 mr-4">check_circle</Icon>
                                                                    <span>{getCheckItemsChecked(card)}</span>
                                                                    <span>/</span>
                                                                    <span>{getCheckItems(card)}</span>
                                                                </div>
                                                            )}

                                                        </div>
                                                    )}

                                                </div>

                                                <div className="flex justify-between h-48 px-16 border-t-1">
                                                    <div className="flex items-center">
                                                        {/* {card.subscribed && (
                                                            <Icon className="text-18 mr-12" color="action">remove_red_eye</Icon>
                                                        )} */}

                                                        {card.description !== '' && (
                                                            <Icon className="text-18 mr-12" color="action">description</Icon>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-end">
                                                        {card.attachments && (
                                                            <span className="flex items-center ml-12">
                                                                <Icon className="text-18 mr-8" color="action">attachment</Icon>
                                                                <Typography color="textSecondary">{card.attachments.length}</Typography>
                                                            </span>
                                                        )}
                                                        {getCommentsCount(card) > 0 && (
                                                            <span className="flex items-center ml-12">
                                                                <Icon className="text-18 mr-8" color="action">
                                                                    comment
                                                                </Icon>
                                                                <Typography color="textSecondary">
                                                                    {getCommentsCount(card)}
                                                                </Typography>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </FuseAnimateGroup>
                        ) : (
                            <div className="flex flex-1 items-center justify-center">
                                <Typography
                                    color="textSecondary"
                                    className="text-24 my-24"
                                >
                                    No cards found!
                                </Typography>
                            </div>
                        )),
                    [boardsInfo, filteredData, theme.palette]
                )}
            </div>
        </div>
    );
}

export default CardsTab;
