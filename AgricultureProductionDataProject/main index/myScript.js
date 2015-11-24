// margins
 var margin = { top:30, right: 10, bottom:150, left:50},
    width   = 900 - margin.right - margin.left,
    height  = 550 - margin.top - margin .bottom;

// define SVG
var svg = d3.select('.first')
    .append('svg')
    .attr({
        "width" : width + margin.right + margin.left,
        "height": height + margin.top  + margin.bottom
    })
    .append('g')
    .attr("transform", "translate("+ margin.left + ',' + margin.top+ ')');


// x and y scale
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.5, 0.4);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

//load the JSON
d3.json("tempOilseedFile.json", function(error, data){
  if(error) console.log("error: data not found");

//convert to proper formats

    data.forEach(function(d){
        d.seed = d.seed;
        d.value = +d.value;
    })

    //sort data
    data.sort(function(a, b){
      return b.value - a.value;
    })

    //specify the domians of x and y scales
    xScale.domain(data.map(function(d){ return d.seed;}));
    yScale.domain([0, d3.max(data, function(d) { return d.value;})]);

    // draw the bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("height", 0)
        .attr("y", height)
        .transition().duration(2000)
        .delay(function(d,i){ return i * 10;})
        .attr ({
            'x' : function(d){ return xScale(d.seed); },
            'y' : function(d){ return yScale(d.value);},
            'width' : xScale.rangeBand(),
            'height' : function(d) { return height - yScale(d.value);}
        })
        .style("fill", function(d,i) { return 'rgb(20,20,'+((i * 30) + 100)+')'});

    // label the bars
    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) { return d.value.toFixed(2); })
        .attr('x', function(d) { return xScale(d.seed) + xScale.rangeBand()/2; })
        .attr('y', function(d) { return yScale(d.value) -10; })
        .style('text-anchor', "middle")
        .style('fill', "black");



    //draw x axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,"+height+")")
      .call(xAxis)
      .selectAll('text')
      .attr("transform", "rotate(-60)")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .style("text-anchor", "end")
      .style("font-size", "16");

    // y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .style("font-size", "12px")
        .append("text")
        .text("Oil seed Production in 2013  ---->")
        .attr("transform", "rotate(-90)")
        .attr("dx", "-6em")
        .attr("dy", "-2em")
        .style("text-anchor", "end")
        .style("font-size", "15px")
        .style("font-weight", "bold");

});


//next graph js

var svg2 = d3.select('.second')
    .append('svg')
    .attr({
        "width" : width + margin.right + margin.left,
        "height": height + margin.top  + margin.bottom
    })
    .append('g')
    .attr("transform", "translate("+ margin.left + ',' + margin.top+ ')');


// x and y scale
var xScale2 = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.3, 0.4);

var yScale2 = d3.scale.linear()
    .range([height, 0]);

// define axis
var xAxis2 = d3.svg.axis()
    .scale(xScale2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(yScale2)
    .orient("left");
//load the JSON
d3.json("tempFoodGrainFile.json", function(error, data){
  if(error) console.log("error: data not found");

//convert to proper formats

    data.forEach(function(d){
        d.grain = d.grain;
        d.value = +d.value;
    })

    //sort data
    data.sort(function(a, b){
      return b.value - a.value;
    })

    //specify the domians of x and y scales
    xScale2.domain(data.map(function(d){ return d.grain;}));
    yScale2.domain([0, d3.max(data, function(d) { return d.value;})]);

    // draw the bars
    svg2.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("height", 0)
        .attr("y", height)
        .transition().duration(2000)
        .delay(function(d,i){ return i * 10;})
        .attr ({
            'x' : function(d){ return xScale2(d.grain); },
            'y' : function(d){ return yScale2(d.value);},
            'width' : xScale2.rangeBand(),
            'height' : function(d) { return height - yScale2(d.value);}
        })
        .style("fill", function(d,i) { return 'rgb(20,20,'+((i * 30) + 100)+')'});

    // label the bars
    svg2.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) { return d.value.toFixed(2); })
        .attr('x', function(d) { return xScale2(d.grain) + xScale2.rangeBand()/2; })
        .attr('y', function(d) { return yScale2(d.value) -10; })
        .style('text-anchor', "middle")
        .style('fill', "black");



    //draw x axis
    svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,"+height+")")
      .call(xAxis2)
      .selectAll('text')
      .attr("transform", "rotate(-60)")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .style("text-anchor", "end")
      .style("font-size", "16");

    // y axis
    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis2)
        .style("font-size", "12px")
        .append("text")
        .text("Food Grain Production in 2013  ---->")
        .attr("transform", "rotate(-90)")
        .attr("dx", "-6em")
        .attr("dy", "-2.5em")
        .style("text-anchor", "end")
        .style("font-size", "15px")
        .style("font-weight", "bold");

});
