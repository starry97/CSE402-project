import { ARROW_LENGTH } from '../utils/constants';

export function parseJSONToD3Data(jsonStr) {
  const jsonObj = JSON.parse(jsonStr);
  const {layers, attributes} = jsonObj;
  const result = {
    nodes: [],
    links: []
  };
  
  let y = 0;
  let x = 0;
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const {name, type} = layer;
    let nextLayer, nextType, nextShape;
    if (i != layers.length - 1) {
      nextLayer = layers[i + 1];
      nextType = nextLayer["type"];
      nextShape = attributes[nextType]["shape"];
    }
    
    const attr = {
      ...attributes[type],
      ...attributes[name]
    }
    // don't include text in attr
    const {text, ...styleAttr} = attr;
    const {shape} = attr;
    const label = getLabel(layer, text);

    if (shape == "rect") {
      result.nodes.push({
        ...getDefaultAttr(shape),
        x,
        y,
        label,
        ...styleAttr,
        ...layer,
      });
    } else if (shape == "text") {
      result.nodes.push({
        ...getDefaultAttr(shape),
        x,
        y,
        label,
        ...styleAttr,
        ...layer,
      });
    }
    

    if (i != layers.length - 1) {      
      if (nextShape == "rect" || nextShape == "text") {
        // draw text shape as a text in front of a small white rect.
        result.links.push({
          source: name,
          destination: nextLayer.name
        });
        y += ARROW_LENGTH;
      }
    }
  }
  console.log(JSON.stringify(result));
  return JSON.stringify(result);
}


function getLabel(layer, text) {
  let label = ""
  if (!text) {
    return;
  }
  for (let i = 0; i < text.length; i++) {
    label += layer[text[i]];
  }
  return label;
}

function getDefaultAttr(shape) {
  switch (shape) {
    case "rect":
      return {
        "x": 0,
        "y": 0,
        "width": 150,
        "height": 50,
      }
    case "text":
      return {
        "x": 0,
        "y": 0,
        "width": 150,
        "height": 20,
      }
    default:
      throw new Error("unknown shape " + shape);
  }
}