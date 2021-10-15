
/**
 * This js file is mainly used for drawing charts only
 * Structure code are learned from Echart API document
 * URL: https://echarts.apache.org/examples/en/index.html
 * Styling and labeling of the chart are customized according
 * to the Echart API document.
 **/
window.onload = function(){
    barChart("2021");
    pieChart("2021");
    map("2021");
    treeChart("2021");
    barChart2();
    calendarChart("2021", "M");
    barChart3("2021");
    pieChart2("2021");
}

//by date with total amount, police taking camera or not
function barChart(year){
    let result = loadDataByMonth(year, "body_camera");
    let barDom = document.getElementById("bar-chart");
    let barChart = echarts.init(barDom);
    let option = {
        color: ["#E9AD00","green", 'red'],
        tooltip: {
            position:'top',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            feature:{
                mark: {show: true},
                saveAsImage: {show: true}
            }
        },
        grid: {
            left: '0%',
            top: '25px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: result[0],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel:{
                    color: "#ffffff",
                    fontSize: "10px"
                },
                axisLine:{
                    show: false
                }
            }
        ],
        legend:[
            {
                show: true,
                top: "-5px",
                right: "0%",
                textStyle:{
                    color: "#ffffff"
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel:{
                    color: "#ffffff",
                    fontSize: "10px"
                },
                position:'left',
                splitLine:{
                    lineStyle:{
                        color: "#6c757d6b"
                    }
                }
            }
        ],
        series: [
            {
                name: 'Fatal Shootings Amounts',
                type: 'bar',
                barWidth: '30%',
                data: result[1],
                itemStyle:{
                    barBorderRadius: 5
                },
                yAxisIndex: 0
            },
            {
                name: 'Police Takeing Camera',
                type: 'line',
                data: result[2],
                yAxisIndex: 0
            },
            {
                name: 'Police Not Takeing Camera',
                type: 'line',
                data: result[3],
                yAxisIndex: 0
            }
        ]

    };
    option && barChart.setOption(option);
    window.addEventListener("resize", function(){barChart.resize();})
}

//by the way to flee or no flee
function pieChart(year){

    let flee = getDataList("flee", year);
    //extend values to full name
    flee1 = pieDataFormat(flee);

    var divDom = document.getElementById('pie-chart');
    var pieChart = echarts.init(divDom);
    var option;

    option = {
        legend: {
            left: 'center',
            top: 'bottom',
            textStyle:{
                color: "#ffffff"
            },
           data: flee[0]
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            feature:{
                mark: {show: true},
                saveAsImage: {show: true}
            }
        },
        avoidLabelOverlap: true,
        series: [
            {
                name: 'The Way Victim Escaping',
                type: 'pie',
                radius: [30, 70],
                center: ['50%', '40%'],
                label: {
                    textStyle: {
                        color:"#fff"
                    }
                },
                data: flee1
            }
        ]
    };
    
    option && pieChart.setOption(option);
    window.addEventListener("resize", function(){pieChart.resize();})
}

//by State
function map(year) {

    let states = getDataList("state", year);
    // console.log(states);
    let mapData = [];
    for (let i = 0; i < states[0].length; i++) {
        let tempDict = {}
        tempDict["name"] = stateName(states[0][i]);
        tempDict["value"] = states[1][i];
        mapData.push(tempDict);
    }

    var mapDom = document.getElementById('map-chart');
    var mapChart = echarts.init(mapDom);
    var option;
    mapChart.showLoading();
    //-----------------------------------------------------------------------
    //Show Map of USA, this code is from Echart API document
    //URL: https://echarts.apache.org/examples/zh/editor.html?c=map-usa
    var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
    $.get(ROOT_PATH + '/data/asset/geo/USA.json', function (usaJson) {
        mapChart.hideLoading();
        echarts.registerMap('USA', usaJson, {
            Alaska: {
                left: -131,
                top: 25,
                width: 15
            },
            Hawaii: {
                left: -110,
                top: 28,
                width: 5
            },
            'Puerto Rico': {
                left: -76,
                top: 26,
                width: 2
            }
        });
    //--------------------------------------------------------------------

        option = {
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: function (params) {
                    return "Fatal Shootings in "+params.name + '<br/>Victims: ' + params.value;
                }
            },
            visualMap: {
                left: 'right',
                min: 0,
                max: 200,
                text: ['High', 'Low'],
                calculable: true,
                textStyle: {
                    color: "#ffffff"
                },
                orient: 'vertical'
            },
            series: [
                {
                    name: 'Fatal Shootings by Officers',
                    type: 'map',
                    roam: true,
                    map: 'USA',
                    data: mapData
                }
            ],
        };
    
        mapChart.setOption(option);
    });
    option && mapChart.setOption(option);
    window.addEventListener("resize", function(){mapChart.resize();})
}

//by Armed
function treeChart(year) {
    let armed = getDataList("armed", year);
    let armed_data = [];
    for (let i = 0; i < armed[0].length; i++) {
        let tempDict = {};
        tempDict["name"] = armed[0][i];
        tempDict["value"] = armed[1][i];
        armed_data.push(tempDict);
    }

    var treeDom = document.getElementById('tree-chart');
    var treeChart = echarts.init(treeDom);
    var option;

    option = {
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                return "Victims Armed Ways<br/>"+"By "+params.name + ': ' + params.value;
            }
        },
        series: [{
            type: 'treemap',
            data: armed_data
        }]
    };

    option && treeChart.setOption(option);
    window.addEventListener("resize", function(){treeChart.resize();})
}

//by threat_level per year
function barChart2(){
    var areaStackDom = document.getElementById('barChart2');
    var barChart2 = echarts.init(areaStackDom);
    var option;

    let threat_lv = threatLevel();

    // console.log(threat_lv);
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: getDataList("threat_level")[0]
        },
        grid: {
            left: '0%',
            top: '25px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        }, 
        legend:[
            {
                show: true,
                top: "-5px",
                right: "0%",
                textStyle:{
                    color: "#ffffff"
                }
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: [0, 0.01],
                data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
                axisLabel:{
                    color: "#ffffff",
                    fontSize: "10px"
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel:{
                    color: "#ffffff",
                    fontSize: "10px"
                },
                position:'left',
                splitLine:{
                    lineStyle:{
                        color: "#6c757d6b"
                    }
                }
            }
        ],
        series: [
            {
                name: threat_lv[0][0],
                data: threat_lv[1][0],
                type: 'bar',
                barGap:0,
                itemStyle:{
                    barBorderRadius: 5
                },
            },
            {
                name: threat_lv[0][1],
                data: threat_lv[1][1],
                type: 'bar',
                barGap:0,
                itemStyle:{
                    barBorderRadius: 5
                },
            },
            {
                name: threat_lv[0][2],
                data: threat_lv[1][2],
                type: 'bar',
                barGap:0,
                itemStyle:{
                    barBorderRadius: 5
                },
            },
        ]
    };
    
    option && barChart2.setOption(option);
    window.addEventListener("resize", function(){barChart2.resize();})
}

//by gender and per day in a year with week labels
function calendarChart(year, gender){

    var calendarDom = document.getElementById('calendar-chart');
    var calendarChart = echarts.init(calendarDom);
    var option;
    option = {
        tooltip: {
            position: 'top',
            formatter: function (params) {                
                return params.data[0] + ': ' + params.data[1] + ' victims';
            }
        },
        visualMap: {
            type:"piecewise",
            min: 0,
            max: 15,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            top: 10,
            textStyle:{
                color: "#ffffff"
            }
        },
    
        calendar: [
        {
            cellSize: ['auto', 20],
            orient: 'horizontal',
            range: year,
            yearLabel:{
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#000',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                color: '#323c48',
                borderWidth: 1,
                borderColor: '#111'
            },
            dayLabel:{
                color:"#fff",
                nameMap: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fir', 'Sat']
            },
            monthLabel:{
                color:"#fff"
            }
        }],
        series: [{
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: getCalendarlData(year, gender),
            symbolSize: function (val) {
                return val[1] * 2;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
            },
            zlevel: 1,
        }]
    };
    
    option && calendarChart.setOption(option);
    window.addEventListener("resize", function(){calendarChart.resize();})
}

//by mental illness per month in a year
function barChart3(year) {

    let mental = loadDataByMonth(year, "signs_of_mental_illness");
    var mentalDom = document.getElementById('barChart3');
    var barChart3 = echarts.init(mentalDom);
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['No Signs', 'Has Signs'],
            textStyle:{
                color: "#ffffff"
            }
        },
        grid: {
            left: '0%',
            top: '25px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        }, 
        xAxis: {
            type: 'value',
            axisLabel:{
                color: "#ffffff",
                fontSize: "10px"
            },
            axisLine:{
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: mental[0],
            axisLabel:{
                color: "#ffffff",
                fontSize: "10px"
            },
            position:'left',
            splitLine:{
                lineStyle:{
                    color: "#6c757d6b"
                }
            }
        },
        series: [
            {
                name: 'No Signs of Mental Illness',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: mental[3],
                itemStyle:{
                    barBorderRadius: 5
                },
            },
            {
                name: 'Has Signs of Mental Illness',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: mental[2],
                itemStyle:{
                    barBorderRadius: 3
                }
            }
        ]
    };

    option && barChart3.setOption(option);
    window.addEventListener("resize", function(){barChart3.resize();})
}

//by race per year
function pieChart2(year){

    let raceData = pieDataFormat(raceLabel(getDataList("race",year)));
    var raceDom = document.getElementById('pie-chart2');
    var pieChart2 = echarts.init(raceDom);
    var option;
    
    option = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: ['20', '60'],
                height: '100%',
                roseType: 'radius',
                avoidLabelOverlap: true,
                label: {
                    alignTo: 'edge',
                    formatter: '{race|{b}}\n{sum|{c} victims}',
                    minMargin: 5,
                    edgeDistance: 10,
                    lineHeight: 15,
                    rich: {
                        sum: {
                            fontSize: 10,
                            color: '#E9AD00'
                        }
                    },
                    textStyle: {
                        color:"#fff"
                    }
                },
                itemStyle: {
                    borderRadius: 8
                },
                data: raceData
                
            }
        ]
    };
    
    option && pieChart2.setOption(option);
    window.addEventListener("resize", function(){pieChart2.resize();})


}