var drawBarChart = function(data){
    /*let mymap = new Map();
    var temp;
    data.forEach(function(d){
        temp = mymap.get(d)
        if(Number.isNaN(temp)){
            mymap.set(d,1);
        }else{
            mymap.set(d,temp+1);
        }
        
    });
    var categories = [];
    var frequencies = [];
    for (let categorie of mymap.keys()) {
       categories.push(categorie);
    }
    categories.sort();
    categories.forEach(function(d){
        frequencies.push(mymap.get(d));
    });*/

    var categories = [];
    var frequencies = [];
    categories = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013'
                    ,'2014','2015','2016'];
    frequencies = data;

    var margin = { top: 40, right: 40, bottom: 40, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;
    
    var svg = d3.select('#barchart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    var g =  svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    var xscale = d3.scaleBand()
        .domain(categories)
        .range([0, width]).padding(0.4);

    var yscale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .style('stroke-width', '2px')
        .call(d3.axisBottom(xscale))

        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );

            g.append("text")             
            .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                 (height +39) + ")")
            .style("text-anchor", "middle")
            .attr("font-size", "15px")
            .text("Year");

        

    g.append("g")
        .attr("transform", "translate(0, 0)")
        .style('stroke-width', '2px')
        .call(d3.axisLeft(yscale))
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

    g.selectAll("rect")
        .data(categories)
        .enter().append("rect")
        .attr("fill",function(d){
            if(d==2016)
                return "darkred";
            else
                return "darkblue";
        } )
        .attr("x", function(d) { return xscale(d); })
        .attr("y", height)
        .attr("height", 0)
        .attr("width", xscale.bandwidth())
        .on("mouseover", showFreq)
        .on("click",selectYear)
        .on("mouseout", revertBack)
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .delay(function (d, i) {
            return i * 40;
        })
        .attr("y", function(d, i) { return yscale(frequencies[i]); })
        .attr("height", function(d, i) { return height - yscale(frequencies[i]); });

    function showFreq(d, i){
        //d3.select(this).attr("fill", "darkred");
        //d3.select(this)
        //    .transition()
        //    .duration(250)
        //    .attr('width', xscale.bandwidth() + 5)
        //    .attr("y", function() { return yscale(frequencies[i]) - 10; })
        //    .attr("height", function() { return height - yscale(frequencies[i]) + 10; });

        g.append('text')
            .attr('x', xscale(d))
            .attr('y', yscale(frequencies[i]) - 10)
            .attr('class', 'freq')
            .attr('fill','darkred' )
            .attr('font-size','20px' )
            .attr('font-family','Times New Roman' )
            .attr('font-weight','bold' )
            .text(function(){
                return +frequencies[i];
        });

    } 

    function revertBack(d, i){
        //d3.select(this).attr("fill", "darkblue");
        //d3.select(this)
        //    .transition()
        //    .duration(250)
        //    .attr('width', xscale.bandwidth())
        //    .attr("y", function() { return yscale(frequencies[i]); })
        //    .attr("height", function() { return height - yscale(frequencies[i]); });

        d3.selectAll('.freq')
            .remove();
        
    } 

    function selectYear(d, i){
        d3.selectAll('rect').attr("fill", "darkblue");
        d3.select(this).attr("fill", "darkred");
        document.getElementById("selectedYear").innerHTML = d;
        updatePieChart();
        updateMapView();
    }


}