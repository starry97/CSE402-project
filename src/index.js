import {handleFileSelect} from './js/components/handleFile';
import MViz from './js/components/MViz';
import { saveAsPNG } from './js/utils/saveAsPNG';
import { SVG_ID } from './js/utils/constants';
import { saveAsSVG } from './js/utils/saveAsSVG';

document.getElementById('upload_file').addEventListener('change', handleFileSelect);
document.getElementById('download_png').addEventListener('click', () => {
  saveAsPNG(document.getElementById(SVG_ID));
});

document.getElementById('download_svg').addEventListener('click', () => {
  saveAsSVG(document.getElementById(SVG_ID));
});

const testJson = '{"layers":[{"type":"Dense","name":"dense_1"},{"type":"Dense","name":"dense_2"}],"attributes":{"Dense":{"shape":"rect","color":"white","width":"150","height":"50","text":["name"]}}}';

new MViz(testJson).draw();