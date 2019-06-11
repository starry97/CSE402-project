import { SVG_ID, DEBUG, TEXT_OFFSET, ARROW_OFFSET, LAYER_TYPES, COLORS } from '../utils/constants';

export function drawViz(data, containerID = "body") {
  const parsedData = JSON.parse(data);
  const svg = d3.select(containerID)
    .append("svg")
    .attr("width", 1200)
    .attr("height", 800);  

  const getTextX = (d) => {
    return d.x + d.width / 2;
  }

  const getTextY = (d) => {
    return d.y + d.height / 2 + TEXT_OFFSET
  }

  const colors = d3.scaleOrdinal()
    .domain(LAYER_TYPES)
    .range(COLORS);

  const drag = d3.drag()
    .on("drag", function(d) {
      d.x += d3.event.dx;
      d.y += d3.event.dy;

      d3.select(this).select("rect").attr("x", d.x).attr("y", d.y);
      d3.select(this).select("text").attr("x", getTextX).attr("y", getTextY);
      links.each(function(link) {
        if (link.source == d.name) {
          d3.select(this)
            .select("line")
            .attr("x1", d.x + d.width / 2)
            .attr("y1", d.y + d.height);
        } else if (link.destination == d.name) {
          d3.select(this)
            .select("line")
            .attr("x2", d.x + d.width / 2) 
            .attr("y2", d.y - ARROW_OFFSET);
        }
      });
    });
    console.log(parsedData);
    const links = svg.selectAll("link")
      .data(parsedData.links)
      .enter()
      .append("g")
      .attr("class", "link");

    links.append("line")
      .attr("x1", function(l) {
        var sourceNode = parsedData.nodes.filter(function(d) {
          return d.name == l.source
        })[0];
        d3.select(this).attr("y1", sourceNode.y + sourceNode.height);
        return sourceNode.x + sourceNode.width / 2
      })
      .attr("x2", function(l) {
        var destNode = parsedData.nodes.filter(function(d) {
          return d.name == l.destination
        })[0];
        d3.select(this).attr("y2", destNode.y - ARROW_OFFSET);
        return destNode.x + destNode.width / 2;
      })
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("marker-end", "url(#triangle)");

    links.append("text")
        .text(d => d.text)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);
      
    var g = svg.selectAll("node")
    .data(parsedData.nodes)
    .enter()
    .append("g")
    .call(drag);

    
    g.append("rect")
      .attr("class", "node")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", d => d.width)
      .attr("height", d => d.height)
      .attr("fill", d => {
        if (d.shape == "text") {
          return "none";
        }
        return colors(d.type)
      });
    

    g.append("text")
      .attr("x", getTextX)
      .attr("y", getTextY)
      .text(d => d.label)
      .style('fill', 'black')
      .style("text-anchor", "middle");

      svg.append("svg:defs").append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");
  }

    
  