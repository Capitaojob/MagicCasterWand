let torchOn = false;

export default async function toggleTorch(onOrOff = null) {
  if (torchOn) {
    if (onOrOff == true) return;

    // Turn off the flashlight
    const track = stream.getVideoTracks()[0];
    await track.applyConstraints({
      advanced: [{ torch: false }],
    });
    track.stop();
    torchOn = false;
  } else {
    if (onOrOff == false) return;

    try {
      // Request camera access with torch mode
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          advanced: [{ torch: true }],
        },
      });

      torchOn = true;
    } catch (err) {
      console.error("Flashlight is not supported or permission denied:", err);
    }
  }
}
