import {handleFileSelect} from './js/components/handleFile';
import { saveAsPNG } from './js/utils/saveAsPNG';
import { SVG_ID, DEBUG } from './js/utils/constants';
import { saveAsSVG } from './js/utils/saveAsSVG';
import MViz from './js/components/MViz';

// for debugging
if (DEBUG) {
  const json = '{"layers":[{"name":"embedding_1","type":"Embedding","subLayers":["embedding_1_1","embedding_1_2","embedding_1_3","embedding_1_4"]},{"name":"lstm_1","type":"LSTM","subLayers":["lstm_1_1","lstm_1_2","lstm_1_3","lstm_1_4"]},{"name":"dense_1","type":"Dense"}],"attributes":{"Embedding":{"shape":"rect","fill":"d3.rgb(255, 245, 236)","width":"150","height":"50","text":["type"]},"LSTM":{"shape":"rect","fill":{"r":253,"g":186,"b":134,"opacity":1},"width":"150","height":"50","text":["type"]},"Dense":{"shape":"rect","fill":{"r":219,"g":86,"b":12,"opacity":1},"width":"150","height":"50","text":["type"]}}}';
  const mv = new MViz(json);
  mv.draw();
}

document.getElementById('upload_file').addEventListener('change', (evt) => {
  handleFileSelect(evt);
  document.getElementById('viz_container').innerHTML = "";
  if (!document.getElementById('download_buttons').innerHTML) {
    const downloadSVGButton = document.createElement("button");
    downloadSVGButton.setAttribute("id", "download_svg");
    downloadSVGButton.innerHTML = "Download as SVG";
    const downloadPNGButton = document.createElement("button");
    downloadPNGButton.setAttribute("id", "download_png");
    downloadPNGButton.innerHTML = "Download as PNG";
    document.getElementById('download_buttons').appendChild(downloadSVGButton);
    document.getElementById('download_buttons').appendChild(downloadPNGButton);
    document.getElementById('download_png').addEventListener('click', () => {
      saveAsPNG(document.getElementById(SVG_ID));
    });
    
    document.getElementById('download_svg').addEventListener('click', () => {
      saveAsSVG(document.getElementById(SVG_ID));
    });
  }
});

