import { DENSE } from '../utils/constants';

export default class SummaryParser {
    constructor(file) {
        this.file = file;
    }

    parse() {
        let lines = this.file.split('\n');
        for(let i = 0; i < lines.length; i++) {
            let line = lines[i];
            [DENSE].forEach(type => {
                if (line.includes(type)) {
                    model.push(type);
                }
            });
        }
        return lines;
    }
}
