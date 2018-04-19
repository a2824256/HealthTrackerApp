export default function renderChart(xName, yName) {
    return `
    var xName = "${xName}";
    var yName = "${yName}";
    var option = {
        legend: {
        data:['x','y','z']
        },
        xAxis: {
            name: xName,
            type: 'category',
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10']
        },
        tooltip: {
        trigger: 'axis'
        },
        yAxis: {
            name: yName,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [
        {
            name: 'x',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            data: data1
        },
        {
            name: 'y',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            data: data2
        },
        {
            name: 'z',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            data: data3
        }]
    };
    if (option && typeof option === "object") {
    myChart.setOption(option, true);
    }
    `
}