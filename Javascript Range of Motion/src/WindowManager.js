var WindowManager = {
	canvas: undefined,
	context: undefined,

	init: function(){
		InputManager.init();

		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		this.drawGUI();
	},
	drawGUI: function(){
		//this.context.fillText("y", 10, 10);
	},
}