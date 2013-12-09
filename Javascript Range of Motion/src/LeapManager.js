var LeapManager = {

  results:undefined,

  controller: undefined,
  aframe: undefined,
  frameCount: 0,
  capture: 0,
  calibrate: 0,
  min: 0,
  max: 0,
  dif: 0,
  basePlane: 0,
  fingerJoint: 0,
  stable: 0,

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

      if(LeapManager.calibrate){
        if(aframe.hands.length > 0){
          if(aframe.hands[0].fingers.length > 0){
            var difference = aframe.hands[0].palmPosition[1] - aframe.hands[0].fingers[0].tipPosition[1];
            if(difference > -5 && difference < 5){
              basePlane = aframe.hands[0].fingers[0].tipPosition[1];
              fingerJoint = aframe.hands[0].fingers[0].tipPosition[1] - aframe.hands[0].fingers[0].length;
              console.log("stable");
              LeapManager.stopCalibration();
              LeapManager.startCapture();
            }
          }
        }
      }

      aframe = frame;
    });

      LeapManager.controller.connect();
  },
  startCapture: function () {
    console.log("Start Capture");
    LeapManager.capture = 1;
    timer = setInterval(LeapManager.countCapture,1000);
  },
  countCapture: function () {
    if(tcount < 0){
      LeapManager.stopCapture();
    }else{
      document.getElementById("Timer").innerHTML=tcount--;
    }
  },
  stopCapture: function () {
    console.log("Stop Capture");
    console.log("Difference: " + LeapManager.dif);

    clearInterval(timer);
    tcount = 10;

    LeapManager.results[LeapManager.results.length] = LeapManager.dif;

    LeapManager.capture = 0;
    LeapManager.min = 0;
    LeapManager.max = 0;
    LeapManager.dif = 0;
    console.log(LeapManager.results);
  },

  startCalibration: function(){
    console.log("Start Calibration");

    LeapManager.calibrate = 1;
    timer = setInterval(LeapManager.countCalibration,1000);
  },
  countCalibration: function () {
    if(tcount < 0){
      LeapManager.stopCalibration();
    }else{
      document.getElementById("Timer").innerHTML=tcount--;
    }
  },
  stopCalibration: function(){
    console.log("Stop Calibration");
    clearInterval(timer);
    tcount = 10;
    LeapManager.calibrate = 0;
  },

  setZeroPlane: function() {
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