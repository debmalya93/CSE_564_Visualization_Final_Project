var drawMapView = function(data){
    //Width and height of map
    var width = 800;
    var height = 400;

    //var lowColor = '#f9f9f9'
    //  var highColor = '#bc2a66'

    var lowColor = '#ADD8E6'
    var highColor = '#00008B'

    // D3 Projection
    var projection = d3.geoAlbersUsa()
    //.translate([width / 2, height / 2]) // translate to center of screen
    .translate([350, 200]) // translate to center of screen
    .scale([700]); // scale things down so see entire US

    // Define path generator
    var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection

    //Create SVG element and append map to the SVG
    var svg = d3.select("#mapview")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    //var data = [{state: "Alabama", value: "7.9"},
    //            {state: "Texas", value: "8.1"}];

    

    // Load in my states data!
    //d3.csv("static/data/statesdata.csv", function(data) {
        //console.log(data);
        var dataArray = [];
        for (var d = 0; d < data.length; d++) {
            dataArray.push(parseFloat(data[d].value))
        }
        var minVal = d3.min(dataArray)
        var maxVal = d3.max(dataArray)
        var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])
        
        // Load GeoJSON data and merge with states data
        d3.json("static/data/us-states.json", function(json) {

            // Loop through each state data value in the .csv file
            for (var i = 0; i < data.length; i++) {

            // Grab State Name
            var dataState = data[i].state;

            // Grab data value 
            var dataValue = data[i].value;

                // Find the corresponding state inside the GeoJSON
                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.name;

                    if (dataState == jsonState) {

                        // Copy the data value into the JSON
                        json.features[j].properties.value = dataValue;

                        // Stop looking through the JSON
                        break;
                    }
                }
            }

            // Bind the data to the SVG and create one path per GeoJSON feature
            svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) { return ramp(d.properties.value) })
            .on('mouseover', function(d, i) {
                var currentState = this;
                var html = "";
                html += "<span class=\"tooltip_key\">";
                html += d.properties.name;
                html += "</span>";
                $("#tooltip-container").html(html);
                $("#tooltip-container").show();
                //d3.select(this).style('fill-opacity', .2);
                //console.log(d3.event.layerY);
                d3.select("#tooltip-container")
                .style("top", (d3.event.layerY + 260) + "px")
                .style("left", (d3.event.layerX + 15) + "px");
            })
            .on('mouseout', function(d, i) {
                //d3.select(this).style('fill-opacity', 1);
                $("#tooltip-container").hide();
            })
            .on('click',function(d,i){
                d3.select(this).style('fill-opacity', .2);
                updateSelectedStates(d.properties.name);
                updateLineChart();
                updateLineChartCustom();
                updatePcpChart();
            });
            
                // add a legend
                //var w = 140, h = 300;
                var w = 100, h = 300;

                var key = d3.select("#mapview")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("class", "legend");

                var legend = key.append("defs")
                    .append("svg:linearGradient")
                    .attr("id", "gradient")
                    .attr("x1", "100%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "100%")
                    .attr("spreadMethod", "pad");

                legend.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", highColor)
                    .attr("stop-opacity", 1);
                    
                legend.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", lowColor)
                    .attr("stop-opacity", 1);

                key.append("rect")
                    //.attr("width", w - 100)
                    .attr("width", w - 60)
                    .attr("height", h)
                    .style("fill", "url(#gradient)")
                    .attr("transform", "translate(0,10)");

                var y = d3.scaleLinear()
                    .range([h, 0])
                    .domain([minVal, maxVal]);

                var yAxis = d3.axisRight(y);

                key.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(41,10)")
                    .call(yAxis)
        });
    //});
}