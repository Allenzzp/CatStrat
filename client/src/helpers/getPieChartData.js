import { format, parseISO } from 'date-fns';
// var parseISO = require('date-fns/parseISO');

export default function getPieChartData(data) {
    const pieData = [];
    const pieLabels = [];

    let formattedData = data.reduce((acc, curr) => {
        if (acc[curr.strategy_name]) {
            acc[curr.strategy_name] += 1;
        } else {
            acc[curr.strategy_name] = 1;
        }
        return acc;
    }, {})

    const arrData = Object.entries(formattedData);

    arrData.forEach(([strat, count]) => {
        pieLabels.push(strat);
        pieData.push(count);
    });
    // console.log('pieLabels', pieLabels)
    // console.log('pieData', pieData)

    const availableColors = ["#63ace5", "#FBEAEB", "#fdf498", "#fe9c8f", "#009688", "#b20238", "#fbcbc9", "#6b7b8c", "#ff6e40", "F6EAD4", "A4A595", "B50472", "79CBB8", "16ACEA", "4203C9", "B99523", "1978A5", "141414"]
    const colors =[];
    for (let i = 0; i < pieLabels.length; i++) {
        colors.push(availableColors[i])
    }

    return { pieData, pieLabels, colors };
}


