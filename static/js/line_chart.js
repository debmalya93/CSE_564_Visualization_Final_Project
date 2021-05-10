var drawLineChart = function(linedata){

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

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
    .domain([0, 30])
    .range([ height, 0 ]);
    svg.append("g")
    .call(d3.axisLeft(y));

    for(var i=0;i<linedata.length;i++){
        // Add the line
        svg.append("path")
        .datum(linedata[i])
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.Year) })
            .y(function(d) { return y(d.AQI) })
            );
    }
    

    
    //}
    //);
}