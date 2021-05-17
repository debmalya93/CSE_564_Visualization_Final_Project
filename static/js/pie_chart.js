var drawPieChart = function(data){
    // set the dimensions and margins of the graph

    var width = 320
    height = 320
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#piechart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    //var data = {SO2: 9, NO2: 20, CO:30, O3:8}
    //var data = [9,20,30,8];

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(data)
    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
    .range(["#04009A", "#77ACF1", "#3EDBF0", "#AA2EE6", "#3D84B8"])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('class','haha')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ 
        if(d.data.key=='CO'){
            return "#F1cA89";
        }else{
            return(color(d.data.key));
        }
        
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    /*.style('fill-opacity',function(d){
        if(d.data.key=='CO'){
            return 0;
        }
    })*/
    //.on('mouseover',selectPollutant)
    //.on('mouseout',selectPollutant2)
    .on("click",selectPollutant);

    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return d.data.key})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 10)


    function selectPollutant(d, i){
        //d3.selectAll('.haha').style('fill-opacity', 1);
        //d3.select(this).style('fill-opacity', 0);
        d3.selectAll('.haha').style('fill',function(d){
            return(color(d.data.key));
        });
        d3.select(this).style('fill', "#F1cA89");
        document.getElementById("selectedPollutant").innerHTML = d.data.key;
        //document.getElementById("selectedStates").innerHTML = "California";
        //document.getElementById("selectedState").innerHTML = "California";
        updateMapView();
        updateLineChart();
        //updateLineChartCustom();
    }
}