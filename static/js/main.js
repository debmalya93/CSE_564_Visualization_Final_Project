
document.getElementById("selectedPollutant").innerHTML = 'CO';
document.getElementById("selectedYear").innerHTML = 2016;
document.getElementById("selectedStates").innerHTML = "California";
document.getElementById("selectedState").innerHTML = "California";

document.getElementById("mapview_text").innerHTML = "CO concentration in 2016";
document.getElementById("line_text").innerHTML = "CO concentration over the years";
document.getElementById("piechart_text").innerHTML = "Pollutants Distribution in 2016";
document.getElementById("customline_text").innerHTML = "Population and Death Count in California over the years";
document.getElementById("pcp_text").innerHTML = "Pollutant Concentrations in various cities of California in 2016";

get_data('/getOverallAqi','barchart');

get_data('/getMapData/2016/CO','mapview');

get_data('/getPieView/2016','pie');

get_data('/getLine/CO/California','line');

get_data('/getLineCustom/California','linecustom');

get_data('/getPCP/California/2016','pcp');

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
            paraPlot(result.cities);
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
    document.getElementById("piechart_text").innerHTML = "Pollutants Distribution in "+year;
    get_data('/getPieView/'+year,'pie');
}

var updatePcpChart = function(){
    document.getElementById("pcpview").innerHTML = "";
    var state = document.getElementById("selectedState").innerHTML;
    var year = document.getElementById("selectedYear").innerHTML;
    console.log(state);
    document.getElementById("pcp_text").innerHTML = "Pollutant Concentrations in various cities of "+ state+ " in "+year;
    get_data('/getPCP/'+state+'/'+year,'pcp');
}

var updateSelectedStates = function(state){
    document.getElementById("selectedState").innerHTML = state;
    var selectedStates = document.getElementById("selectedStates").innerHTML;
    if(selectedStates.includes(state)){
        selectedStates = selectedStates.replace('-'+state,'');
    }else{
        selectedStates = selectedStates + '-' + state;
    }
    document.getElementById("selectedStates").innerHTML = selectedStates;
}

var updateLineChart = function(){
    document.getElementById("linechart").innerHTML = "";
    var states = document.getElementById("selectedStates").innerHTML;
    var pollutant = document.getElementById("selectedPollutant").innerHTML;
    document.getElementById("line_text").innerHTML = pollutant+" concentration over the years";
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
    document.getElementById("customline_text").innerHTML = "Population and Death Count in "+ state +" over the years";
    get_data('/getLineCustom/'+state,'linecustom');

}
