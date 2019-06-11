import { DENSE, RECT_ATTR, CONV_2D, MAX_POOLING_2D, ARROW_WITH_TEXT_ATTR, EMBEDDING, LSTM, LAYER_TYPES, NUM_SUBLAYERS, COLORS } from '../utils/constants';

export default class SummaryParser {
    constructor(file) {
        this.file = file;
    }

    parse() {
        let lines = this.file.split('\n');
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
                    model.push(layerJson);
                    existTypes.add(type);
                }      
            });
        }

        let attributes = {};
        let color_theme = {};
        let idx = 0;
        existTypes.forEach(type => {
            color_theme[type] = COLORS[idx];
            idx += 1;
        });

        existTypes.forEach(type => {
            if (type == MAX_POOLING_2D) {
                attributes[type] = JSON.parse(ARROW_WITH_TEXT_ATTR);
            } else {
                attributes[type] = JSON.parse(RECT_ATTR);
            }
            attributes[type].fill = color_theme[type];
        });

        const modelJson = {"layers": model, "attributes": attributes}; 

        console.log(JSON.stringify(modelJson))

        return JSON.stringify(modelJson);
    }
}
