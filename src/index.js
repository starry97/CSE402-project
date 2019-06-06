import {handleFileSelect} from './js/components/handleFile';
import MViz from './js/components/MViz';

document.getElementById('upload_file').addEventListener('change', handleFileSelect, false);



//const testJson = '{"layers":[{"type":"Dense","name":"dense_1"},{"type":"Dense","name":"dense_2"}],"attributes":{"Dense":{"shape":"rect","color":"purple","width":"150","height":"50","text":["name"]}}}';
const testJson = '{"layers":[{"name":"block1_conv1","type":"Conv2D"},{"name":"block1_conv2","type":"Conv2D"},{"name":"block1_pool","type":"MaxPooling2D"},{"name":"block2_conv1","type":"Conv2D"},{"name":"block2_conv2","type":"Conv2D"},{"name":"block2_pool","type":"MaxPooling2D"},{"name":"block3_conv1","type":"Conv2D"},{"name":"block3_conv2","type":"Conv2D"},{"name":"block3_conv3","type":"Conv2D"},{"name":"block3_pool","type":"MaxPooling2D"},{"name":"block4_conv1","type":"Conv2D"},{"name":"block4_conv2","type":"Conv2D"},{"name":"block4_conv3","type":"Conv2D"},{"name":"block4_pool","type":"MaxPooling2D"},{"name":"block5_conv1","type":"Conv2D"},{"name":"block5_conv2","type":"Conv2D"},{"name":"block5_conv3","type":"Conv2D"},{"name":"block5_pool","type":"MaxPooling2D"},{"name":"fc1","type":"Dense"},{"name":"fc2","type":"Dense"},{"name":"predictions","type":"Dense"}],"attributes":{"Conv2D":{"shape":"rect","color":"white","width":"150","height":"50","text":["name"]},"MaxPooling2D":{"shape":"arrow_with_text","color":"black","height":"80","text":["name"]},"Dense":{"shape":"rect","color":"white","width":"150","height":"50","text":["name"]}}}'

new MViz(testJson).draw();