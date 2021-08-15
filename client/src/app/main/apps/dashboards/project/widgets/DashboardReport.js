import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    Table,
    Avatar,
    Tooltip,
    IconButton,
} from "@material-ui/core";
import { FuseAnimate, FuseLoading } from "@fuse";
import clsx from "clsx";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import jsPDF from "jspdf";
import { CloudDownload } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    divider: {
        backgroundColor: theme.palette.divider,
    },
}));

const category = {
    "1doingCards": "ON GOING TASKS",
    "2overdueCards": "OVER-DATED TASKS",
    "3completeBeforeDueCards": "COMPLETED ON TIME TASKS",
    "4completeAfterDueCards": "COMPLETED LATE TASKS",
};

function DashboardReport(props) {
    let { data, user, projectName, allUsers } = props;
    const classes = useStyles();
    const [dataset, setDataset] = useState(null);
    const now = new Date();
    const reportTime = now.toLocaleTimeString();
    const [downloading, setDownloading] = useState(false);
    const reportDate = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).replace(/ /g, "-");

    useEffect(() => {
        if (data) {
            const selectedProp = ["1doingCards", "2overdueCards", "3completeBeforeDueCards", "4completeAfterDueCards"];
            const newDataset = {};
            let index = 1;
            selectedProp.forEach((category) => {
                Object.keys(data).forEach((key) => {
                    if (category === index + key) {
                        newDataset[index + key] = data[key];
                        index++;
                    }
                });
            });
            console.log("newDataset");
            console.log(newDataset);
            setDataset(newDataset);
        }
    }, [data]);

    const printReport = () => {
        setDownloading(true);
        const input = document.getElementById("reportDiv");
        const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        pdf.html(input, { html2canvas: { scale: 0.48 } }).then(() => {
            setDownloading(false);
            pdf.save(`${projectName.toUpperCase()} ${reportDate}.pdf`);
        });
    };

    return (
        <div className="text-center m-auto mt-24">
            {dataset && (
                <div>
                    {downloading && <FuseLoading/>}
                    <div className="absolute right-0 m-16">
                        <Tooltip title="Download Report" style={{ alignItems: 'right' }}>
                            <label htmlFor="icon-upload-file">
                                <IconButton color="secondary" component="span" onClick={printReport}>
                                    <CloudDownload fontSize="large" />
                                </IconButton>
                            </label>
                        </Tooltip>
                    </div>
                    <div id="reportDiv" style={{background: "white"}}>
                        <FuseAnimate duration={600}>
                            <Card
                                style={{ shadow: "1px 3px 25px black" }}
                                className="mx-auto w-xl print:w-full print:shadow-none"
                            >
                                <CardContent className="p-88 print:p-0">
                                    <div className="flex flex-row justify-between items-start">
                                        <div className="flex flex-col">
                                            <div className="flex items-center mb-80 print:mb-0">
                                                {/* <div className="flex justify-end items-center w-160 print:w-60">
                                                    <Avatar
                                                        className="w-160 h-160"
                                                        src="assets/images/logos/hypertask.png"
                                                    />
                                                </div> */}
                                                <img
                                                    className="w-160 print:w-60"
                                                    src="assets/images/logos/hypertask.png"
                                                    alt="logo"
                                                />

                                                <div
                                                    className={clsx(classes.divider, "mx-48 w-px h-128 print:mx-16")}
                                                />

                                                <div className="max-w-160">
                                                    <Typography color="textSecondary">Hyper Task</Typography>

                                                    <Typography color="textSecondary">
                                                        590 CTM8 street, ward 11, distric 3, HCMC
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        <span>Phone:</span>
                                                        +66 123 455 87
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        <span>Email:</span>
                                                        admin@hypertask.com
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        <span>Web:</span>
                                                        www.hypertask.com
                                                    </Typography>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                <div className="flex justify-end items-center w-160 print:w-60">
                                                    <Avatar
                                                        className="w-160 h-160"
                                                        src={
                                                            JSON.parse(user.info).avatar ||
                                                            "assets/images/avatars/default-avatar.png"
                                                        }
                                                    />
                                                </div>

                                                <div
                                                    className={clsx(classes.divider, "mx-48 w-px h-128 print:mx-16")}
                                                />

                                                <div className="max-w-200">
                                                    <Typography color="textSecondary">{user.fullname}</Typography>
                                                    <Typography color="textSecondary">
                                                        Address: {JSON.parse(user.info).address}
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        Phone: {JSON.parse(user.info).phoneNumber}
                                                    </Typography>
                                                    <Typography color="textSecondary">Email: {user.email}</Typography>
                                                </div>
                                            </div>
                                        </div>

                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2} className="text-right pb-12">
                                                        <Typography
                                                            className="font-light"
                                                            variant="h5"
                                                            color="textSecondary"
                                                        >
                                                            {projectName.toUpperCase()}
                                                        </Typography>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="text-right pr-16">
                                                        <Typography color="textSecondary">REPORT TIME</Typography>
                                                    </td>
                                                    <td>
                                                        <Typography>{reportTime}</Typography>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="text-right pr-16">
                                                        <Typography color="textSecondary">REPORT DATE</Typography>
                                                    </td>
                                                    <td>
                                                        <Typography>
                                                            {reportDate}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {Object.keys(dataset).map((key) => (
                                        <div key={key} className="mt-96 print:mt-0">
                                            <Table className="simple">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>{category[key]}</TableCell>
                                                        <TableCell>ASSIGNEE(S)</TableCell>
                                                        <TableCell align="right">DUE DATE</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {dataset[key].map((task) => (
                                                        <TableRow key={task.id}>
                                                            <TableCell>
                                                                <Typography className="mb-8" variant="subtitle1">
                                                                    {task.name}
                                                                </Typography>
                                                                <Typography variant="caption" color="textSecondary">
                                                                    {task.content}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                {allUsers
                                                                    .filter((user) => task.members.includes(user.id))
                                                                    .map((user) => (
                                                                        <Typography
                                                                            key={user.id}
                                                                            className="mb-8"
                                                                            variant="subtitle1"
                                                                        >
                                                                            {user.fullname}
                                                                        </Typography>
                                                                    ))}
                                                            </TableCell>
                                                            <TableCell align="right">{task.due}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                            <Table className="simple">
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography
                                                                className="font-medium"
                                                                variant="h6"
                                                                color="textSecondary"
                                                            >
                                                                TOTAL
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography
                                                                className="font-medium"
                                                                variant="h6"
                                                                color="textSecondary"
                                                            >
                                                                {dataset[key].length} Task(s)
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ))}

                                    <div className="mt-96 print:mt-0 print:px-16">
                                        <Typography className="mb-24 print:mb-12" variant="body1">
                                            Thank you for chosing us!
                                        </Typography>

                                        <div className="flex ml-36">
                                            <div className="flex-shrink-0 mr-6">
                                                <img
                                                    className="w-32"
                                                    src="assets/images/logos/hypertask.png"
                                                    alt="logo"
                                                />
                                            </div>

                                            <Typography
                                                className="font-medium mb-64 max-w-md"
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                We believe in teams. Yours and ours. Our mission, culture, and
                                                commitment to fostering a diverse, inclusive workplace let us build a
                                                product people love and stay true to ourselves.
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardReport;

/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 **/
