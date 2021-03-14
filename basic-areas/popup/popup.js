function send(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: "moep",
  });
}

function listenForClicks() {
  console.log("listenForClicks");
  document.addEventListener("click", (e) => {
    console.log(e); // log to toolbox

    browser.tabs
      .query({ currentWindow: true, active: true })
      .then(send)
      .catch((e) => console.error(e));
  });
}

// after loading popup inject the conten_script into current tab
// add eventlistener

browser.tabs
  .executeScript({ file: "/contentscript/moep.js" })
  .then(listenForClicks)
  .catch((e) => console.error(e));
