import { DEFAULT_ARROW_ATTRIBUTES, DEFAULT_TEXT_ATTRIBUTES, DEFAULT_RECT_ATTRIBUTES } from "../utils/constants";

export default class MViz {
  constructor(json = "{}") {
    this.parsedJSON = JSON.parse(json);
    this.svg = d3.select(document.createElementNS(d3.namespaces.svg, 'svg'))
    .attr("width", 500)
    .attr("height", 500);
  }

  arrow(attr = {}) {
    attr = {
      ...DEFAULT_ARROW_ATTRIBUTES,
      ...attr
    };
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

  rect(attr = {}) {
    attr = {
      ...DEFAULT_RECT_ATTRIBUTES,
      ...attr
    };
    const {x, y, width, height, fill, stroke} = attr;
    this.svg.append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", width)
                .attr("height", height)
                .style("fill", fill)
                .style("stroke", stroke);
    return this;
  }

  text(attr = {}) {
    attr = {
      ...DEFAULT_TEXT_ATTRIBUTES,
      ...attr
    };
    const {label, dx, dy, fill, textAnchor} = attr;
    this.svg.append("text")
            .attr("dx", dx)
            .attr("dy", dy)
            .style("fill", fill)
            .text(label)
            .style("text-anchor", textAnchor);
    return this;
  }

  draw(divName = "body") {
    d3.select(divName).append(() => {
      return this.svg.node();
    });
  }
}