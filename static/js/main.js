
document.getElementById("selectedPollutant").innerHTML = 'SO2';
document.getElementById("selectedYear").innerHTML = 2016;
document.getElementById("selecteStates").innerHTML = "Texas";
//drawParallelPlot();

get_data('/getOverallAqi','barchart');

get_data('/getMapData/2016/SO2','mapview');

get_data('/getPieView/2016','pie');

get_data('/getLine/SO2/Texas','line');

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
            console.log('fdsfdsf');
            console.log(result);
            drawMapView(result.co);
        }
        if(plot == 'pie'){
            drawPieChart(result.content[0]);
        }
        if(plot == 'line'){
            drawLineChart(result.pollution);
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
    var states = document.getElementById("selecteStates").innerHTML;
    states = states + '-' + state;
    /*
    if(selectedStates.includes(state)){
        selectedStates = selectedStates.replace('-'+state,'')
    }else{
        selectedStates = selectedStates + '-' + state;
    }
    */ 

    document.getElementById("selecteStates").innerHTML = states;
}

var updateLineChart = function(){
    document.getElementById("linechart").innerHTML = "";
    var states = document.getElementById("selecteStates").innerHTML;
    var pollutant = document.getElementById("selectedPollutant").innerHTML;
    get_data('/getLine/'+pollutant+'/'+states,'line');

}

var updateMapView = function(){
    document.getElementById("mapview").innerHTML = "";
    var pollutant = document.getElementById("selectedPollutant").innerHTML;
    var year = document.getElementById("selectedYear").innerHTML;
    get_data('/getMapData/'+year+'/'+pollutant,'mapview');
}