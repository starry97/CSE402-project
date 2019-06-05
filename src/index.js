import {handleFileSelect} from './js/components/handleFile';
import MViz from './js/components/MViz';

document.getElementById('upload_file').addEventListener('change', handleFileSelect, false);



const testJson = '{"layers":[{"type":"Dense","name":"dense_1"},{"type":"Dense","name":"dense_2"}],"attributes":{"Dense":{"shape":"rect","color":"white","width":"150px","height":"50px","text":["name"]}}}';

new MViz(testJson).draw();