import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

export const DEBUG = true;

// constants for parsing summary files
export const DENSE = 'Dense';
export const CONV_2D = 'Conv2D';
export const LSTM = 'LSTM';
export const EMBEDDING = 'Embedding';
export const MAX_POOLING_2D = 'MaxPooling2D';
export const SVG_ID = "__svg";
export const LAYER_TYPES = [DENSE, CONV_2D, LSTM, EMBEDDING, MAX_POOLING_2D]
export const NUM_SUBLAYERS = 4;

export const RECT_ATTR = '{"shape": "rect", \
                            "fill": "white", \
                            "width": "150", \
                            "height": "50", \
                            "text": ["type"]}'

export const ARROW_WITH_TEXT_ATTR = '{"shape": "arrow_with_text", \
                            "fill": "black", \
                            "height": "80", \
                            "width": "150", \
                            "text": ["type"]}'

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
 height: 80,
 width: 150
}

