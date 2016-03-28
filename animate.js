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
  for (var i = 0; i < 258; i++) {
    schools[i] = data.data[i][9];
    students[i] = data.data[i][10];
    examsTaken[i] = data.data[i][11];
    passingExams[i] = data.data[i][12];
  }

  // Create dropdown menu to select school
  var select = d3.select('body')
    .append('select')
    	.attr('class','select')
      .on('change',updateData)
      .on('load',updateData)

  var options = select
    .selectAll('option')
  	.data(schools).enter()
  	.append('option')
  		.text(function (d) { return d; });

  function updateData() {
  	selectValue = d3.select('select').property('value')
  	d3.select('body')
  		.append('p')
  		.text('School: ' + selectValue)
  };
});

// var gauge1 = loadLiquidFillGauge("fillgauge1", 55);
//     var config1 = liquidFillGaugeDefaultSettings();
//     config1.circleColor = "#FF7777";
//     config1.textColor = "#FF4444";
//     config1.waveTextColor = "#FFAAAA";
//     config1.waveColor = "#FFDDDD";
//     config1.circleThickness = 0.2;
//     config1.textVertPosition = 0.2;
//     config1.waveAnimateTime = 1000;
//     var gauge2= loadLiquidFillGauge("fillgauge2", 28, config1);
//     var config2 = liquidFillGaugeDefaultSettings();
//     config2.circleColor = "#D4AB6A";
//     config2.textColor = "#553300";
//     config2.waveTextColor = "#805615";
//     config2.waveColor = "#AA7D39";
//     config2.circleThickness = 0.1;
//     config2.circleFillGap = 0.2;
//     config2.textVertPosition = 0.8;
//     config2.waveAnimateTime = 2000;
//     config2.waveHeight = 0.3;
//     config2.waveCount = 1;
//     var gauge3 = loadLiquidFillGauge("fillgauge3", 60.1, config2);
//     var config3 = liquidFillGaugeDefaultSettings();
//     config3.textVertPosition = 0.8;
//     config3.waveAnimateTime = 5000;
//     config3.waveHeight = 0.15;
//     config3.waveAnimate = false;
//     config3.waveOffset = 0.25;
//     config3.valueCountUp = false;
//     config3.displayPercent = false;
//     var gauge4 = loadLiquidFillGauge("fillgauge4", 50, config3);
//     var config4 = liquidFillGaugeDefaultSettings();
//     config4.circleThickness = 0.15;
//     config4.circleColor = "#808015";
//     config4.textColor = "#555500";
//     config4.waveTextColor = "#FFFFAA";
//     config4.waveColor = "#AAAA39";
//     config4.textVertPosition = 0.8;
//     config4.waveAnimateTime = 1000;
//     config4.waveHeight = 0.05;
//     config4.waveAnimate = true;
//     config4.waveRise = false;
//     config4.waveHeightScaling = false;
//     config4.waveOffset = 0.25;
//     config4.textSize = 0.75;
//     config4.waveCount = 3;
//     var gauge5 = loadLiquidFillGauge("fillgauge5", 60.44, config4);
//     var config5 = liquidFillGaugeDefaultSettings();
//     config5.circleThickness = 0.4;
//     config5.circleColor = "#6DA398";
//     config5.textColor = "#0E5144";
//     config5.waveTextColor = "#6DA398";
//     config5.waveColor = "#246D5F";
//     config5.textVertPosition = 0.52;
//     config5.waveAnimateTime = 5000;
//     config5.waveHeight = 0;
//     config5.waveAnimate = false;
//     config5.waveCount = 2;
//     config5.waveOffset = 0.25;
//     config5.textSize = 1.2;
//     config5.minValue = 30;
//     config5.maxValue = 150
//     config5.displayPercent = false;
//     var gauge6 = loadLiquidFillGauge("fillgauge6", 120, config5);
//
//     function NewValue(){
//         if(Math.random() > .5){
//             return Math.round(Math.random()*100);
//         } else {
//             return (Math.random()*100).toFixed(1);
//         }
//     }
