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

void hitKey(unsigned long character){
	INPUT ip;
	ip.type = INPUT_KEYBOARD;
	ip.ki.wScan = 0; // hardware scan code for key
	ip.ki.time = 0;
	ip.ki.dwExtraInfo = 0;

	// Press the "..." key
	ip.ki.wVk = character; // virtual-key code for the "a" key
	ip.ki.dwFlags = 0; // 0 for key press
	SendInput(1, &ip, sizeof(INPUT));

	// Release the "..." key
	ip.ki.dwFlags = KEYEVENTF_KEYUP; // KEYEVENTF_KEYUP for key release
	SendInput(1, &ip, sizeof(INPUT));
}

class GestureListener : public Listener {
public:
  virtual void onInit(const Leap::Controller& leap) {
    leap.enableGesture( Leap::Gesture::TYPE_SWIPE );
  }
  virtual void onFrame(const Controller& controller) {
  	const Frame frame = controller.frame();
  	const GestureList gestures = frame.gestures();

  	//std::cout << frame.hands().count();
  	//if(gestures.count() > 0 & frame.hands().count() >= 2){
  	
  	if(gestures.count() > 0){
	    if(gestures[0].state() == 1){
	    	if(controller.frame(1).gestures().count() <= 0){
		    	SwipeGesture swipe = gestures[0];
		        std::cout << "Swipe id: " << swipe.id()
		       	  << ", " << swipe.frame()
		          << ", state: " << swipe.state()
		          << ", direction: " << swipe.direction()
		          << ", speed: " << swipe.speed() << std::endl;
		          swipe.direction().x > 0 ? hitKey(0x27) : hitKey(0x25);        		    		
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
