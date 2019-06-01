// layer types
const DENSE_TYPE = 'Dense'
const LAYER_TYPES = [DENSE_TYPE]

const fs = require('fs')

let model = []

fs.readFile('simple.txt', (err, data) => {
    if (err) throw err; 
  
    //console.log(data.toString()); 
    //console.log(data);
    let lines = data.toString().split('\n');
    for(let i = 0; i < lines.length; i++){
        let line = lines[i];
        LAYER_TYPES.forEach(type => {
            if (line.includes(type)) {
                model.push(type);
            }
        });
    }
});

console.log(model);