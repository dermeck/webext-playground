const querySting = window.location.search;

const urlParams = new URLSearchParams(querySting);

if (urlParams.has("q")) {
  const searchQuery = urlParams.get("q");

  // search duckduckgo
  let xhr = new XMLHttpRequest();
  xhr.onload = (ev) => {
    console.log(ev.target);

    // get links from results and remove ads
    let ddgResults = Array.from(
      ev.target.responseXML.getElementsByClassName("result")
    )
      .map((result) => result.getElementsByClassName("result__a")[0].href)
      .filter((result) => !result.startsWith("https://duckduckgo.com/y.js"));

    applyResults(ddgResults);
  };

  xhr.onerror = (ev) => {
    console.log("an error occurred", ev);
  };

  xhr.open("GET", "https://duckduckgo.com/html/?q=" + searchQuery, true);
  xhr.responseType = "document";
  xhr.send();
}

function applyResults(ddgResults) {
  console.log("ddgresults", ddgResults);

  // compare with google results
  let googleResults = Array.from(document.getElementsByClassName("g")).map(
    (result) => result.getElementsByTagName("a")[0]
  );

  googleResults.forEach((googleResult) => {
    // Check if URL appears in DDG results, if so, get position and create the div for the little orange box.
    const ddgPosition = ddgResults.findIndex(
      (element) => element === googleResult.href
    );
    console.log("position in ddgresults", ddgPosition, googleResult.href);

    if (ddgPosition >= 0) {
      googleResult.insertAdjacentHTML(
        "beforeend",
        '<div style="background-color: #de5833; position: absolute; top:0; right:0;"><p style="font-size: 15px; color: white; margin: 0; padding: 2px 9px 2px 9px;">' +
          (ddgPosition + 1) +
          "</p></div>"
      );
    }
  });
}
