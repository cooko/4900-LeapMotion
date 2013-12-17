// This syntax allows us to have a static GameManager class. We only ever
// want there to exist one GameManager to control the flow of the game.
// (screen drawing, object movements/collisions, etc.) 

var GameManager = {
	// An array containing all of the GameObjects currently on the screen.
	objects: [],

	// To actually draw to the canvas, we need to get its context.
	// A context is an object that gives us methods to draw to our canvas.
	canvas: undefined,
	context: undefined,

	// The size of the canvas border in pixels. The paddles and ball should not get any
	// closer then this to the edges of the canvas.
	borderSize: 10,
	// Initializes the GameManager and starts the game.
	init: function () {
		InputManager.init();
		LeapManager.init();
		// Load the references to the canvas and its context.
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		this.createObjects();
		this.drawCanvasBg();
		this.drawObjects(); 

		// Start the game loop. 'requestAnimationFrame' runs at 60fps by default.
		window.requestAnimationFrame(this.gameLoop);
	},

	// Creates the objects for the two paddles and the ball.
	createObjects: function () {
		// Create the ball in the middle of the canvas.
		this.objects.push(new Ball(100, this.canvas.height / 2, 3, -3));

		// Create the left paddle.
		this.objects.push(new Paddle(this.borderSize, this.borderSize, eKeys.W, eKeys.S, "right"));

		// Create the right paddle. (Note that paddle width = 20)
		this.objects.push(new Paddle(this.canvas.width - this.borderSize - 20, this.borderSize, eKeys.UP, eKeys.DOWN, "left"));
	},

	// Clears the canvas by redrawing the black background.
	drawCanvasBg: function () {
		this.context.fillStyle = 'black';
		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.context.fillRect(0, 0, canvas.width, canvas.height);
	},

	// Calls the 'update' method for every GameObject.
	updateObjects: function () {
		for (var i = 0; i < this.objects.length; ++i) {
			this.objects[i].update();
		}
	},

	// Calls the 'draw' method for every GameObject.
	drawObjects: function () {
		for (var i = 0; i < this.objects.length; ++i) {
			this.objects[i].draw(this.context);
		}
	},

	// Continuously called 60 times/second to update the game objects and to redraw the screen.
	// 'now' contains a timestamp for the current time which we don't need for this tutorial.
	gameLoop: function (now) {
		// Notice that we specify 'GameManager.gameLoop' instead of 'this.gameLoop'.
		// This is because requestAnimationFrame does not call gameLoop from
		// within the scope of GameManager, so 'this' does not mean GameManager in this case.
		window.requestAnimationFrame(GameManager.gameLoop);

		// Same as before, we must specify GameManager specifically.
		GameManager.drawCanvasBg();
		GameManager.updateObjects();
		GameManager.drawObjects();
	}
}