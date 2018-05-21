const validColors = ["red", "black", "yellow", "blue", "purple", "green"];
const validShapes = ["circle", "triangle", "square"];

const findColor = inColor => {
  let color = inColor.trim();
  var found = validColors.find(function(element) {
    return element === color;
  });
  return found;
};

const findShape = inShape => {
  let shape = inShape.trim();
  var found = validShapes.find(function(element) {
    return element === shape;
  });
  return found;
};

const valueParser = original => {
  const defObj = {
    type: "circle",
    color: "black"
  };
  const arr = original.split(" ");
  if (arr[0] !== undefined) {
    let rawValue = arr[0].toLowerCase();
    let foundColor = findColor(rawValue);
    if (foundColor !== undefined) {
      defObj.color = foundColor;
    }
    let foundShape = findShape(rawValue);
    if (foundShape !== undefined) {
      defObj.type = foundShape;
    }
  }
  if (arr[1] !== undefined) {
    let rawValue = arr[1].toLowerCase();
    let foundColor = findColor(rawValue);
    if (foundColor !== undefined) {
      defObj.color = foundColor;
    }
    let foundShape = findShape(rawValue);
    if (foundShape !== undefined) {
      defObj.type = foundShape;
    }
  }

  return defObj;
};

module.exports = valueParser;
