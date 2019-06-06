import { DENSE, RECT_ATTR, CONV_2D, MAX_POOLING_2D, ARROW_WITH_TEXT_ATTR } from '../utils/constants';

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
            [DENSE, CONV_2D, MAX_POOLING_2D].forEach(type => {
                const lineAttrs = line.split(/\s+/);
                if (line.includes(type)) {
                    const layerJson = {"name": lineAttrs[0], "type": type};
                    model.push(layerJson);
                    existTypes.add(type);
                }
            });
        }

        let attributes = {};
        existTypes.forEach(type => {
            if (type == MAX_POOLING_2D) {
                attributes[type] = JSON.parse(ARROW_WITH_TEXT_ATTR);
            } else {
                attributes[type] = JSON.parse(RECT_ATTR);
            }
        });

        const modelJson = {"layers": model, "attributes": attributes}; 

        console.log(JSON.stringify(modelJson))

        return JSON.stringify(modelJson);
    }
}
