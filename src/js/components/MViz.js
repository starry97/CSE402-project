import { ARROW_LENGTH, TEXT_OFFSET, TEXT_HEIGHT, SVG_ID } from "../utils/constants";
import { Shape } from "./drawShape"; 

export default class MViz {
  constructor(json = "{}", divName) {
    this.parsedJSON = JSON.parse(json);
    this.svg = d3.select(document.createElementNS(d3.namespaces.svg, 'svg'))
                .attr("id", SVG_ID);
    this.divName = divName;
    this.shape = new Shape(this.svg);
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
      const {name, type, subLayers} = layer;
      const attr = {
        ...attributes[name],
        ...attributes[type]
      }
      const {text, shape, ...styleAttr} = attr;
      const divide = subLayers ? subLayers.length : 1;
      let dx = x;

      console.log("divide is " + divide);

      for (let i = 0; i < divide; i++) {
        this._appendShape(shape, {x: dx, y: y, ...styleAttr});

        // draw label on current shape 
        if (text) {
          let label = ""
          for (let i = 0; i < text.length; i++) {
            if (text[i] == "subLayers") {
              label += subLayers[i];
            } else {
              label += layer[text[i]];
            }
          }

          this._appendShape("text", {
            label,
            x: dx + parseInt(styleAttr.width) / 2,
            y: y + parseInt(styleAttr.height) / 2 + TEXT_OFFSET,
            fill: (shape == "arrow_with_text") ?  "black" : "white"
          });
        }

        dx += parseInt(styleAttr.width);
        dx += 20;
      }

      y += parseInt(styleAttr.height);

      // draw arrow between rect and rect
      if (i != layers.length - 1 && shape == "rect" && nextShape == "rect") {
        dx = x;
        for (let i = 0; i < divide; i++) {
          console.log("dx is " + dx);
          this._appendShape("arrow", {x: dx + parseInt(styleAttr.width) / 2,
                                      y: y});

          dx += parseInt(styleAttr.width);
          dx += 20;
        }
        
        y = y + ARROW_LENGTH;
      }
      
    }
    this._insertTo("#viz_container");

    const bbox = this.svg.node().getBBox();
    this.svg.attr("width", bbox.x + bbox.width + "px"); 
    this.svg.attr("height",bbox.y + bbox.height + "px");
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
        return this.shape.rect(attr);
      case "text":
        return this.shape.text(attr);
      case "arrow":
        const arrowAttr = {
          x1: attr.x,
          x2: attr.x,
          y1: attr.y,
          y2: attr.y + ARROW_LENGTH
        }
        return this.shape.arrow(arrowAttr);
      case "arrow_with_text":
        const arrowWithTextAttr = {
          y1: attr.y, 
          y2: attr.y + ARROW_LENGTH / 2,
          y3: attr.y + ARROW_LENGTH / 2 + TEXT_HEIGHT,
          y4: attr.y + ARROW_LENGTH + TEXT_HEIGHT
        }
        return this.shape.arrowWithText(arrowWithTextAttr);
      default:
        console.error("unrecognized shape " + shape);
    }
  }
}
