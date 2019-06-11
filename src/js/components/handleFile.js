import SummaryParser from './SummaryParser';
import MViz from './MViz';
import { VIZ_CONTAINER } from '../utils/constants';

export function handleSummaryFileSelect(evt) {
  const f = evt.target.files[0]; 
  if (f) {
    const r = new FileReader();
    r.onloadend = function(e) { 
      const content = e.target.result;
      const sp = new SummaryParser(content);
      const json = sp.parse();
      new MViz(json, "#" + VIZ_CONTAINER, true).draw();
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
      new MViz(content, "#" + VIZ_CONTAINER, true).draw();
    }
    r.readAsText(f);
  } else {
    throw new Error("Cannot read file");
  } 
}
  