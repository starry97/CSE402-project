export const DENSE = 'Dense';
export const CONV_2D = 'Conv2D';
export const MAX_POOLING_2D = 'MaxPooling2D';

export const RECT_ATTR = '{"shape": "rect", \
                            "color": "white", \
                            "width": "150", \
                            "height": "50", \
                            "text": ["name"]}'

export const ARROW_WITH_TEXT_ATTR = '{"shape": "arrow_with_text", \
                            "color": "black", \
                            "height": "80", \
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
  fill: "purple"
}

export const ARROW_LENGTH = 75;
export const DEFAULT_ARROW_ATTRIBUTES = {
  x1: width / 2,
  x2: width / 2,
  y1: height,
  y2: height + ARROW_LENGTH,
}

export const TEXT_OFFSET = 2;
export const ARROW_OFFSET = 5;
export const TEXT_HEIGHT = 10;

export const DEFAULT_TEXT_ATTRIBUTES = {
  x: width / 2,
  y: height / 2 + TEXT_OFFSET,
  fill: "white",
  textAnchor: "middle"
}

export const DEFAULT_ARROW_WITH_TEXT_ATTRIBUTES = {
 x1: width / 2,
 x2: width / 2,
 y1: height,
 y2: height + ARROW_LENGTH,
 y3: height,
 y4: height + ARROW_LENGTH,
 height: 80
}

