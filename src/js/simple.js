function drawArrow(graph, x, y1, y2) {
  let arrowOffset = 5;

  //arrow
  graph.append("svg:defs").append("svg:marker")
              .attr("id", "triangle")
              .attr("refX", 6)
              .attr("refY", 6)
              .attr("markerWidth", 30)
              .attr("markerHeight", 30)
              .attr("orient", "auto")
              .append("path")
              .attr("d", "M 0 0 12 6 0 12 3 6")
              .style("fill", "black");

  //line              
  graph.append("line")
        .attr("x1", x)
        .attr("y1", y1)
        .attr("x2", x)
        .attr("y2", y2 - arrowOffset)          
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .attr("marker-end", "url(#triangle)");
}


function drawModel(jsonData) {
  let data = jsonData["model"];
  
  let barHeight = 50;
  let barWidth = 150;
  let dist = 100;
  
  let graph = d3.select("body")
     .append("svg")
     .attr("width", 500)
     .attr("height", 500);
  
  let x = 0;
  let y = 0;
  
  for (let i = 0; i < data.length - 1; i++) {
     graph.append("rect").attr("x", x).attr("y", y).attr("width", barWidth).attr("height", barHeight).style("fill", "purple");
     drawArrow(graph, barWidth / 2, y + barHeight, y + dist);
     y = y + dist;
  }
  
  graph.append("rect").attr("x", x).attr("y", y).attr("width", barWidth).attr("height", barHeight).style("fill", "purple");
}


$.ajax({
  url: 'test.json',
  dataType: 'JSONP',
  jsonpCallback: 'callbackFnc',
  type: 'GET',
  async: false,
  crossDomain: true,
  success: function (jsonData) { drawModel(jsonData)},
  failure: function () { },
  complete: function (data) {
        if (data.readyState == '4' && data.status == '200') {
           console.log("success")
        }
        else {
           console.log("fail")
        }
  }
});