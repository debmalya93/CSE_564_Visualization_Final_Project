
document.getElementById("selectedPollutant").innerHTML = 'SO2';
document.getElementById("selectedYear").innerHTML = 2016;
document.getElementById("selectedStates").innerHTML = "California";

document.getElementById("mapview_text").innerHTML = "SO2 concentration in 2016";
//drawParallelPlot();

get_data('/getOverallAqi','barchart');

get_data('/getMapData/2016/SO2','mapview');

get_data('/getPieView/2016','pie');

get_data('/getLine/SO2/California','line');

get_data('/getLineCustom/California','linecustom');

get_data('/getPCP','pcp');
//drawParallelPlot();

function get_data(url,plot) {
	$.ajax({
	  type: 'GET',
	  url: url,
      contentType: 'application/json; charset=utf-8',
	  xhrFields: {
		withCredentials: false
	  },
	  headers: {
	  },
	  success: function(result) {
        if(plot == 'barchart'){
            drawBarChart(result.dd);
        }
        if(plot == 'mapview'){
            drawMapView(result.co);
        }
        if(plot == 'pie'){
            drawPieChart(result.content[0]);
        }
        if(plot == 'line'){
            drawLineChart(result.pollution);
        }
        if(plot == 'linecustom'){
            drawLineChartCustom(result.combine);
        }
        if(plot == 'pcp'){
            console.log(result);
            drawParallelPlot(result.cities);
        }
	  },
	  error: function(result) {
		$("#error").html(result);
        console.log(result);
	  }
	});
}

var updatePieChart = function(){
    document.getElementById("piechart").innerHTML = "";
    var year = document.getElementById("selectedYear").innerHTML;
    get_data('/getPieView/'+year,'pie');
}

var updateSelectedStates = function(state){
    document.getElementById("selectedState").innerHTML = state;
    var states = document.getElementById("selectedStates").innerHTML;
    states = states + '-' + state;
    /*
    if(selectedStates.includes(state)){
        selectedStates = selectedStates.replace('-'+state,'')
    }else{
        selectedStates = selectedStates + '-' + state;
    }
    */ 

    document.getElementById("selectedStates").innerHTML = states;
}

var updateLineChart = function(){
    document.getElementById("linechart").innerHTML = "";
    var states = document.getElementById("selectedStates").innerHTML;
    var pollutant = document.getElementById("selectedPollutant").innerHTML;
    get_data('/getLine/'+pollutant+'/'+states,'line');

}

var updateMapView = function(){
    document.getElementById("mapview").innerHTML = "";
    var pollutant = document.getElementById("selectedPollutant").innerHTML;
    var year = document.getElementById("selectedYear").innerHTML;
    document.getElementById("mapview_text").innerHTML = pollutant+" concentration in "+year;
    get_data('/getMapData/'+year+'/'+pollutant,'mapview');
}

var updateLineChartCustom = function(){
    document.getElementById("linechartcustom").innerHTML = "";
    var state = document.getElementById("selectedState").innerHTML;
    get_data('/getLineCustom/'+state,'linecustom');

}