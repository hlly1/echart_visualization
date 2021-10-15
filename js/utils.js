/**
* This file is used for preprocess data from json file
* It contains help functions such as translating abbreviation
* to full name, simulating JOIN or UNION operations of database
* by for looping etc.
**/
function loadDataByAttribute(column, year){
    let dataDict = {};
    for (let index = 0; index < table.length; index++) {
        var d = new Date(Date.parse(table[index]["date"]));
        let y = d.getFullYear();
        if (!dataDict.hasOwnProperty(table[index][column])) {
            if (y == year) {
                if(table[index][column] == ""){
                    dataDict["No Data"] = 1;
                }else{
                    dataDict[table[index][column]] = 1;
                }   
            }
        }else{
            if (y == year) {
                dataDict[table[index][column]] += 1;
            }
        }
    }
    return dataDict;
}

function getDataList(column, year){
    year = year || "2021";
    let data = loadDataByAttribute(column, year);
    let result = [[], []];
    for (let key in data) {
        result[0].push(key);
        result[1].push(data[key]);
    }
    return result;
}

//for barchart specially, due to time limtation, some hardcode at algorithm
//Data must be sorted by Date, otherwise this one is not working
function loadDataByMonth(year, column){
    let tempDict = {};
    let result = [[],[],[],[]];
    let body_cam = {};
    let body_cam_not = {};

    for (let i = 0; i < table.length; i++) {
        var d = new Date(Date.parse(table[i]["date"]));  
        let m = ["Jan", 'Feb','Mar','Apr','May','Jun','Jul',"Aug",'Sep','Oct','Nov','Dec'][d.getMonth()];
        let y = d.getFullYear();
        if (!tempDict.hasOwnProperty(m)) {
            if(y == year){
                tempDict[m] = 1;
            }
            
        }else{
            if (y == year) {
                tempDict[m] += 1;
            }
        }

        if(table[i][column] == "True"){
            if (y==year) {
                if (!body_cam.hasOwnProperty(m)) {
                    body_cam[m] = 1;
                }else{
                    body_cam[m] += 1;
                }
            }
        }else{
            if (y==year) {
                if (!body_cam_not.hasOwnProperty(m)) {
                    body_cam_not[m] = 1;
                }else{
                    body_cam_not[m] += 1;
                }    
            }
        }
    }

    for (let key in tempDict) {
        result[0].push(key);
        result[1].push(tempDict[key]);
        result[2].push(body_cam[key]);
        result[3].push(body_cam_not[key]);
    }

    return result;
}

//by threat level per year
function threatLevel() { 
    let cate = getDataList("threat_level")[0];

    let result = [[],[]];
    for (let i = 0; i < cate.length; i++) {
        let this_year = [0,0,0,0,0,0,0];
        for (let j = 0; j < table.length; j++) {
            var d = new Date(Date.parse(table[j]["date"]));
            let y = d.getFullYear();
            if (table[j]["threat_level"] == cate[i]) {
                this_year[y-2015] += 1;
            }
        }

        result[0].push(cate[i]);
        result[1].push(this_year);
    }
    return result;
}

function getCalendarlData(year, gender) {

    let dictDate = {};
    for (let index = 0; index < table.length; index++) {
        if (!dictDate.hasOwnProperty(table[index]["date"])) {
            if (table[index]["gender"] === gender) {
                dictDate[table[index]["date"]] = 1;
            }         
        }else{
            if (table[index]["gender"] === gender) {
                dictDate[table[index]["date"]] += 1;
            }
        }
    }

    year = year || '2021';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate((+year + 1) + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var result = [];

    for (var time = date; time < end; time += dayTime) {
        if (dictDate[echarts.format.formatTime('yyyy-MM-dd', time)]) {
            result.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                dictDate[echarts.format.formatTime('yyyy-MM-dd', time)]
            ]);
        }else{
            result.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                0
            ]);
        }
    }
    return result;
}

//help functions
function raceLabel(race){
    for (let i = 0; i < race[0].length; i++) {
        if(race[0][i] == "A"){
            race[0][i] = "Asian";
        }
        if(race[0][i] == "W"){
            race[0][i] = "White";
        }
        if(race[0][i] == "H"){
            race[0][i] = "Hispanic";
        }
        if(race[0][i] == "B"){
            race[0][i] = "Black";
        }
        if(race[0][i] == "O"){
            race[0][i] = "Other";
        }
        if(race[0][i] == "N"){
            race[0][i] = "Native";
        }
    }
    return race;
}

function pieDataFormat(arr) {
    let result = [];
    for (let i = 0; i < arr[0].length; i++) {
        let temp = {};
        temp["value"] = arr[1][i];
        temp["name"] = arr[0][i];
        result.push(temp);
    }

    return result;
}

function stateName(arrb){
    /*  USA State Names and Abbreviations Data Files
    *  URL: https://worldpopulationreview.com/static/states/abbr-name.json
    */
    let states = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
      }

    return states[arrb];
}

function reloadCalendarChart() {
    let y = document.getElementById("select-year").value;
    let gender = document.getElementById("gender-control").innerHTML;
    if (y != "None") {
        calendarChart(y, gender[0]);
        barChart(y);
        pieChart(y);
        map(y);
        treeChart(y);
        barChart3(y);
        pieChart2(y);
        document.getElementById("this_year").innerHTML = y;
        document.getElementById("this_year1").innerHTML = y;
        document.getElementById("this_year2").innerHTML = y;
        document.getElementById("this_year3").innerHTML = y;
        document.getElementById("this_year4").innerHTML = y;
        document.getElementById("this_year5").innerHTML = y;
        document.getElementById("this_year6").innerHTML = y;
    }else{
        calendarChart("2021", gender[0]);
        barChart("2021");
        pieChart("2021");
        map("2021");
        treeChart("2021");
        barChart3("2021");
        pieChart2("2021");
        document.getElementById("this_year").innerHTML = "2021";
        document.getElementById("this_year1").innerHTML = "2021";
        document.getElementById("this_year2").innerHTML = "2021";
        document.getElementById("this_year3").innerHTML = "2021";
        document.getElementById("this_year4").innerHTML = "2021";
        document.getElementById("this_year6").innerHTML = "2021";
    }
}

function gender_switch(){
    let gender = document.getElementById("gender-control").innerHTML;
    let year = document.getElementById("this_year").innerHTML;
    if (gender == "Male") {
        document.getElementById("gender-control").innerHTML = "Female";
        document.getElementById("gender-control").style['background-color'] = "#d33636";
        document.getElementById("gender_show").innerHTML = " (for Female)";
        calendarChart(year, "F");
    }else if (gender == "Female") {
        document.getElementById("gender-control").innerHTML = "Male";
        document.getElementById("gender-control").style['background-color'] = "#4269a6";
        document.getElementById("gender_show").innerHTML = " (for Male)";
        calendarChart(year, "M");
    }
}
