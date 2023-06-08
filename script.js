import { GestureRecognizer, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

window.onload = function(e) {
  let lastGesture = "";
  let lastGestureTime = 0;
  let lastPos = undefined;
  function openPalm(results, nowInMs) {
    if (lastGesture !== 'Open_Palm' || nowInMs - lastGestureTime > 300) {
      console.log(nowInMs + ": Open Palm");
    }
  }
  function pointingUP(results, nowInMs) {
    let indexPos = results.landmarks[0][8];
    // console.log(nowInMs + ": Pointing Up" + " Pos: " + JSON.stringify(indexPos));
    if (lastPos !== undefined) {
      if (indexPos.x - lastPos.x > 0.01) {
        console.log("Moving Left")
      }
      if (indexPos.x - lastPos.x < -0.01) {
        console.log("Moving Right")
      }
    }
    lastPos = indexPos
  }
  function thumbUp(results, nowInMs) {
    if (lastGesture !== 'Thumb_Up' || nowInMs - lastGestureTime > 300) {
      console.log(nowInMs + ": Thumb Up");
    }
  }
  
  function handleGestures(results, nowInMs) {
    if (results.gestures.length > 0) {
      let gesture = results.gestures[0][0].categoryName;
      
      if (gesture === 'Open_Palm') {
        openPalm(results, nowInMs);
      } else if (gesture === 'Pointing_Up') {
        pointingUP(results, nowInMs);
      } else if (gesture === 'Thumb_Up') {
        thumbUp(results, nowInMs);
      } else {
        // console.log(results);
      }
      lastGesture = gesture;
      lastGestureTime = nowInMs;
    }
  }
  
  /* SETUP MEDIAPIPE HOLISTIC INSTANCE */
  let videoElement = document.querySelector(".input_video"),
      guideCanvas = document.querySelector('canvas.guides');
  let gestureRecognizer;
  const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
      gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
              modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
              delegate: "GPU"
          },
          runningMode: 'VIDEO'
      });
  };
  const gestureRecognizerPromise = createGestureRecognizer(); 
  
  let lastVideoTime = -1;
  let results = undefined;

  const drawResults = (results) => {
    guideCanvas.width = videoElement.videoWidth;
    guideCanvas.height = videoElement.videoHeight;
    let canvasCtx = guideCanvas.getContext('2d');
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);
    // Use `Mediapipe` drawing functions
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
              color: "#00FF00",
              lineWidth: 5
          });
          drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }
  }

  // Use `Mediapipe` utils to get camera - lower resolution = higher fps
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await gestureRecognizerPromise;
      let nowInMs = Date.now();
      if (videoElement.currentTime !== lastVideoTime) {
        lastVideoTime = videoElement.currentTime;
        results = gestureRecognizer.recognizeForVideo(videoElement, nowInMs);
      }
      drawResults(results);
      if (results.gestures && results.gestures.length > 0) {
        handleGestures(results, nowInMs);
      }
    },
    width: 640,
    height: 480
  });
  camera.start();
}