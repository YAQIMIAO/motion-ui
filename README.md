# motion-ui  
Prototype of motion control UI using webcam in a browser

## Overview  
Motion Virtual Capture is a prototype framework for defining user interfaces in VR through facial and hand tracking. This open-source project aims to bridge the existing gap in the market, facilitating a wider and more effective use of VR technologies, enhancing user immersion and interaction within the virtual environment.

The project's primary objective is to explore the potential of using face and hand tracking to enhance the UI definition in VR. We have developed a prototype framework that accurately captures and tracks facial expressions and hand gestures, and it establishes a standard interface for some common user interactions. 

Our prototype has been deployed in a VR game titled "Draw the Joker". You can find the game project [here](https://github.com/YAQIMIAO/draw-the-joker)

## Live Demo
See the live demo here: [https://motion-virutal-capture-prototype.glitch.me/](https://motion-virutal-capture-prototype.glitch.me/)

## Features

Our prototype framework captures and tracks facial expressions and hand gestures via a webcam. It interfaces seamlessly with existing VR hardware and software solutions. It has gesture recognition feature utilizes a two-step neural network pipeline:

1. An Embedding model - The "landmark model" is responsible for the detection of hands and outlining their geometric configurations.
2. A Classification model - The "gesture recognition model" discerns various gestures based on the outlined hand geometry.

The prototype includes UI controls for three gesture interfaces which can be extended to suit your applications:

1. Open Palm
2. Thumb Up
3. Pointing Up

## API Usage

```javascript
// Open Palm function 
function openPalm(results, nowInMs) {
  if (lastGesture !== 'Open_Palm' || nowInMs - lastGestureTime > 300) {
    console.log(nowInMs + ": Open Palm");
  }
  // Your code here
}

// Thumb Up function
function thumbUp(results, nowInMs) {
  // Your code here
}

// Pointing Up function
function pointingUp(results, nowInMs) {
  // Your code here
}
```

These functions are called when the respective gesture is detected. You can modify and extend these functions to suit your own applications.

## Getting Started

1. Clone this repo
```
git clone https://github.com/yourgithubusername/motion-virtual-capture.git
```
2. In script.js add your UI logic to the event listeners
3. Build your next web app with VR controls!

## Contributing
We welcome contributions! Please feel free to contact us at fooloo@live.com if you have questions and suggestions, or are interested in contributing to this project. 
