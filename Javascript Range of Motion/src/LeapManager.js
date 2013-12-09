var LeapManager = {
  controller: undefined,
  aframe: undefined,
  frameCount: 0,
  capture: 0,
  min: 0,
  max: 0,

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
      if(LeapManager.capture){
        console.log("Frame: " + frame.id);
      }
      aframe = frame;
    });

      controller.connect();
  },
  startCapture: function () {
    console.log("Start Capture");
    LeapManager.capture = 1;
    setTimeout(this.stopCapture,3000);
  },
  stopCapture: function () {
    LeapManager.capture = 0;
    console.log("Stop Capture");
  },
}

/*var controller = new Leap.Controller();
var dif = 0;
var start = 0;
var min = 0;
var max = 0;
controller.on( 'frame' , function(frame){
  if(frame.hands.length > 0){
    if(frame.hands[0].fingers.length > 0){
      if(min == 0){
        min = frame.hands[0].fingers[0].tipPosition[1];
        max = frame.hands[0].fingers[0].tipPosition[1];
      }
      if(min > frame.hands[0].fingers[0].tipPosition[1]){
        min = frame.hands[0].fingers[0].tipPosition[1];
      }
      if(max < frame.hands[0].fingers[0].tipPosition[1]){
        max = frame.hands[0].fingers[0].tipPosition[1];
      }
      dif = max - min;
      //console.log("HandMovement: " + frame.hands[0].translation(frame.id-2));
      console.log("Dif: " + dif + " Min: " +  min + " Max: "  + max);
    }
  }
});
controller.connect();
*/