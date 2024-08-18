export default function triggerSmartHomeAction() {
  fetch("https://maker.ifttt.com/trigger/YOUR_EVENT_NAME/with/key/YOUR_IFTTT_KEY", {
      method: "POST",
      body: JSON.stringify({ value1: "Alohomora!" })
  }).then(response => console.log("Ação enviada para a casa inteligente.", response));
}