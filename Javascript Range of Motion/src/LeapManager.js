var LeapManager = {
  controller: undefined,
  aframe: undefined,
  frameCount: 0,
  capture: 0,
  min: 0,
  max: 0,
  dif: 0,

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
        if(frame.hands.length > 0){
          if(frame.hands[0].fingers.length > 0){
            if(LeapManager.min == 0){
              LeapManager.min = frame.hands[0].fingers[0].tipPosition[1];
              LeapManager.max = frame.hands[0].fingers[0].tipPosition[1];
            }
            if(LeapManager.min > frame.hands[0].fingers[0].tipPosition[1]){
              LeapManager.min = frame.hands[0].fingers[0].tipPosition[1];
            }
            if(LeapManager.max < frame.hands[0].fingers[0].tipPosition[1]){
              LeapManager.max = frame.hands[0].fingers[0].tipPosition[1];
            }
            LeapManager.dif = LeapManager.max - LeapManager.min;
            //console.log("HandMovement: " + frame.hands[0].translation(frame.id-2));
            //console.log("Dif: " + LeapManager.dif + " Min: " +  LeapManager.min + " Max: "  + LeapManager.max);
          }
        }
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
    console.log("Stop Capture");
    console.log("Difference: " + LeapManager.dif);
    LeapManager.capture = 0;
    LeapManager.min = 0;
    LeapManager.max = 0;
    LeapManager.dif = 0;
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