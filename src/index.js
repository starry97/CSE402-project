import { handleSummaryFileSelect, handleJSONFileSelect } from './js/utils/handleFile';
import { saveAsPNG } from './js/utils/saveAsPNG';
import { SVG_ID, DEBUG, TEXT_OFFSET, ARROW_OFFSET, LAYER_TYPES, COLORS, LOCAL_STORAGE_KEY } from './js/utils/constants';
import { saveAsSVG } from './js/utils/saveAsSVG';
import { parseJSONToD3Data } from './js/components/parseJSONToD3Data';
import { drawViz } from './js/components/drawViz';
import { saveMVizJSON } from './js/utils/saveMVizJSON';

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
    const downloadJSONButton = document.createElement("button");
    downloadJSONButton.setAttribute("id", "download_json");
    downloadJSONButton.innerHTML = "Download MViz JSON";

    document.getElementById('download_buttons').appendChild(downloadSVGButton);
    document.getElementById('download_buttons').appendChild(downloadPNGButton);
    document.getElementById('download_buttons').appendChild(downloadJSONButton);

    document.getElementById('download_png').addEventListener('click', () => {
      saveAsPNG(document.getElementById(SVG_ID));
    });
    
    document.getElementById('download_svg').addEventListener('click', () => {
      saveAsSVG(document.getElementById(SVG_ID));
    });
    document.getElementById('download_json').addEventListener('click', () => {
      saveMVizJSON(localStorage.getItem(LOCAL_STORAGE_KEY));
    });

    document.getElementById('download_png').classList.add("btn-sm");
    document.getElementById('download_png').classList.add("btn-primary");
    document.getElementById('download_svg').classList.add("btn-sm");
    document.getElementById('download_svg').classList.add("btn-primary");
    document.getElementById('download_json').classList.add("btn-sm");
    document.getElementById('download_json').classList.add("btn-primary");
  }
}

Split(['#one', '#two']).setSizes([25, 70]);

// const data = parseJSONToD3Data('{"layers":[{"name":"dense_1","type":"Dense"},{"name":"dense_2","type":"Dense"}],"attributes":{"dense_1":{"shape":"rect","text":["name"],"fill":"blue","color":"red","x":300,"width":200,"height":50}}}');


// drawViz(data);


