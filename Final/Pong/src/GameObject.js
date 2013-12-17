// A base GameObject class that other classes will inherit from.
// Note the syntax on the prototype functions below.

// When a child class calls the 'draw' function, it will first check its
// own prototype to check for an existing 'draw' function. If it cannot find it,
// It will check the prototype of its parent class (in this case GameObject), and
// use the parent function instead.

var GameObject = function (x, y) {
	// The coordinates of the GameObject in respect to the canvas.
	this.x = x;
	this.y = y;
}

// A blank stub which should be overridden by a child class.
// Contains the logic for drawing the object to the given context.
GameObject.prototype.draw = function (context) {
	// If the child class has no draw function, draw a red square.
	context.fillStyle = 'red';
	context.fillRect(this.x, this.y, 16, 16);
}

// A blank stub which should be overridden by a child class.
// Contains the logic for updating the coordinates of the
// GameObject based on player input.
GameObject.prototype.update = function () {
}