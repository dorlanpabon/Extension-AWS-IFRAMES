
var port = chrome.runtime.connect();

port.onMessage.addListener((msg) => {
  console.log("Background script received: " + msg);
  window.postMessage({ type: "FROM_BACKGROUND", text: msg }, "*");
}
);

window.addEventListener('load', function () {
  window.addEventListener("message", (event) => {
    // We only accept messages from ourselves
    if (event.source != window) {
      return;
    }

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
      console.log("Content script received: " + event.data.text);
      port.postMessage(event.data.text);
    }
  }, false);



  var url = window.location.href;

  window.postMessage({ type: "FROM_PAGE", text: window.name }, "*");


}, false);

