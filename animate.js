
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

    function updateData() {
  	selectValue = d3.select('select').property('value');
	var index = schools.indexOf(selectValue);

	d3.selectAll('div')
	    .remove();
	d3.select("body")
	    .append("div");
	d3.select('body')
	    .select("div")
  	    .append('h2')
	    .attr('id', 'school')
  	    .text('School: ' + selectValue);
	d3.select("body")
	    .select("div")
	    .append("svg")
	    .attr("id","fillgauge1")
	    .attr("width","97%")
	    .attr("height","500");
	d3.select("body")
	    .select("div")
	    .append("h2")
	    .text("Total AP tests taken: "+examsTaken[index]);

	var pass=(passingExams[index]/examsTaken[index])*100;
	var config1 = liquidFillGaugeDefaultSettings();
	config1.textVertPosition = .5;
	if (pass<=40){
	    config1.circleColor = "#FF7777";
	    config1.textColor = "#FF4444";
	    config1.waveTextColor = "#FFAAAA";
	    config1.waveColor = "#FFDDDD";
	    config1.circleThickness = 0.2;
	    config1.waveAnimateTime = 2400;
	    config1.waveHeight = .4;
	    config1.waveCount = 1;
	}
	else if (pass<75 && pass>40){
	    config1.circleColor = "#ffff7f";
	    config1.textColor = "#FF8000";
	    config1.waveTextColor = "#FFB266";
	    config1.waveColor = "#ffff7f";
	    config1.circleThickness = 0.2;
	    config1.waveAnimateTime = 3000;
	    config1.waveHeight = 0.3;
	    config1.waveCount = .5;
	}
	//Good test scores
	else if (pass>=75){
	    config1.circleColor = "#6ABD45";
	    config1.textColor = "#2D8BC9";
	    config1.waveTextColor = "#2D8BC9";
	    config1.waveColor = "#6ABD45";
	    config1.circleThickness = 0.2;
	    config1.waveAnimateTime = 2000;
	    config1.waveHeight = 0.3;
	    config1.waveCount = 1;
	}
	var gauge1 = loadLiquidFillGauge("fillgauge1",pass, config1);
    };


});
