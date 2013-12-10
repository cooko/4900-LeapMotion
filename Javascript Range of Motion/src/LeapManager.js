var LeapManager = {

  controller: undefined,

  curMax: undefined,


  init: function () {
    LeapManager.controller = new Leap.Controller();
    
    LeapManager.curMax = new Array();

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
      for(var i = 0; i < frame.hands.length; i++){
        for(var j = 0; i < frame.hands[i].fingers.length; j++){
          var angle = LeapManager.getAngle(frame, i, j);
          LeapManager.curMax[i][j] = angle;
        }
      }
      /*if(frame.hands.length > 0){
        if(frame.hands[0].fingers.length > 0){
          var angle = LeapManager.getAngle(frame);
          if(angle > LeapManager.curMax){
            LeapManager.curMax = angle;
          }
        }
        console.log(LeapManager.curMax);
      }*/
    });

    LeapManager.controller.connect();
  },
  getAngle: function(frame, hand, finger){
    var x = frame.hands[hand].fingers[finger].tipPosition[2] - frame.hands[hand].palmPosition[2];
    var y = frame.hands[hand].fingers[finger].tipPosition[1] - frame.hands[hand].palmPosition[1];
    var angle = Math.atan2(y,x);
    if(angle > 0){
      angle = 180 - angle*(180/Math.PI)
    }else{
      angle = 180 + angle*(180/Math.PI)
    }
    return angle;
  }
}