let option = {
    title: {
        text: "最近5日空气指数预测",
        left: 'center',
        textStyle: {
            fontSize: 18,
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            show: true,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '15',
                padding: [5, 0, 0, 0],
                color: '#131313'
            }
        }
    },
    tooltip: {
        show: true,
        trigger: 'axis'
    },
    yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
        lineStyle: {
            type: 'dashed'
        }
        },
        show: false
    },
    series: [{
        name: '空气指数',
        type: 'line',
        smooth: true,
        data: [],
        label: {
            fontSize: '14',
            show: true
        }
    }]
};

module.exports = {
    option
}