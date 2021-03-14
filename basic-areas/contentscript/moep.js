console.log("hello from moep.js"); // log to dev tools in browser tab

browser.runtime.onMessage.addListener((message) => {
  console.log("received message in contentscript");
});
