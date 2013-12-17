var LeapManager = {

	rightPos: 0,
	leftPos: 0,

	init: function () {
		controller = new Leap.Controller();

		controller.on('connect', function() {
		  console.log("Successfully connected.");
		});

		controller.on('deviceConnected', function() {
		  console.log("A Leap device has been connected.");
		});

		controller.on('deviceDisconnected', function() {
		  console.log("A Leap device has been disconnected.");
		});
	    controller.on( 'frame' , function(frame){
	    	if(frame.hands.length == 1){
	    		var pos = LeapManager.leapToScene(frame,frame.hands[0].palmPosition);
	    		if(frame.hands[0].palmPosition[0] < 0){
	    			LeapManager.rightPos = pos[1];
	    		}else{
	    			LeapManager.leftPos = pos[1];
	    		}
	    	}else if(frame.hands.length == 2){
	    		var pos1 = LeapManager.leapToScene(frame,frame.hands[0].palmPosition);
	    		var pos2 = LeapManager.leapToScene(frame,frame.hands[1].palmPosition);

	    		if(pos1[0] < pos2[0]){
	    			LeapManager.rightPos = pos1[1];
	    			LeapManager.leftPos = pos2[1];
	    		}else{
	    			LeapManager.rightPos = pos2[1];
	    			LeapManager.leftPos = pos1[1];
	    		}
	    	}
	    	//for(var i = 0; i<frame.hands.length; i++){
	    	//	LeapManager.rightPos = pos[1];
	    	//}
	    });
    	controller.connect();
	},
    leapToScene: function( frame , leapPos ){

      // Gets the interaction box of the current frame
      var iBox = frame.interactionBox;

      // Gets the left border and top border of the box
      // In order to convert the position to the proper
      // location for the canvas
      var left = iBox.center[0] - iBox.size[0]/2;
      var top = iBox.center[1] + iBox.size[1]/2;

      // Takes our leap coordinates, and changes them so
      // that the origin is in the top left corner 
      var x = leapPos[0] - left;
      var y = leapPos[1] - top;

      var width = GameManager.canvas.width;
      var height = GameManager.canvas.height;

      // Divides the position by the size of the box
      // so that x and y values will range from 0 to 1
      // as they lay within the interaction box
      x /= iBox.size[0];
      y /= iBox.size[1];

      // Uses the height and width of the canvas to scale
      // the x and y coordinates in a way that they 
      // take up the entire canvas
      x *= width;
      y *= height;

      // Returns the values, making sure to negate the sign 
      // of the y coordinate, because the y basis in canvas 
      // points down instead of up
      return [ x , -y ];

    },
};