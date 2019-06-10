import { ARROW_LENGTH, TEXT_OFFSET, TEXT_HEIGHT, SVG_ID } from "../utils/constants";
import { Shape } from "./drawShape"; 

export default class MViz {
  constructor(json="{}", divName="body", isVertical=true) {
    this.parsedJSON = JSON.parse(json);
    this.isVertical = isVertical;
    // svg will be resized
    this.svg = d3.select(document.createElementNS(d3.namespaces.svg, 'svg'))
                .attr("id", SVG_ID)
                .attr("width", 0)
                .attr("height", 0);
    this.divName = divName;
    this.shape = new Shape(this.svg, isVertical);
  }

  draw() {
    const {layers, attributes} = this.parsedJSON;
    let y = 0;
    let x = 0;
    for (let i = 0; i < layers.length; i++) {
      let nextShape = null;
      if (i != layers.length - 1) {
        const nextLayer = layers[i + 1];
        const nextType = nextLayer["type"];
        nextShape = attributes[nextType]["shape"];
      }

      // draw current layer
      const layer = layers[i];
      const {name, type} = layer;
      const attr = {
        ...attributes[name],
        ...attributes[type]
      }
      const {text, shape, ...styleAttr} = attr;
      this._appendShape(shape, {x: x, y: y, ...styleAttr});

      // draw label on current shape 
      if (text) {
        let label = ""
        for (let i = 0; i < text.length; i++) {
          label += layer[text[i]];
        }
        
        const labelX = this.isVertical ? styleAttr.width / 2 : x + parseInt(styleAttr.width) / 2 + TEXT_OFFSET;
        const labelY = this.isVertical ? y + parseInt(styleAttr.height) / 2 + TEXT_OFFSET : styleAttr.height / 2;
        
        this._appendShape("text", {
          label,
          x: labelX,
          y: labelY,
          fill: (shape == "arrow_with_text") ?  "black" : "white"
        });
      }
      if (this.isVertical) {
        y += parseInt(styleAttr.height);
      } else {
        x += parseInt(styleAttr.width);
      }

      // draw arrow between rect and rect
      if (i != layers.length - 1 && shape == "rect" && nextShape == "rect") {
        const arrowAttr = {
          x: this.isVertical ? x + styleAttr.width / 2: x,
          y: this.isVertical ? y : y + styleAttr.height / 2 
        };
        this._appendShape("arrow", arrowAttr);
        if (this.isVertical) {
          y = y + ARROW_LENGTH;
        } else {
          x = x + ARROW_LENGTH;
        }
      }
    }

    this._insertTo();
    // auto size svg
    const bbox = this.svg.node().getBBox();
    this.svg.attr("width", bbox.x + bbox.width  + "px"); 
    this.svg.attr("height",bbox.y + bbox.height + "px");
  }

  _insertTo() {
    d3.select(this.divName).append(() => {
      return this.svg.node();
    });
  }

  _appendShape(shape, attr = {}) {
    if (!shape) {
      return this;
    }
    switch (shape) {
      case "rect":
        return this.shape.rect(attr);
      case "text":
        return this.shape.text(attr);
      case "arrow":
        return this.shape.arrow(attr);
      case "arrow_with_text":
        let arrowWithTextAttr;
        if (this.isVertical) {
          arrowWithTextAttr = {
            y1: attr.y, 
            y2: attr.y + ARROW_LENGTH / 2,
          }
        } else {
          arrowWithTextAttr = {
            x1: attr.x, 
            x2: attr.x + ARROW_LENGTH / 2,
          }
        }
        
        return this.shape.arrowWithText(arrowWithTextAttr);
      default:
        console.error("unrecognized shape " + shape);
    }
  }
}
