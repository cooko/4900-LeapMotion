var LeapManager = {

  controller: undefined,

  curMax: 0,

  init: function () {
    LeapManager.controller = new Leap.Controller();
    LeapManager.results = new Array();
    LeapManager.controller.on('connect', function() {
      console.log("Successfully connected.");
    });

    LeapManager.controller.on('deviceConnected', function() {
      console.log("A Leap device has been connected.");
    });

    LeapManager.controller.on('deviceDisconnected', function() {
      console.log("A Leap device has been disconnected.");
    });

    LeapManager.controller.on( 'frame' , function(frame){
      if(frame.hands.length > 0){
        if(frame.hands[0].fingers.length > 0){
          var angle = LeapManager.getAngle(frame);
          if(angle > LeapManager.curMax){
            LeapManager.curMax = angle;
          }
        }
        console.log(LeapManager.curMax);
      }
    });

    LeapManager.controller.connect();
  },
  getAngle: function(frame){
    var x = frame.hands[0].fingers[0].tipPosition[2] - frame.hands[0].palmPosition[2];
    var y = frame.hands[0].fingers[0].tipPosition[1] - frame.hands[0].palmPosition[1];
    var angle = Math.atan2(y,x);
    if(angle > 0){
      angle = 180 - angle*(180/Math.PI)
    }else{
      angle = 180 + angle*(180/Math.PI)
    }
    return angle;
  }
}