var drawLineChart = function(linedata){
    var states = document.getElementById("selectedStates").innerHTML.split("-");
    //console.log(states);

    var max=0;
    for(var i=0;i<linedata.length;i++){
        for(var j=0;j<linedata[0].length;j++){
            max = Math.max(max,linedata[i][j].AQI);
        }
    }

    var colors = ['#69B3A2','#FF005C','#FF8882','#150E56','#556B2F','#8FBC8F','#2F4F4F',
            '#00008B','#B8860B','#006400','#BDB76B','#556B2F','#8FBC8F','#2F4F4F'];
    //console.log(max);
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 440 - margin.left - margin.right,
    height = 310 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#linechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

    // When reading the csv, I must format variables:
    //function(d){
    //return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
    //},

    // Now I can use this dataset:
    //function(data) {

    var categories = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013'
                    ,'2014','2015','2016'];

    // Add X axis --> it is a date format
    var x = d3.scaleBand()
        .domain(categories)
        .range([0, width]).padding(0.4);
    //var x = d3.scaleTime()
    //.domain(d3.extent(data, function(d) { return d.Year; }))
    //.range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );


    // Add Y axis
    var y = d3.scaleLinear()
    //.domain([0, d3.max(data, function(d) { return +d.AQI; })])
    .domain([0, max+10])
    .range([ height, 0 ]);
    svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 55)
        .attr("dy", "-5em")
        .attr("x", -150)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "Times New Roman")
        .attr("font-size", "15px")
        .text("AQI");

    for(var i=0;i<linedata.length;i++){
        // Add the line
        svg.append("path")
        .datum(linedata[i])
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.Year) })
            .y(function(d) { return y(d.AQI) })
            );

        svg.append("text")
        .attr("transform", "translate(" + x(linedata[i][2].Year) + "," + y(linedata[i][2].AQI) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", colors[i])
        .text(states[i]);
    }
    

    
    //}
    //);
}