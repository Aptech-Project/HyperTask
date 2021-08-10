import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, useTheme, ThemeProvider } from "@material-ui/styles";
import { FuseAnimate } from "@fuse";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import _ from "@lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        background:
            "linear-gradient(to right, " +
            theme.palette.primary.dark +
            " 0%, " +
            theme.palette.primary.main +
            " 100%)",
    },
}));

const initialState = {
    chartType: "line",
    datasets: {},
    labels: {},
    options: {
        spanGaps: false,
        legend: {
            display: false,
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 32,
                left: 32,
                right: 32,
            },
        },
        elements: {
            point: {
                radius: 4,
                borderWidth: 2,
                hoverRadius: 4,
                hoverBorderWidth: 2,
            },
            line: {
                tension: 0,
            },
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        tickMarkLength: 18,
                    },
                    ticks: {
                        fontColor: "#ffffff",
                    },
                },
            ],
            yAxes: [
                {
                    display: false,
                    ticks: {
                        min: 0,
                        max: 10,
                        stepSize: 1,
                    },
                },
            ],
        },
        plugins: {
            filler: {
                propagate: false,
            },
            xLabelsOnTop: {
                active: true,
            },
        },
    },
};

function WidgetActivity(props) {
    const mainThemeDark = useSelector(
        ({ fuse }) => fuse.settings.mainThemeDark
    );
    const { activities } = props;
    const classes = useStyles(props);
    const theme = useTheme();
    const [allDataset, setAllDataset] = useState(initialState);
    console.log("allDataset");
    console.log(allDataset);
    const [dataset, setDataset] = useState("Day");
    const [loading, setLoading] = useState(true);

    const data = _.merge({}, props.data);

    useEffect(() => {
        const newAllDataset = JSON.parse(JSON.stringify(initialState));
        const datasets = {};
        const labels = {};
        Object.keys(activities).forEach((datasetKey) => {
            datasets[datasetKey] = [];
            labels[datasetKey] = [];
            const datasetContent = {
                label: "Activity",
                data: [],
                fill: "start",
            };
            Object.keys(activities[datasetKey]).forEach((item) => {
                labels[datasetKey].push(item);
                datasetContent.data.push(activities[datasetKey][item].length);
            });
            datasets[datasetKey].push(datasetContent);
        });
        newAllDataset.datasets = datasets;
        newAllDataset.labels = labels;
        const tickOption = findTheTickOption(newAllDataset, dataset);
        newAllDataset.options.scales.yAxes[0].ticks = tickOption;
        console.log(newAllDataset);
        setAllDataset(newAllDataset);
        setLoading(false);
    }, [activities]);

    const setTickOption = (key) => {
        const newAllDataset = JSON.parse(JSON.stringify(allDataset));
        const tickOption = findTheTickOption(newAllDataset, key);
        newAllDataset.options.scales.yAxes[0].ticks = tickOption;
        setAllDataset(newAllDataset);
    };

    const findTheTickOption = (dataset, key) => {
        const maxValueOfDataset = Math.max(
            ...dataset.datasets[key][0].data
        );
        const step = Math.floor(maxValueOfDataset / 10);
        return {
            min: 0,
            max: maxValueOfDataset * 1.5,
            stepSize: step,
        };
    }

    return !loading ? (
        <ThemeProvider theme={mainThemeDark}>
            <div className={classes.root}>
                <div className="container relative p-16 sm:p-24 flex flex-row justify-between items-center">
                    <FuseAnimate delay={100}>
                        <div className="flex-col">
                            <Typography className="h2" color="textPrimary">
                                Board Activities
                            </Typography>
                            <Typography className="h5" color="textSecondary">
                                Board Activities by {dataset}
                            </Typography>
                        </div>
                    </FuseAnimate>

                    <div className="flex flex-row items-center">
                        {Object.keys(allDataset.datasets).map((key) => (
                            <Button
                                key={key}
                                className="py-8 px-12"
                                size="small"
                                onClick={() => {
                                    setDataset(key);
                                    setTickOption(key);
                                }}
                                disabled={key === dataset}
                            >
                                {key}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="container relative h-200 sm:h-256 pb-16">
                    <Line
                        data={{
                            labels: allDataset.labels[dataset],
                            datasets: allDataset.datasets[dataset].map(
                                (obj) => ({
                                    ...obj,
                                    data: obj.data.filter(
                                        (item) => typeof item !== "object"
                                    ),
                                    borderColor: theme.palette.secondary.main,
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                    pointBackgroundColor:
                                        theme.palette.secondary.dark,
                                    pointHoverBackgroundColor:
                                        theme.palette.secondary.main,
                                    pointBorderColor:
                                        theme.palette.secondary.contrastText,
                                    pointHoverBorderColor:
                                        theme.palette.secondary.contrastText,
                                })
                            ),
                        }}
                        options={allDataset.options}
                    />
                </div>
            </div>
        </ThemeProvider>
    ) : null;
}

export default React.memo(WidgetActivity);
