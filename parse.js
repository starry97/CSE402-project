function parseFile(inputFile, outputFile) {
    const JSONP_EXT = 'callbackFnc'

    // layer types
    const DENSE_TYPE = 'Dense'
    const CONV_TYPE = 'Conv2D'
    const MAX_POOL_TYPE = 'MaxPooling2D'
    const LAYER_TYPES = [DENSE_TYPE, CONV_TYPE, MAX_POOL_TYPE]

    const fs = require('fs')

    let model = []

    fs.readFile(inputFile, (err, data) => {
        if (err) throw err; 

        let lines = data.toString().split('\n');
        for(let i = 0; i < lines.length; i++){
            let line = lines[i];
            LAYER_TYPES.forEach(type => {
                if (line.includes(type)) {
                    model.push(type);
                }
            });
        }

        const modelJson = {"model":model};
        console.log(JSON.stringify(modelJson));

        var fs = require('fs');
        fs.writeFile(outputFile, JSONP_EXT + '(' + JSON.stringify(modelJson) + ')', function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

//parseFile("simple.txt", "simple.json");
parseFile("vgg.txt", "vgg.json");

