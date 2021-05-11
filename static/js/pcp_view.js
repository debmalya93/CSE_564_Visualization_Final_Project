var drawParallelPlot = function(){

    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 460 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;
    

    var svg = d3.select("#pcpview")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



    d3.csv("static/FIFA_A.csv", function(data) {
        
        var dimensions = ['Skill Moves','Finishing','HeadingAccuracy','ShortPassing'];
        
        var y = {};
        var dragging = {};
        for (i in dimensions) {
            var name = dimensions[i]
            y[name] = d3.scaleLinear()
            .domain( d3.extent(data, function(d) { return +d[name]; }) )
            .range([height, 0])
        }

        var x = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);

        function position(d) {
            var v = dragging[d];
            return v == null ? x(d) : v;
        }
        
        function transition(g) {
            return g.transition().duration(500);
        }
        
        // Returns the path for a given data point.
        function path(d) {
            return d3.line()(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
        }
        
        function brushstart() {
            d3.event.sourceEvent.stopPropagation();
        }
        
        
    function brush() {
        var actives = [];
        svg.selectAll(".brush")
            .filter(function (d) {
                return d3.brushSelection(this);
            })
            .each(function (key) {
                    actives.push({
                        dimension: key,
                        extent: d3.brushSelection(this)
                    });
                });
                if (actives.length === 0) {
                foreground.style("display", null);
            } else {
                foreground.style("display", function (d) {
                    return actives.every(function (brushObj) {
                        return brushObj.extent[0] <= y[brushObj.dimension](d[brushObj.dimension]) && y[brushObj.dimension](d[brushObj.dimension]) <= brushObj.extent[1];
                    }) ? null : "none";
                });
            }
        
        }
        
        // Add grey background lines for context.
        var background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", path);

        // Add blue foreground lines for focus.
        var foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        //.style("stroke",function(d,i){
        //    if(d['kcluster'] == 0){
        //        return "blue";
        //    }else if(d['kcluster'] == 1){
        //        return "red";
        //    }else{
        //        return "yellow";
        //    }
        //})


        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .call(d3.drag()
            //.origin(function(d) { return {x: x(d)}; })
            .on("start", function(d) {
            dragging[d] = x(d);
            background.attr("visibility", "hidden");
            })
            .on("drag", function(d) {
            dragging[d] = Math.min(width, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function(a, b) { return position(a) - position(b); });
            x.domain(dimensions);
            g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
            })
            .on("end", function(d) {
            delete dragging[d];
            transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            transition(foreground).attr("d", path);
            background
                .attr("d", path)
                .transition()
                .delay(500)
                .duration(0)
                .attr("visibility", null);
            }));

        // Add an axis and title.
        g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -5)
        .attr('fill','black')
        .text(function(d) { return d; });

        // Add and store a brush for each axis.
        g.append("g")
        .attr("class", "brush")
        .each(function(d) {
            //d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
            d3.select(this).call(
                y[d].brush = d3.brushY()
                .extent([[-10,0], [10, height]])
                //.extent([[0,0], [y[d],y[d]]])
                //.y(y[d])
                .on("start", brushstart)
                .on("brush", brush)
                .on("end", brush));
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);

    });

   
    
}