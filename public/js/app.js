// App to handle interactions with paper.js
// Add the doc event listener to handle events from socket.io
document.addEventListener("msg-evt", function (e) {
    var value = e.detail;
    console.log(value);
    addShapes(value.type.trim(), value.color.trim());
});
// Add the shapes
var addShapes = function (type, color) {
    if (type === 'circle') {
        var circle = circleSymbol(color);
        addSymbol(circle);
    } else if (type === 'triangle') {
        var triangle = triangleSymbol(color);
        addSymbol(triangle);
    } else if (type === 'square') {
        var square = squareSymbol(color);
        addSymbol(square);
    } else {
        console.log('unknown symbol type');
    }
};
// Create a circle symbol
var circleSymbol = function (color) {
    var circle = new Path.Circle({
        center: [0, 0],
        radius: 75,
        fillColor: color,
        strokeColor: 'black'
    });
    return new Symbol(circle);
}
// Create a triangle symbol
var triangleSymbol = function (color) {
    var triangle = new Path.RegularPolygon(new Point(80, 70), 3, 50);
    triangle.fillColor = color;
    triangle.strokeColor = 'black';
    return new Symbol(triangle);
}
// Create a rectangle symbol
var squareSymbol = function (color) {
    var rectangle = new Path.Rectangle({
        point: [75, 75],
        size: [75, 75],
        fillColor: color,
        strokeColor: 'black'
    });
    return new Symbol(rectangle);
}
// Add the shape to the activeLayer
var symbolCount = 1;
var symbolVariable = 10;//change
var addSymbol = function (symbol) {
    // The center position is a random point in the view:
    var center = Point.random() * view.size;
    var placedSymbol = symbol.place(center);
    placedSymbol.scale(symbolCount / symbolVariable);
    if (symbolCount < symbolVariable) {
        symbolCount++;
    } else {
        symbolCount = 1;
    }
};
// The onFrame function is called up to 60 times a second:
function onFrame(event) {
    // Run through the active layer's children list and change
    // the position of the placed symbols:
    var arrLen = project.activeLayer.children.length;
    for (var i = 0; i < arrLen; i++) {
        var item = project.activeLayer.children[i];
        if (item !== undefined) {
            // Move the item 1/50th of its width to the right. This way
            // larger circles move faster than smaller circles:
            item.position.x += item.bounds.width / 20;
            // If the item has left the view on the right, remove it
            if (item.bounds.left > view.size.width) {
                if (arrLen > 100) {
                    var t = item.remove()
                } else {
                    item.position.x = -item.bounds.width;
                }
            }
        }
    }
}
