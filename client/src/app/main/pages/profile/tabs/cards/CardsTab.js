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
import { makeStyles, useTheme } from "@material-ui/styles";
import { FuseAnimate, FuseAnimateGroup } from "@fuse";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import clsx from "clsx";
import _ from "@lodash";
import { Link } from "react-router-dom";
import { cards } from "./CardsData";
import moment from 'moment';

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
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
}));

function CardsTab(props) {
    const dispatch = useDispatch();

    const classes = useStyles(props);
    const theme = useTheme();
    const [searchText, setSearchText] = useState("");
    const [selectedBoard, setSelectedBoard] = useState("all");
    console.log(cards);
    const [filteredData, setFilteredData] = useState(cards);
    const boardsInfo = [
        {
            id: "1",
            name: "board 1",
            labels: [
                {
                  id: "1",
                  name: "High Priority",
                  class: "bg-red text-white",
                },
                {
                  id: "2",
                  name: "Design",
                  class: "bg-orange text-white",
                },
                {
                  id: "3",
                  name: "App",
                  class: "bg-blue text-white",
                },
                {
                  id: "4",
                  name: "Feature",
                  class: "bg-green text-white",
                },
              ],
            members: [
                {
                id: "1",
                name: "Alice Freeman",
                avatar: "assets/images/avatars/alice.jpg",
                },
                {
                id: "2",
                name: "Danielle Obrien",
                avatar: "assets/images/avatars/danielle.jpg",
                },
                {
                id: "3",
                name: "James Lewis",
                avatar: "assets/images/avatars/james.jpg",
                },
                {
                id: "4",
                name: "John Doe",
                avatar: "assets/images/avatars/Velazquez.jpg",
                },
            ],
        },
        {
            id: "2",
            name: "board 2",
            labels: [
                {
                  id: "1",
                  name: "High Priority",
                  class: "bg-red text-white",
                },
                {
                  id: "2",
                  name: "Design",
                  class: "bg-orange text-white",
                },
                {
                  id: "3",
                  name: "App",
                  class: "bg-blue text-white",
                },
                {
                  id: "4",
                  name: "Feature",
                  class: "bg-green text-white",
                },
              ],
              members: [
                  {
                  id: "1",
                  name: "Alice Freeman",
                  avatar: "assets/images/avatars/alice.jpg",
                  },
                  {
                  id: "2",
                  name: "Danielle Obrien",
                  avatar: "assets/images/avatars/danielle.jpg",
                  },
                  {
                  id: "3",
                  name: "James Lewis",
                  avatar: "assets/images/avatars/james.jpg",
                  },
                  {
                  id: "4",
                  name: "John Doe",
                  avatar: "assets/images/avatars/Velazquez.jpg",
                  },
              ],
        },
    ];
    useEffect(() => {
        if (cards.length) {
            const filteredCards = cards.filter(card => card.name.includes(searchText));
            setFilteredData(filteredCards);
        }
    }, [searchText]);

    function handleCardClick(ev, card)
    {
        ev.preventDefault();
        console.log('card clicked')
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
                            Board name
                        </InputLabel>
                        <Select
                            value={selectedBoard}
                            onChange={(e) => console.log("Board changed")}
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
                                            key={card.id}
                                        >
                                            <Card
                                                className={clsx(classes.card, "w-full mb-16 rounded-4 cursor-pointer border-1")}
                                                onClick={(ev) => handleCardClick(ev, card)}
                                            >
                                                <img className="block" src={card.info.backgroundImage} alt="card cover"/>

                                                <div className="p-16 pb-0">

                                                    {card.labels.length > 0 && (
                                                        <div className="flex flex-wrap mb-8">
                                                            {card.labels.map(id => {
                                                                const board = boardsInfo.find( board => board.id === card.boardId);
                                                                const label = _.find(board.labels, {id});
                                                                return (
                                                                    <Tooltip title={label.name} key={id}>
                                                                        <div className={clsx(label.class, "w-32  h-6 rounded-6 mr-6 mb-6")}/>
                                                                    </Tooltip>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    <Typography className="font-600 mb-12">{card.name}</Typography>

                                                    {(card.dueDate || card.checklist > 0) && (
                                                        <div className="flex items-center mb-12">
                                                            {card.dueDate && (
                                                                <div
                                                                    className={clsx("flex items-center px-8 py-4 mr-8 rounded-sm", moment() > moment(card.dueDate) ? "bg-red text-white" : "bg-green text-white")}>
                                                                    <Icon className="text-16 mr-4">access_time</Icon>
                                                                    <span>{moment(card.dueDate).format("MMM Do YY")}</span>
                                                                </div>
                                                            )}

                                                            {card.checklist > 0 && (
                                                                <div
                                                                    className={clsx("flex items-center px-8 py-4 mr-8 rounded-sm", card.checklist.find(item => item.checked).length === card.checklist.length ? "bg-green text-white" : "bg-grey-dark text-white")}
                                                                >
                                                                    <Icon className="text-16 mr-4">check_circle</Icon>
                                                                    <span>{card.checklist.find(item => item.checked).length}</span>
                                                                    <span>/</span>
                                                                    <span>{card.checklist.length}</span>
                                                                </div>
                                                            )}

                                                        </div>
                                                    )}

                                                    {card.members.length > 0 && (
                                                        <div className="flex flex-wrap mb-12">
                                                            {card.members.map(id => {
                                                                const board = boardsInfo.find( board => board.id === card.boardId);
                                                                const member = _.find(board.members, {id});
                                                                return (
                                                                    <Tooltip title={member.name} key={id}>
                                                                        <Avatar className="mr-8 w-32 h-32" src={member.avatar}/>
                                                                    </Tooltip>
                                                                )
                                                            })}
                                                            <div className="">
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="flex justify-between h-48 px-16 border-t-1">
                                                    <div className="flex items-center">
                                                        {card.subscribed && (
                                                            <Icon className="text-18 mr-12" color="action">remove_red_eye</Icon>
                                                        )}

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
                                                        {(
                                                            <span className="flex items-center ml-12">
                                                                    <Icon className="text-18 mr-8" color="action">comment</Icon>
                                                                    <Typography color="textSecondary">{card.comment.length}</Typography>
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
