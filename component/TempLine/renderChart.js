export default function renderChart(xName, yName) {
    return `
    var xName = "${xName}";
    var yName = "${yName}";
    var option = {
        tooltip: {
        trigger: 'axis'
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
        yAxis: {
            name: yName,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };
    if (option && typeof option === "object") {
    myChart.setOption(option, true);
    }
    `
}