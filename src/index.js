import {handleFileSelect} from './js/components/handleFile';
import { saveAsPNG } from './js/utils/saveAsPNG';
import { SVG_ID } from './js/utils/constants';
import { saveAsSVG } from './js/utils/saveAsSVG';

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

