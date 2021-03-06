var drawLineChartCustom = function(linedata){

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 60, bottom: 40, left: 60},
    width = 440 - margin.left - margin.right,
    height = 310 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#linechartcustom")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    var categories = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013'
                    ,'2014','2015','2016'];

    // Add X axis --> it is a date format
    var x = d3.scaleBand()
        .domain(categories)
        .range([0, width]).padding(0.4);
    
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );

    svg.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                            (height-2) + ")")
    .style("text-anchor", "middle")
    .attr("font-size", "15px")
    .text("Year");


    // Add Y axis
    var y = d3.scaleLinear()
    .domain([d3.min(linedata[0], function(d) { return +d.Population; }), d3.max(linedata[0], function(d) { return +d.Population; })])
    //.domain([0, 30])
    .range([ height, 0 ]);
    svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 55)
        .attr("dy", "-2.5em")
        .attr("x", -150)
        .attr("text-anchor", "middle")
        .attr("fill", "blue")
        .attr("font-family", "Times New Roman")
        .attr("font-size", "15px")
        .text("Population");
    

    var y2 = d3.scaleLinear()
    .domain([d3.min(linedata[1], function(d) { return +d.Death; }), d3.max(linedata[1], function(d) { return +d.Death; })])
    //.domain([0, 30])
    .range([ height, 0 ]);

    svg.append("g")
    .attr("transform", "translate("+width+", 0 )")
    .call(d3.axisRight(y2))
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 55)
        .attr("dy", "-4em")
        .attr("x", -150)
        .attr("text-anchor", "middle")
        .attr("fill", "red")
        .attr("font-family", "Times New Roman")
        .attr("font-size", "15px")
        .text("Death Count");;

    

    svg.append("path")
    .datum(linedata[0])
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { return y(d.Population) })
        );
    //svg.append("text")
    //.attr("transform", "translate(" + x(linedata[0][2].Year) + "," + y(linedata[0][2].Population) + ")")
    //.attr("dy", ".35em")
    //.attr("text-anchor", "start")
    //.style("fill", "blue")
    //.text("Population");
    
   

    svg.append("path")
    .datum(linedata[1])
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .style("stroke", "red")
    .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { return y2(d.Death) })
        );

    //svg.append("text")
    //.attr("transform", "translate(" + x(linedata[1][5].Year) + "," + y2(linedata[1][5].Death) + ")")
    //.attr("dy", ".35em")
    //.attr("text-anchor", "start")
    //.style("fill", "red")
    //.text("Death Count");
    
}