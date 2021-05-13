var paraPlot = function(data){
  
     var mf = ['District Of Columbia',
      'North Carolina',
      'Maryland',
      'Colorado',
      'Minnesota',
      'Kansas',
      'Alaska',
      'New Hampshire',
      'South Carolina',
      'Iowa',
      'Illinois',
      'Texas',
      'Oregon',
      'North Dakota',
      'Missouri',
      'Maine',
      'Country Of Mexico',
      'New York',
      'Wyoming',
      'Georgia',
      'Indiana',
      'Arizona',
      'Ohio',
      'Connecticut',
      'Rhode Island',
      'Delaware',
      'New Jersey',
      'Arkansas',
      'Pennsylvania',
      'Nevada',
      'Kentucky',
      'New Mexico',
      'Washington',
      'Virginia',
      'Hawaii',
      'Michigan',
      'California',
      'Utah',
      'Alabama',
      'Florida',
      'Tennessee',
      'Oklahoma',
      'South Dakota',
      'Louisiana',
      'Massachusetts',
      'Wisconsin',
      'Idaho']
  
    var margin = {top: 20, right: 20, bottom: 20, left: 100},
      width = 400,
      height = 270;
  var cl_list = ["B"]*data.length;
  
  var x,
      dimensions,
      y = {},
      dragging = {};
  
  
  
  var svg = d3.select("#pcpview").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      // x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
      //     return d != "State" && (y[d] = d3.scaleLinear()
      //         .domain(d3.extent(data, function(p) { return +p[d]; }))
      //         .range([height, 0]));
      // }));
  
      dimensions = d3.keys(data[0]).filter(function (key) {
                  y["State"] = d3.scaleBand()
                             .domain(mf)
                             .range([height, 0]);
                  if (key !== "State") {
                      y[key] = d3.scaleLinear()
                          .domain(d3.extent(data, function (d) { return +d[key]; }))
                          .range([height, 0]);
                      return key;
                  };
              });
      dimensions.unshift("State")
      console.log(dimensions);
  
      x = d3.scalePoint()
          .domain(dimensions)
          .range([0, width]);
  
  var color = d3.scaleOrdinal()
         .domain(["B", "M" ])
         .range([ "#69b3a2", "#ff005c"])
  
  background = svg.append("g")
        .attr("class", "background")
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("d", line);
  
  foreground = svg.append("g")
        .attr("class", "foreground")
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("d", line)
        .style("stroke", function(d, i) {
                  return d.color = color(cl_list[i]); });
  
  
  var g = svg.selectAll(".dimension")
              .data(dimensions)
            .enter().append("g")
              .attr("class", "dimension")
              .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
              .call(d3.drag()
                .on("start", function(d) {
                        dragging[d] = x(d);
                        background.attr("visibility", "hidden");
                      })
                .on("drag", function(d) {
                      dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                      foreground.attr("d", line);
                      dimensions.sort(function(a, b) { return position(a) - position(b); });
                      x.domain(dimensions);
                      g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
                    })
                .on("end", function(d) {
                      delete dragging[d];
                      transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                      transition(foreground).attr("d", line);
                      background
                          .attr("d", line)
                        .transition()
                          .delay(500)
                          .duration(0)
                          .attr("visibility", null);
                }));
    g.append("g")
        .attr("class", "axis")
        .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "12")
        .attr("y", -9)
        .text(function(d) { return d; });
  
  g.append("g")
        .attr("class", "brush")
        .each(function(d) {
                d3.select(this).call(y[d].brush = d3.brushY()
                                                    .extent([[-10, 0], [10, height]])
                                                    .on("start", brushstart)
                                                    .on("brush", brush))
                                                    .on("end", brush);
                                              })
        .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
  
  function position(d) {
              var v = dragging[d];
              return v == null ? x(d) : v;
            }
  function transition(g) {
              return g.transition().duration(500);
            }
  function line(d) {
                return d3.line()(dimensions.map(function (key) { return [x(key), y[key](d[key])]; }));
            }
  function brushstart() {
              d3.event.sourceEvent.stopPropagation();
            }
  function brush() {
    var actives = [];
    svg.selectAll(".brush")
        .filter(function (d) {
            console.log(d3.brushSelection(this));
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
  
  }
  