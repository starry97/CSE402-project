import { ARROW_LENGTH, DIR_R, DIR_D, NUM_SUBLAYERS, SVG_Y_OFFSET, SVG_X_OFFSET } from '../utils/constants';

export function parseJSONToD3Data(jsonStr) {
  const jsonObj = JSON.parse(jsonStr);
  const {layers, attributes} = jsonObj;
  const result = {
    nodes: [],
    links: []
  };
  
  let y = SVG_Y_OFFSET;
  let x = SVG_X_OFFSET;
  let hasSub = false;
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const {name, type, subLayers} = layer;
    
    
    const attr = {
      ...attributes[type],
      ...attributes[name]
    }
    // don't include text in attr
    let {text, ...styleAttr} = attr;
    // default text is its name
    text = text || ["name"]
    // default shape is rect
    const shape = attr.shape || "rect";

    if (subLayers) {
      hasSub = true;
    }

    if (hasSub && !subLayers) {
      x = (getDefaultAttr(shape).width + ARROW_LENGTH) * (NUM_SUBLAYERS - 1);
    }
    

    const divide = subLayers ? subLayers.length : 1;
    const connection = layer.connection;
    let dx = 0;

    for (let j = 0; j < divide; j++) {
      const label = getLabel(layer, text, subLayers, j);
      if (shape == "rect") {
        result.nodes.push({
          ...getDefaultAttr(shape),
          name: layer.name,
          x: x + dx,
          y,
          label,
          ...styleAttr,
          ...layer,
        });
      } else if (shape == "text") {
        result.nodes.push({
          ...getDefaultAttr(shape),
          x: x + dx,
          y,
          label,
          ...styleAttr,
          ...layer,
        });
      }

      if (subLayers && connection > 0) {
        if (j != subLayers.length - 1) {
          result.links.push({
            source: subLayers[j],
            destination: subLayers[j + 1],
            dir: DIR_R
          });
        }
      }

      if (i != layers.length - 1) {
          const nextLayer = layers[i + 1];
          // draw text shape as a text in front of a small white rect.
          if (subLayers && !nextLayer.subLayers) {
            // default subLayers to no sublayers, the next layer 
            // will be connected and located under the last sublayer
            if (j == subLayers.length - 1) {
              result.links.push({
                source: subLayers ? subLayers[j] : name,
                destination: nextLayer.name,
                dir: DIR_D
              });
            }
          } else {
            result.links.push({
              source: subLayers ? subLayers[j] : name,
              destination: nextLayer.subLayers ? nextLayer.subLayers[j] : nextLayer.name,
              dir: DIR_D
            });
          }
      }
      dx += getDefaultAttr(shape).width + ARROW_LENGTH;
    }

    y += getDefaultAttr(shape).height + ARROW_LENGTH;
  }
  //console.log(JSON.stringify(result));
  return JSON.stringify(result);
}


function getLabel(layer, text, subLayers, subIdx) {
  let label = ""
  if (!text) {
    return;
  }
  for (let i = 0; i < text.length; i++) {
    if (text[i] == "name" && subLayers) {
      label += subLayers[subIdx];
    } else {
      label += layer[text[i]];
    }
  }
  return label;
}

function getDefaultAttr(shape) {
  switch (shape) {
    case undefined:
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