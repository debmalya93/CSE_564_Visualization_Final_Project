var paraPlot = function(){
    var data = [{'CO': 11, 'NO2': 30, 'O3': 33, 'SO2': 12, 'State': 'District Of Columbia'},
     {'CO': 5, 'NO2': 22, 'O3': 44, 'SO2': 8, 'State': 'North Carolina'},
     {'CO': 4, 'NO2': 19, 'O3': 36, 'SO2': 7, 'State': 'Maryland'},
     {'CO': 7, 'NO2': 35, 'O3': 34, 'SO2': 10, 'State': 'Colorado'},
     {'CO': 3, 'NO2': 15, 'O3': 33, 'SO2': 1, 'State': 'Minnesota'},
     {'CO': 6, 'NO2': 21, 'O3': 34, 'SO2': 9, 'State': 'Kansas'},
     {'CO': 6, 'NO2': 19, 'O3': 17, 'SO2': 14, 'State': 'Alaska'},
     {'CO': 5, 'NO2': 14, 'O3': 34, 'SO2': 7, 'State': 'New Hampshire'},
     {'CO': 1, 'NO2': 4, 'O3': 37, 'SO2': 4, 'State': 'South Carolina'},
     {'CO': 3, 'NO2': 14, 'O3': 33, 'SO2': 1, 'State': 'Iowa'},
     {'CO': 6, 'NO2': 28, 'O3': 31, 'SO2': 13, 'State': 'Illinois'},
     {'CO': 4, 'NO2': 23, 'O3': 35, 'SO2': 4, 'State': 'Texas'},
     {'CO': 5, 'NO2': 17, 'O3': 25, 'SO2': 2, 'State': 'Oregon'},
     {'CO': 2, 'NO2': 12, 'O3': 29, 'SO2': 0, 'State': 'North Dakota'},
     {'CO': 7, 'NO2': 29, 'O3': 41, 'SO2': 18, 'State': 'Missouri'},
     {'CO': 3, 'NO2': 11, 'O3': 28, 'SO2': 2, 'State': 'Maine'},
     {'CO': 17, 'NO2': 37, 'O3': 31, 'SO2': 6, 'State': 'Country Of Mexico'},
     {'CO': 5, 'NO2': 30, 'O3': 31, 'SO2': 14, 'State': 'New York'},
     {'CO': 1, 'NO2': 9, 'O3': 41, 'SO2': 1, 'State': 'Wyoming'},
     {'CO': 5, 'NO2': 24, 'O3': 34, 'SO2': 1, 'State': 'Georgia'},
     {'CO': 5, 'NO2': 24, 'O3': 41, 'SO2': 14, 'State': 'Indiana'},
     {'CO': 9, 'NO2': 36, 'O3': 39, 'SO2': 4, 'State': 'Arizona'},
     {'CO': 4, 'NO2': 22, 'O3': 31, 'SO2': 15, 'State': 'Ohio'},
     {'CO': 3, 'NO2': 18, 'O3': 37, 'SO2': 3, 'State': 'Connecticut'},
     {'CO': 3, 'NO2': 14, 'O3': 37, 'SO2': 1, 'State': 'Rhode Island'},
     {'CO': 3, 'NO2': 21, 'O3': 35, 'SO2': 2, 'State': 'Delaware'},
     {'CO': 6, 'NO2': 31, 'O3': 34, 'SO2': 11, 'State': 'New Jersey'},
     {'CO': 5, 'NO2': 21, 'O3': 35, 'SO2': 2, 'State': 'Arkansas'},
     {'CO': 3, 'NO2': 23, 'O3': 39, 'SO2': 15, 'State': 'Pennsylvania'},
     {'CO': 3, 'NO2': 23, 'O3': 40, 'SO2': 1, 'State': 'Nevada'},
     {'CO': 3, 'NO2': 25, 'O3': 42, 'SO2': 18, 'State': 'Kentucky'},
     {'CO': 3, 'NO2': 24, 'O3': 41, 'SO2': 1, 'State': 'New Mexico'},
     {'CO': 2, 'NO2': 21, 'O3': 27, 'SO2': 1, 'State': 'Washington'},
     {'CO': 5, 'NO2': 20, 'O3': 38, 'SO2': 9, 'State': 'Virginia'},
     {'CO': 4, 'NO2': 8, 'O3': 26, 'SO2': 2, 'State': 'Hawaii'},
     {'CO': 6, 'NO2': 31, 'O3': 40, 'SO2': 17, 'State': 'Michigan'},
     {'CO': 7, 'NO2': 24, 'O3': 35, 'SO2': 3, 'State': 'California'},
     {'CO': 5, 'NO2': 23, 'O3': 42, 'SO2': 1, 'State': 'Utah'},
     {'CO': 3, 'NO2': 21, 'O3': 36, 'SO2': 7, 'State': 'Alabama'},
     {'CO': 5, 'NO2': 16, 'O3': 35, 'SO2': 2, 'State': 'Florida'},
     {'CO': 4, 'NO2': 3, 'O3': 45, 'SO2': 2, 'State': 'Tennessee'},
     {'CO': 2, 'NO2': 14, 'O3': 41, 'SO2': 3, 'State': 'Oklahoma'},
     {'CO': 2, 'NO2': 11, 'O3': 34, 'SO2': 0, 'State': 'South Dakota'},
     {'CO': 6, 'NO2': 26, 'O3': 34, 'SO2': 11, 'State': 'Louisiana'},
     {'CO': 5, 'NO2': 29, 'O3': 25, 'SO2': 7, 'State': 'Massachusetts'},
     {'CO': 5, 'NO2': 26, 'O3': 27, 'SO2': 8, 'State': 'Wisconsin'},
     {'CO': 2, 'NO2': 23, 'O3': 34, 'SO2': 0, 'State': 'Idaho'}];
  
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
  
    var margin = {top: 100, right: 100, bottom: 100, left: 100},
      width = 480,
      height = 270 - margin.top - margin.bottom;
  var cl_list = ["B"]*data.length;
  
  var x,
      dimensions,
      y = {},
      dragging = {};
  
  
  
  var svg = d3.select("svg")
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
  