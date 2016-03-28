
// xmlHttp = new XMLHttpRequest();
// xmlHttp.open( "GET", "https://data.cityofnewyork.us/api/views/itfs-ms3e/rows.json?accessType=DOWNLOAD", true );
// xmlHttp.send();
// var data = JSON.parse(xmlHttp.responseText);
// Index 9 holds school name, 10 holds how many students took AP tests, 11 holds the total number of exams taken, 12 holds number of exams with scores of 3,4,or 5
//     ex. data.data[1][11] will return the total number of exams taken at the second school in the dataset.
//     We are school index[25]. Total number of schools = 258
// console.log(data.data[0]);

var data; // a global

d3.json("https://data.cityofnewyork.us/api/views/itfs-ms3e/rows.json", function(error, json) {
    if (error) return console.warn(error);
    data = json;

    console.log(data.data[1]);
    // Create separate arrays for different values pulled from JSON file
    var schools = [];
    var students = [];
    var examsTaken = [];
    var passingExams = [];
    var w=0;
    for (var i = 0; i < 258; i++) {
	if (data.data[i][10]!=null && data.data[i][11]!=null && data.data[i][12]!=null){
	    schools[i+w] = data.data[i][9];
	    students[i+w] = parseFloat(data.data[i][10]);
	    examsTaken[i+w] = parseFloat(data.data[i][11]);
	    passingExams[i+w] = parseFloat(data.data[i][12]);
	}
	else
	    w--;
    }

    // Create dropdown menu to select school
    var select = d3.select('body')
	.append('select')
    	.attr('class','select')
	.on('change', updateData);

    var options = select
	.selectAll('option')
  	.data(schools).enter()
  	.append('option')
  	.text(function (d) { return d; });

    var schoolCircle = d3.select("body")
        .append("svg")
        .attr("width", "97%")
        .attr("height", 250)
        .attr('id', 'fillgauge1');

    var examCircle = d3.select("body")
        .append("svg")
        .attr("width", "97%")
        .attr("height", 250)
        .attr('id', 'fillgauge2');

    var scoreCircle = d3.select("body")
        .append("svg")
        .attr("width", "97%")
        .attr("height", 250)
        .attr('id', 'fillgauge3');

    function updateData() {
  	selectValue = d3.select('select').property('value');
	var index = schools.indexOf(selectValue);

	d3.selectAll('p')
	    .remove();
	d3.selectAll('svg')
	    .remove();

	d3.select('body')
  	    .append('p')
	    .attr('id', 'school')
  	    .text('School: ' + selectValue);

	var config1 = liquidFillGaugeDefaultSettings();
	config1.circleColor = "#FF7777";
	config1.textColor = "#FF4444";
	config1.waveTextColor = "#FFAAAA";
	config1.waveColor = "#FFDDDD";
	config1.circleThickness = 0.2;
	config1.textVertPosition = 0.2;
	config1.waveAnimateTime = 1000;
/*
	config.textVertPosition = 0.8;
	config.waveAnimateTime = 5000;
	config.waveHeight = 0.15;
	config.waveAnimate = false;
	config.waveOffset = 0.25;
	config.valueCountUp = false;
	config.displayPercent = false;
*/
	var gauge1 = loadLiquidFillGauge("fillgauge1", (passingExams[index]/examsTaken[index])*100, config1);
	//var gauge2 = loadLiquidFillGauge("fillgauge2", students[index], config);
	//var gauge3 = loadLiquidFillGauge("fillgauge3", examsTaken[index], config);
    };


});

//     var config = liquidFillGaugeDefaultSettings();
//     config.textVertPosition = 0.8;
//     config.waveAnimateTime = 5000;
//     config.waveHeight = 0.15;
//     config.waveAnimate = false;
//     config.waveOffset = 0.25;
//     config.valueCountUp = false;
//     config.displayPercent = false;
//     var gauge1 = loadLiquidFillGauge("fillgauge", 50, config);
//     var gauge1 = loadLiquidFillGauge("fillgauge", 50, config);
//     var gauge1 = loadLiquidFillGauge("fillgauge", 50, config);
