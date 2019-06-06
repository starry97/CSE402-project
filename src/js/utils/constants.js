export const DENSE = 'Dense';
export const CONV_2D = 'Conv2D';
export const MAX_POOLING_2D = 'MaxPooling2D';
export const SVG_ID = "__svg";

export const RECT_ATTR = '{"shape": "rect", \
                            "color": "white", \
                            "width": "150px", \
                            "height": "50px", \
                            "text": ["name"]}'

// default attributes 
const width = 150;
const height = 50;

export const DEFAULT_RECT_ATTRIBUTES = {
  x: 0,
  y: 0,
  width,
  height,
  stroke: "black",
  fill: "white"
}

export const ARROW_LENGTH = 100;
export const DEFAULT_ARROW_ATTRIBUTES = {
  x1: width / 2,
  x2: width / 2,
  y1: height,
  y2: height + ARROW_LENGTH,
}

export const DEFAULT_TEXT_ATTRIBUTES = {
  x: width / 2,
  y: height / 2,
  fill: "black",
  textAnchor: "middle"
}


