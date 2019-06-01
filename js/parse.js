const fs = require("fs");
const fsp = fs.promises;

const DENSE_TYPE = 'Dense'
const LAYER_TYPES = [DENSE_TYPE]

async function getData() {
    const data = await fsp.readFile("simple.txt");
    let lines = data.toString().split('\n');
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        LAYER_TYPES.forEach(type => {
            if (line.includes(type)) {
                model.push(type);
            }
        });
    }
    console.log(data.toString());
    return lines;
}

console.log(await getData());