import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Icon,
} from "@material-ui/core";
import history from "@history";
import { openCardDialog } from "app/main/apps/scrumboard/store/actions";

const initialState = {
    cards: [],
};
function WidgetInprocessing(props) {
    const dispatch = useDispatch();
    const {data, label} = props;
    const [dataset, setDataset] = useState(initialState);

    useEffect(() => {
        if (data) {
            const dataCards = data.sort((a,b) => new Date(a.due) - new Date(b.due)).map(item => ({...item, title: item.name, time: "Duedate: " + item.due}));
            setDataset({...dataset, cards: dataCards});
        }
    }, [data])

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
            dispatch(openCardDialog(card))
        }, 1000);

    }

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">
                    {label}
                </Typography>
            </div>
            <List>
                {dataset.cards.map((item) => (
                    <ListItem style={{cursor: "pointer"}} key={item.id} onClick={e => handleCardClick(e, item)}>
                        <ListItemText
                            primary={item.title}
                            secondary={item.time}
                        />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="more">
                                <Icon>more_vert</Icon>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default React.memo(WidgetInprocessing);
