var Ball = function(x, y, hspeed, vspeed) {
	// Call the constructor of the parent class from the scope of this object.
	GameObject.call(this, x, y);

	// The radius of the ball for drawing and collision-checking.
	this.radius = 10;

	// The current speed of the ball.
	this.hspeed = hspeed;
	this.vspeed = vspeed;
}

// Inherits the prototype from GameObject.
Ball.prototype = new GameObject();
Ball.prototype.constructor = Ball;

// By giving a definition to this function, we have overridden the draw
// function in the GameObject class.
Ball.prototype.draw = function (context) {
	context.fillStyle = 'white';
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	context.closePath();
	context.fill();
}

// Moves the ball, bouncing off of paddles and the roof and floor of the canvas.
Ball.prototype.update = function () {
	this.x += this.hspeed;
	this.y += this.vspeed;

	// If the ball is leaving the vertical bounds of the room, reverse its vertical direction.
	if ((this.y + this.radius) > (GameManager.canvas.height - GameManager.borderSize)
		|| (this.y - this.radius) < GameManager.borderSize) {
		this.y -= this.vspeed;
		this.vspeed = -this.vspeed;
	}

	// If there is a paddle in the way of the ball, reverse its horizontal direction.
	// I'm just making the assumption here that the paddles are the last 2 elements
	// in the objects array. Not very good style, but lets do it this way for now to keep it simple.
	if (this.collidingWith(GameManager.objects[1]) || this.collidingWith(GameManager.objects[2])) {
		this.x -= this.hspeed;
		this.hspeed = -this.hspeed;
	}
}

// Returns true if the ball is colliding with the object specified by other.
Ball.prototype.collidingWith = function (other) {
	// Return false if the ball is above or below the other object.
	if ((this.y - this.radius) > (other.y + other.height) || (this.y + this.radius) < other.y) {
		return false;
	}

	var rightSide = this.x + this.radius;
	var leftSide = this.x - this.radius;
	var otherRightSide = other.x + other.width;

	if (this.hspeed > 0 && rightSide > other.x && rightSide < otherRightSide) {
		return true;
	}
	if (this.hspeed < 0 && leftSide < otherRightSide && leftSide > other.x) {
		return true;
	}

	return false;
}