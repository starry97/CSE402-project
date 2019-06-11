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
      const {name, type, subLayers} = layer;
      const attr = {
        ...attributes[type],
        ...attributes[name]
      }
      const {text, shape, ...styleAttr} = attr;
      const divide = subLayers ? subLayers.length : 1;
      let dx = x;

      const width = parseInt(styleAttr.width);
      const height = parseInt(styleAttr.height);
      
      for (let i = 0; i < divide; i++) {
        if (shape === "arrow_with_text") {
          if (this.isVertical) {
            this._appendShape(shape, {x: dx + width / 2, y: y, ...styleAttr});
          } else {
            this._appendShape(shape, {x: dx, y: y + height / 2, ...styleAttr});
          }
        } else {
          this._appendShape(shape, {x: dx, y: y, ...styleAttr});
        }  

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

          const labelX = this.isVertical ? parseInt(styleAttr.width) / 2 : x + parseInt(styleAttr.width) / 2 + TEXT_OFFSET;
          const labelY = this.isVertical ? y + parseInt(styleAttr.height) / 2 + TEXT_OFFSET : parseInt(styleAttr.height) / 2;
          this._appendShape("text", {
            label,
            x: dx + parseInt(styleAttr.width) / 2,
            y: y + parseInt(styleAttr.height) / 2 + TEXT_OFFSET,
            fill: (shape == "arrow_with_text") ?  "black" : "white"
          });
        }
        
        dx += width;
        dx += 20;
      }

      if (this.isVertical) {
        y += height;
      } else {
        x += width;
      }

      // draw arrow between rect and rect
      if (i != layers.length - 1 && shape == "rect" && nextShape == "rect") {
        
        const arrowAttr = {
          x: this.isVertical ? x + styleAttr.width / 2: x,
          y: this.isVertical ? y : y + styleAttr.height / 2 
        };
        dx = x;
        for (let i = 0; i < divide; i++) {
          console.log("dx is " + dx);
          this._appendShape("arrow", {x: dx + parseInt(styleAttr.width) / 2,
                                      y: y});

          dx += parseInt(styleAttr.width);
          dx += 20;
        }
        
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
    this.svg.attr("width", bbox.x + bbox.width + "px"); 
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
        return this.shape.arrowWithText(attr);
      default:
        console.error("unrecognized shape " + shape);
    }
  }
}
