import { VIZ_CONTAINER } from './constants';
import { parseSummaryToJSON } from '../components/parseSummaryToJSON';
import { drawViz } from '../components/NewMViz';
import { parseJSONToD3Data } from '../components/parseJSONToD3Data';

export function handleSummaryFileSelect(evt) {
  const f = evt.target.files[0]; 
  if (f) {
    const r = new FileReader();
    r.onloadend = function(e) { 
      const content = e.target.result;
      const json = parseSummaryToJSON(content);
      const d3Data = parseJSONToD3Data(json);
      console.log(d3Data);
      drawViz(d3Data, "#" + VIZ_CONTAINER);
    }
    r.readAsText(f);
  } else {
    throw new Error("Cannot read file");
  } 
}

export function handleJSONFileSelect(evt) {
  const f = evt.target.files[0]; 
  if (f) {
    const r = new FileReader();
    r.onloadend = function(e) { 
      const content = e.target.result;
      const d3Data = parseJSONToD3Data(content);
      drawViz(d3Data, "#" + VIZ_CONTAINER);
    }
    r.readAsText(f);
  } else {
    throw new Error("Cannot read file");
  } 
}
  