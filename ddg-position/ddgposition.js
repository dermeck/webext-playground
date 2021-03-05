// TODO XMLHttpRequest vs Fetch API

const querySting = window.location.search;

const urlParams = new URLSearchParams(querySting);

if (urlParams.has("q")) {
  const searchQuery = urlParams.get("q");

  // search duckduckgo
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    let results = Array.from(
      this.responseXML.getElementsByClassName("result")
    ).map((result) => result.getElementsByClassName("result__a")[0].href);

    // remove ads
    results = results.filter(
      (result) => !result.startsWith("https://duckduckgo.com/y.js")
    );

    applyResults(results);
  };

  xhr.onerror = (a, b) => {
    console.log("an error occurred_", a, b);
  };

  console.log(searchQuery);

  xhr.open("GET", "https://duckduckgo.com/html/?q=" + searchQuery, true);
  xhr.responseType = "document";
  xhr.send();
}

function applyResults(result) {
  console.log("called applyResults");
  console.log(result);
}
