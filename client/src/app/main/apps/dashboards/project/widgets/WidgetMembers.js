import React, {useEffect, useState} from "react";
import {
    Avatar,
    Table,
    TableHead,
    TableCell,
    TableRow,
    Typography,
    Paper,
    TableBody,
} from "@material-ui/core";

const initialState = {
    title: "Team Members",
    table: {
        columns: [
            {
                id: "avatar",
                title: "Avatar",
            },
            {
                id: "name",
                title: "Name",
            },
            {
                id: "role",
                title: "Board role",
            },
            {
                id: "email",
                title: "Email",
            },
            {
                id: "gender",
                title: "Gender",
            },
            {
                id: "phone",
                title: "Phone",
            },
        ],
        rows: [],
    },
};
function WidgetMembers(props) {
    const {allUsers, data} = props;
    const [dataset, setDataset] = useState(initialState);
    const infoKey = ["fullname", "role", "email", "info"];
    const fullInfoOrdered = ["avatar", "fullname", "role", "email", "gender", "phoneNumber"];

    useEffect(() => {
        if (data) {
            let newDataset = JSON.parse(JSON.stringify(initialState)); // prevent shallow copy
            allUsers.forEach(user =>{
                data.forEach(member => {
                    if (user.id == member.userId) {
                        user.role = member.role;
                        const userInfo = [];
                        infoKey.forEach(key => {
                            if (key === 'info') {
                                Object.keys(user.info).forEach(key => {
                                    userInfo.push({
                                        id: key,
                                        value: user.info[key]
                                    })
                                })
                            } else {
                                userInfo.push({
                                    id: key,
                                    value: user[key]
                                })
                            }
                        })
                        const orderedUserInfo = [];
                        fullInfoOrdered.forEach(key => {
                            userInfo.forEach(item => {
                                if (key === item.id) {
                                    orderedUserInfo.push(item);
                                }
                            })
                        })
                        newDataset.table.rows.push({
                            id: user.id,
                            cells: orderedUserInfo,
                        })
                    }
                })
            })
            setDataset(newDataset);
        }
    },[data])
    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">
                    {dataset.title}
                </Typography>
                <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
                    {dataset.table.rows.length + " Members"}
                </Typography>
            </div>
            <div className="table-responsive">
                <Table className="w-full min-w-full" size="small">
                    <TableHead>
                        <TableRow>
                            {dataset.table.columns.map((column) => {
                                switch (column.id) {
                                    case "avatar": {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                className="whitespace-no-wrap p-8 pl-16"
                                            >
                                                {column.title}
                                            </TableCell>
                                        );
                                    }
                                    default: {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                className="whitespace-no-wrap"
                                            >
                                                {column.title}
                                            </TableCell>
                                        );
                                    }
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataset.table.rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.cells.map((cell) => {
                                    switch (cell.id) {
                                        case "avatar": {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    component="th"
                                                    scope="row"
                                                    className="pl-16 pr-0"
                                                >
                                                    <Avatar src={cell.value} />
                                                </TableCell>
                                            );
                                        }
                                        case "fullname": {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    component="th"
                                                    scope="row"
                                                    className="truncate font-600"
                                                >
                                                    {cell.value}
                                                </TableCell>
                                            );
                                        }
                                        default: {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    component="th"
                                                    scope="row"
                                                    className="truncate"
                                                >
                                                    {cell.value}
                                                </TableCell>
                                            );
                                        }
                                    }
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
}

export default React.memo(WidgetMembers);
