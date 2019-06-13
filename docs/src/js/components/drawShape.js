import { DEFAULT_TEXT_ATTRIBUTES, DEFAULT_RECT_ATTRIBUTES, DEFAULT_ARROW_WITH_TEXT_ATTRIBUTES, ARROW_OFFSET, DEFAULT_VERTICAL_ARROW_ATTRIBUTES, DEFAULT_ARROW_ATTRIBUTES } from "../utils/constants";

export class Shape {
    constructor(svg, isVertical=true) {
        this.svg = svg;
        this.isVertical = isVertical
    }

  arrowWithText(attr = {}) {
    //line             
    attr = {
      ...DEFAULT_ARROW_ATTRIBUTES,
      ...attr
    };
    // TODO: ideally, textheight should be calculated based on the font size
    const {x, y, length, textHeight} = attr;
    const firstHalfLineLen = length / 2 - textHeight;
    const secondHalfLineLen = length / 2;
    let x1, x2, y1, y2;
    if (this.isVertical) {
      x1 = x;
      x2 = x;
      y1 = y;
      y2 = y + firstHalfLineLen;
    } else {
      x1 = x;
      x2 = x + firstHalfLineLen;
      y1 = y;
      y2 = y;
    }
    // line
    this.svg.append("line")
          .attr("x1", x1)
          .attr("y1", y1)
          .attr("x2", x2)
          .attr("y2", y2)
          .attr("stroke-width", 1)
          .attr("stroke", "black")
    //line with arrow    
    if (this.isVertical) {
      y1 = y + firstHalfLineLen;
      y2 = y1 + secondHalfLineLen;
    } else {
      x1 = x + firstHalfLineLen;
      x2 = x1 + secondHalfLineLen;
    }
    this.svg.append("line")
          .attr("x1", x1)
          .attr("y1", y1)
          .attr("x2", x2)
          .attr("y2", y2)
          .attr("stroke-width", 1)
          .attr("stroke", "black")
          .attr("marker-end", "url(#triangle)");
    return this;
  }

  arrow(attr = {}) {
    attr = {
      ...DEFAULT_ARROW_ATTRIBUTES,
      ...attr
    };
    const {x, y, length} = attr;
    let x1, x2, y1, y2;
    if (this.isVertical) {
      x1 = x;
      x2 = x;
      y1 = y;
      y2 = y + length - ARROW_OFFSET;
    } else {
      x1 = x;
      x2 = x + length - ARROW_OFFSET;
      y1 = y;
      y2 = y;
    }
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
          .attr("y2", y2)          
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
    console.log("rect fill is " + fill)
    console.log("red is " + fill.r)
    this.svg.append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", width)
                .attr("height", height)
                .style("fill", fill.r ? d3.rgb(fill.r, fill.g, fill.b) : "black")
                .style("stroke", stroke);
    return this;
  }

  text(attr = {}) {
    attr = {
      ...DEFAULT_TEXT_ATTRIBUTES,
      ...attr
    };
    const {label, x, y, fill, textAnchor} = attr;
    if (!label) {
      return this;
    }
    this.svg.append("text")
            .attr("x", x)
            .attr("y", y)
            .style("fill", fill)
            .text(label)
            .style("text-anchor", textAnchor);
    return this;
  }
}