import { RECT_ATTR, MAX_POOLING_2D, ARROW_WITH_TEXT_ATTR, EMBEDDING, LSTM, LAYER_TYPES, NUM_SUBLAYERS, COLORS, ARROW_WITH_TEXT } from '../utils/constants';

export function parseSummaryToJSON(data) {
  let lines = data.split('\n');
  let model = []
  let existTypes = new Set();
  for(let i = 0; i < lines.length; i++) {
      let line = lines[i];
      LAYER_TYPES.forEach(type => {
          const lineAttrs = line.split(/\s+/);
          const layerName = lineAttrs[0];
          if (line.includes(type)) {
              let layerJson = {"name": layerName, "type": type};

              if (type == EMBEDDING || type == LSTM) {
                  let subLayers = [];
                  for (let j = 1; j <= NUM_SUBLAYERS; j++) {
                      subLayers.push(layerName + "_" + j);
                  }
                  layerJson["subLayers"] = subLayers;
              }
              if (type == LSTM) {
                layerJson["connection"] = 1;
              } else {
                layerJson["connection"] = 0;
              }
              model.push(layerJson);
              existTypes.add(type);
          }      
      });
  }

  let attributes = {};

  existTypes.forEach(type => {
    const shape = type == MAX_POOLING_2D ? "text" : "rect"
    attributes[type] = {
      shape,
      text: ["name"]
    }
  });

  const modelJson = {"layers": model, "attributes": attributes}; 

  console.log(JSON.stringify(modelJson))
  return JSON.stringify(modelJson);
}
