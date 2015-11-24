// margins
 var margin = { top:30, right: 10, bottom:150, left:70},
    width   = 1200 - margin.right - margin.left,
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
    .rangeRoundBands([0,width], 0.09, 0.4);

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
d3.json("tempCashCropFile.json", function(error, data){
  if(error) console.log("error: data not found");

//convert to proper formats

    data.forEach(function(d){
        d.year = d.year;
        d.CashCropAggregate = +d.CashCropAggregate;
    })

    //sort data
    data.sort(function(a, b){
      return b.CashCropAggregate - a.CashCropAggregate;
    })

    //specify the domians of x and y scales
    xScale.domain(data.map(function(d){ return d.year;}));
    yScale.domain([-10, d3.max(data, function(d) { return d.CashCropAggregate;})]);

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
            'x' : function(d){ return xScale(d.year); },
            'y' : function(d){ return yScale(d.CashCropAggregate);},
            'width' : xScale.rangeBand(),
            'height' : function(d) { return height - yScale(d.CashCropAggregate);}
        })
        .style("fill", function(d,i) { return 'rgb(20,20,'+((i * 30) + 100)+')'});

    // label the bars
    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d) { return d.CashCropAggregate.toFixed(2); })
        .attr('x', function(d) { return xScale(d.year) + xScale.rangeBand()/2; })
        .attr('y', function(d) { return yScale(d.CashCropAggregate)-10; })
        .style('text-anchor', "middle")
        .style('fill', "black")
        //.attr("transform", "rotate(-0)");



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
        .text("Cash Crop Aggregate Values  ---->")
        .attr("transform", "rotate(-90)")
        .attr("dx", "-6em")
        .attr("dy", "-3em")
        .style("text-anchor", "end")
        .style("font-size", "15px")
        .style("font-weight", "bold");

});
