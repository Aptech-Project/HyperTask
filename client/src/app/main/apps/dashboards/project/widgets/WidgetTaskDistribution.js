import React, {useState, useEffect} from 'react';
import {Typography, Select, Paper} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2';
import _ from 'lodash';

const initialState = {
    title: "Task By Labels",
    mainChart: {
        labels: ["Frontend", "Backend", "API", "Issues"],
        datasets: [{
                    data: [15, 20, 38, 27],
                    backgroundColor: [
                        "#f44336",
                        "#9c27b0",
                        "#03a9f4",
                        "#e91e63",
                    ],
                    hoverBackgroundColor: [
                        "#f45a4d",
                        "#a041b0",
                        "#25b6f4",
                        "#e9487f",
                    ],
                }],
        options: {
            cutoutPercentage: 66,
            spanGaps: false,
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    padding: 16,
                    usePointStyle: true,
                },
            },
            maintainAspectRatio: false,
        },
    },
    footerLeft: {
        title: "Total Tasks",
        count: 0,
    },
    footerRight: {
        title: "Has Labels",
        count: 0,
    },
};

function WidgetTaskDistribution(props) {
    const {data, allCards} = props;
    const widget = _.merge({}, props.widget);
    const [dataSet, setDataSet] = useState(initialState);

    useEffect(() =>{
        if (data && allCards) {
            const newDataSet = {...initialState};
            newDataSet.mainChart.labels = Object.keys(data);
            const dataLabelsArray = Object.keys(data).map(labels => data[labels].length);
            newDataSet.mainChart.datasets[0].data = dataLabelsArray;
            newDataSet.footerRight.count = allCards.filter(card => card.labels.length).length;
            newDataSet.footerLeft.count = allCards.length;
            console.log(newDataSet);
            setDataSet(newDataSet);
        }
    },[data])

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">{dataSet.title}</Typography>
            </div>
            <div className="h-400 w-full p-32">
                <Doughnut
                    data={{
                        labels  : dataSet.mainChart.labels,
                        datasets: dataSet.mainChart.datasets
                    }}
                    options={dataSet.mainChart.options}
                />
            </div>
            <div className="flex items-center p-8 border-t-1">
                <div className="flex flex-1 flex-col items-center justify-center p-16 border-r-1">
                    <Typography className="text-32 leading-none">
                        {dataSet.footerLeft.count}
                    </Typography>
                    <Typography className="text-15" color="textSecondary">
                        {dataSet.footerLeft.title}
                    </Typography>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center p-16">
                    <Typography className="text-32 leading-none">
                        {dataSet.footerRight.count}
                    </Typography>
                    <Typography className="text-15" color="textSecondary">
                        {dataSet.footerRight.title}
                    </Typography>
                </div>
            </div>
        </Paper>
    );
}

export default React.memo(WidgetTaskDistribution);
