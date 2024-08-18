let torchOn = false;

const SUPPORTS_MEDIA_DEVICES = "mediaDevices" in navigator;
let isTorchOn = false;
let track = null;

export default function toggleTorch(onOrOff = null) {
  if (!SUPPORTS_MEDIA_DEVICES) {
    console.error("This device does not support media devices or is a mobile device.");
    return;
  }

  if (!track) {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const cameras = devices.filter((device) => device.kind === "videoinput");

        if (cameras.length === 0) {
          throw "No camera found on this device.";
        }

        const camera = cameras[cameras.length - 1];

        navigator.mediaDevices
          .getUserMedia({
            video: {
              deviceId: camera.deviceId,
              facingMode: ["user", "environment"],
              height: { ideal: 1080 },
              width: { ideal: 1920 },
            },
          })
          .then((stream) => {
            track = stream.getVideoTracks()[0];
            applyTorch(onOrOff);
          })
          .catch((error) => {
            console.error("Error accessing the camera:", error);
          });
      })
      .catch((error) => {
        console.error("Error enumerating devices:", error);
      });
  } else {
    applyTorch();
  }
}

function applyTorch(onOrOff = null) {
  track
    .applyConstraints({
      advanced: [{ torch: onOrOff ? onOrOff : !isTorchOn }],
    })
    .then(() => {
      isTorchOn = onOrOff ? onOrOff : !isTorchOn;
      console.log(`Torch is now ${onOrOff || isTorchOn ? "on" : "off"}.`);
    })
    .catch((error) => {
      console.error("Error applying torch constraints:", error);
    });
}
