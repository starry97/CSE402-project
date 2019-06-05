import MViz from "../components/MViz";

export function createMViz(jsonString) {
  const parsedJSON = JSON.parse(jsonString);
  const {layers, attributes} = parsedJSON;
  const mViz = new MViz();
  layers.forEach(layer => {
    const {name, type} = layer;
    const attr = {
      ...attributes[name],
      ...attributes[type]
    }

    console.log(attr);
  });
}

function append(mviz, shape) {
  switch (shape) {
    case "rect":
      return mviz.rect();
    default:
      console.log("unrecognized shape " + shape);
  }
}

