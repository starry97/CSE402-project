import { handleSummaryFileSelect, handleJSONFileSelect } from './js/utils/handleFile';
import { saveAsPNG } from './js/utils/saveAsPNG';
import { SVG_ID, DEBUG, TEXT_OFFSET, ARROW_OFFSET, LAYER_TYPES, COLORS } from './js/utils/constants';
import { saveAsSVG } from './js/utils/saveAsSVG';
import { parseJSONToD3Data } from './js/components/parseJSONToD3Data';

// for debugging
// if (DEBUG) {
//   const json = DEBUG_JSON;
//   const mv = new MViz(json);
//   mv.draw();
// }


document.getElementById('upload_summary_file').addEventListener('change', (evt) => {
  handleSummaryFileSelect(evt);
  addButtons();
});

document.getElementById('upload_json_file').addEventListener('change', (evt) => {
  handleJSONFileSelect(evt);
  addButtons();
})

function addButtons() {
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
    document.getElementById('download_png').classList.add("btn-sm");
    document.getElementById('download_png').classList.add("btn-primary");
    document.getElementById('download_svg').classList.add("btn-sm");
    document.getElementById('download_svg').classList.add("btn-primary");
  }
}

Split(['#one', '#two']).setSizes([25, 70]);

const data = JSON.parse(parseJSONToD3Data('{"layers":[{"name":"block1_conv1","type":"Conv2D"},{"name":"block1_conv2","type":"Conv2D"},{"name":"block1_pool","type":"MaxPooling2D"},{"name":"block2_conv1","type":"Conv2D"},{"name":"block2_conv2","type":"Conv2D"},{"name":"block2_pool","type":"MaxPooling2D"},{"name":"block3_conv1","type":"Conv2D"},{"name":"block3_conv2","type":"Conv2D"},{"name":"block3_conv3","type":"Conv2D"},{"name":"block3_pool","type":"MaxPooling2D"},{"name":"block4_conv1","type":"Conv2D"},{"name":"block4_conv2","type":"Conv2D"},{"name":"block4_conv3","type":"Conv2D"},{"name":"block4_pool","type":"MaxPooling2D"},{"name":"block5_conv1","type":"Conv2D"},{"name":"block5_conv2","type":"Conv2D"},{"name":"block5_conv3","type":"Conv2D"},{"name":"block5_pool","type":"MaxPooling2D"},{"name":"fc1","type":"Dense"},{"name":"fc2","type":"Dense"},{"name":"predictions","type":"Dense"}],"attributes":{"Conv2D":{"shape":"rect","text":["name"]},"MaxPooling2D":{"shape":"text","text":["name"]},"Dense":{"shape":"rect","text":["name"]}}}'));
// main(data);

