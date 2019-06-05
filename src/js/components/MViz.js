import SummaryParser from './SummaryParser';

export default class MViz {
  constructor(parsedJSON) {
    this.parsedJSON = parsedJSON;
    this.svg = d3.select(document.createElementNS(d3.namespaces.svg, 'svg'))
    .attr("width", 500)
    .attr("height", 500);
  }

  arrow(attr) {
    const {x1, x2, y1, y2} = attr;
    const arrowOffset = 5;
    //arrow pointer
    this.svg.append("svg:defs").append("svg:marker")
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
    this.svg.append("line")
          .attr("x1", x1)
          .attr("y1", y1)
          .attr("x2", x2)
          .attr("y2", y2 - arrowOffset)          
          .attr("stroke-width", 1)
          .attr("stroke", "black")
          .attr("marker-end", "url(#triangle)");
    return this;
  }

  block(attr) {
    const {x, y, width, height} = attr;
    this.svg.append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", width)
                .attr("height", height);
    return this;
  }

  append(divName) {
    d3.select(divName).append(function() {
      return svg.node();
    });
  }

  draw() {

  }
}