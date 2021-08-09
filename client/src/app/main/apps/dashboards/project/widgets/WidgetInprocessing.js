import React, { useState, useEffect } from "react";
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

const initialState = {
    title: "Inprocessing tasks",
    cards: [],
};
function WidgetInprocessing(props) {
    const {data} = props;
    const [dataset, setDataset] = useState(initialState);

    useEffect(() => {
        if (data) {
            const dataCards = data.sort((a,b) => new Date(a.due) - new Date(b.due)).map(item => ({id: item.id, title: item.name, time: "Duedate: " + item.due}));
            setDataset({...dataset, cards: dataCards});
        }
    }, [data])

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">
                    {dataset.title}
                </Typography>
            </div>
            <List>
                {dataset.cards.map((item) => (
                    <ListItem key={item.id}>
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
