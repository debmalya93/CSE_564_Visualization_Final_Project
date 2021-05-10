
var selectedStates = "Texas";
//console.log(loading);
//drawMapView();
//drawBarChart(loading);

//drawPieChart();
//drawLineChart();
//drawParallelPlot();

get_data('/getOverallAqi','barchart');

get_data('/getMapData','mapview');

get_data('/getPieView/2016','pie');

get_data('/getLine/SO2/'+selectedStates,'line');

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
            console.log(result);
            drawLineChart(result.pollution);
        }
	  },
	  error: function(result) {
		$("#error").html(result);
	  }
	});
}

var updatePieChart = function(year){
    document.getElementById("piechart").innerHTML = "";
    get_data('/getPieView/'+year,'pie');
}

var updateLineChart = function(state){
    document.getElementById("linechart").innerHTML = "";
    selectedStates = selectedStates + '-' + state;
    get_data('/getLine/SO2/'+selectedStates,'line');

}