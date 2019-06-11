export const DEBUG = false;

// constants for parsing summary files
export const DENSE = 'Dense';
export const CONV_2D = 'Conv2D';
export const LSTM = 'LSTM';
export const EMBEDDING = 'Embedding';
export const MAX_POOLING_2D = 'MaxPooling2D';
export const SVG_ID = "__svg";
export const LAYER_TYPES = [DENSE, CONV_2D, LSTM, EMBEDDING, MAX_POOLING_2D]
export const NUM_SUBLAYERS = 4;
export const VIZ_CONTAINER = "viz_container";
export const ARROW_WITH_TEXT = "arrow_with_text";

export const RECT_ATTR = {
  "shape": "rect",
  "text": ["name"]
};

export const ARROW_WITH_TEXT_ATTR = {
  "shape": "arrow_with_text", 
  "text": ["name"]
};

export const TEXT_OFFSET = 2;
export const ARROW_OFFSET = 5;
export const TEXT_HEIGHT = 10;

// default attributes 
const width = 150;
const height = 50;

// colors
const LIGHT_ORANGE = d3.rgb(255, 245, 236);
const DARK_ORANGE = d3.rgb(253, 186, 134);
const ORANGE = d3.rgb(219, 86, 12);
const GREEN = d3.rgb(101, 131, 46);
const BLUE = d3.rgb(18, 139, 206);
const YELLOW = d3.rgb(253, 181, 7);
const BRIGHT_GREEN = d3.rgb(21, 165, 63);
export const COLORS = [BLUE, GREEN, ORANGE, YELLOW, BRIGHT_GREEN];

export const DEFAULT_RECT_ATTRIBUTES = {
  x: 0,
  y: 0,
  rx: 20,
  ry: 20,
  width,
  height,
  fill: "blue"
}

export const ARROW_LENGTH = 75;

export const DEFAULT_ARROW_ATTRIBUTES = {
  x: width / 2,
  y: height,
  length: ARROW_LENGTH,
  textHeight: 10
}

export const DEFAULT_TEXT_ATTRIBUTES = {
  x: width / 2,
  y: height / 2 + TEXT_OFFSET,
  fill: "white",
  textAnchor: "middle"
}


