import SummaryParser from './SummaryParser';
import MViz from './MViz';

export function handleFileSelect(evt) {
    const f = evt.target.files[0]; 
    if (f) {
      const r = new FileReader();
      r.onloadend = function(e) { 
        const content = e.target.result;
        const sp = new SummaryParser(content);
        const json = sp.parse();
        const mViz = new MViz(json);
      }
      r.readAsText(f);
    } else {
      throw new Error("Cannot read file");
    } 
  }
  