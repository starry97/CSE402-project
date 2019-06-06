import { DEFAULT_ARROW_ATTRIBUTES, DEFAULT_TEXT_ATTRIBUTES, DEFAULT_RECT_ATTRIBUTES, ARROW_LENGTH, SVG_ID } from "../utils/constants";

export default class MViz {
  constructor(json = "{}", divName) {
    this.parsedJSON = JSON.parse(json);
    this.svg = d3.select(document.createElementNS(d3.namespaces.svg, 'svg'))
                .attr("id", SVG_ID)
                .attr("width", 500)
                .attr("height", 500);
    this.divName = divName;
  }

  draw() {
    const {layers, attributes} = this.parsedJSON;
    let y = 0;
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      const {name, type} = layer;
      const attr = {
        ...attributes[name],
        ...attributes[type]
      }
      const {text, shape, ...styleAttr} = attr;
      const rectAttribute = {
        ...DEFAULT_RECT_ATTRIBUTES,
        y,
        ...styleAttr
      }

      let label = "";
      if (text) {
        for (let i = 0; i < text.length; i++) {
          label += layer[text[i]];
        }
      }

      this._appendShape(shape, rectAttribute);
      y += parseInt(rectAttribute.height);
      this._appendShape("text", {
            label,
            y: y - parseInt(rectAttribute.height) / 2 
      });
      if (i != layers.length - 1) {
        const arrowAttribute = {
          y1: y,
          y2: y + ARROW_LENGTH
        }
        this._appendShape("arrow", arrowAttribute);
        y = y + ARROW_LENGTH;
      }
    }
    
    this._insertTo("body")
  }


  _arrow(attr = {}) {
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

  _rect(attr = {}) {
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

  _text(attr = {}) {
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

  _insertTo(divName = "body") {
    d3.select(divName).append(() => {
      return this.svg.node();
    });
  }

  _appendShape(shape, attr = {}) {
    if (!shape) {
      return this;
    }
    switch (shape) {
      case "rect":
        return this._rect(attr);
      case "text":
        return this._text(attr);
      case "arrow":
        return this._arrow(attr);
      default:
        console.error("unrecognized shape " + shape);
    }
  }
}
