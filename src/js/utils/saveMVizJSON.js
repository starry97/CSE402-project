import { saveAs } from 'file-saver';

export function saveMVizJSON(str) {
  console.log(str);
  const prettifiedJSONStr = JSON.stringify(JSON.parse(str), null, 2);
	const blob = new Blob([prettifiedJSONStr], {type: "application/json"});
	saveAs(blob, 'MViz.json');
};
