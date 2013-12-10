/******************************************************************************\
* Copyright (C) 2012-2013 Leap Motion, Inc. All rights reserved.               *
* Leap Motion proprietary and confidential. Not for distribution.              *
* Use subject to the terms of the Leap Motion SDK Agreement available at       *
* https://developer.leapmotion.com/sdk_agreement, or another agreement         *
* between Leap Motion and you, your company or other organization.             *
\******************************************************************************/

#include <windows.h>
#include <iostream>
#include "Leap.h"
using namespace Leap;

Frame lastFrame;

void scrollUp(){
INPUT in;
in.type = INPUT_MOUSE;
in.mi.dx = 0;
in.mi.dy = 0;
in.mi.dwFlags = MOUSEEVENTF_WHEEL;
in.mi.time = 0;
in.mi.dwExtraInfo = 0;
in.mi.mouseData = WHEEL_DELTA;
SendInput(1,&in,sizeof(in));

}

void scrollDown(){
INPUT in;
in.type = INPUT_MOUSE;
in.mi.dx = 0;
in.mi.dy = 0;
in.mi.dwFlags = MOUSEEVENTF_WHEEL;
in.mi.time = 0;
in.mi.dwExtraInfo = 0;
in.mi.mouseData = WHEEL_DELTA*-1;
SendInput(1,&in,sizeof(in));

}

class GestureListener : public Listener {
public:
  virtual void onInit(const Leap::Controller& leap) {
    leap.enableGesture( Leap::Gesture::TYPE_SWIPE );
  }
  virtual void onFrame(const Controller& controller) {
  	const Frame frame = controller.frame();
  	std::cout << "frame";
  	if(frame.hands().count() >= 1){
  		if(frame.hands()[0].fingers().count() > 0){
  			std::cout << frame.hands()[0].fingers()[0].tipPosition()[1] << "\n";
  			if(frame.hands()[0].fingers()[0].tipPosition()[1] > 200){
	  			scrollUp();
  			}else if(frame.hands()[0].fingers()[0].tipPosition()[1] < 70){
  				scrollDown();
  			}
  		}
  	}
  }
};

int main() {
	// Create a sample listener and controller
	GestureListener listener;
	Controller controller;

    controller.setPolicyFlags(Controller::PolicyFlag::POLICY_BACKGROUND_FRAMES);

	// Have the sample listener receive events from the controller
	controller.addListener(listener);

	// Keep this process running until Enter is pressed
	std::cout << "Press Enter to quit..." << std::endl;
	std::cin.get();

	// Remove the sample listener when done
	controller.removeListener(listener);

	return 0;
}
