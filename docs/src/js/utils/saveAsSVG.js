import { getSVGString } from "./saveAsPNG";
import { saveAs } from 'file-saver';

export function saveAsSVG(svgNode) {
	const svgString = getSVGString(svgNode);
	console.log(svgString);
	const blob = new Blob([svgString], {type: "image/svg+xml"});
	saveAs(blob, 'MViz.svg');
};