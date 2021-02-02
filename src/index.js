// open a random Wikipedia article in a new window
$(".randomArticle").on("click", () => {
  "use strict";

  const link = "https://en.wikipedia.org/wiki/Special:Random";
  window.open(link);
});

function clearSearchResults() {
  "use strict";

  $(".searchResults").html("");
}

// request search results from the MediaWiki API based on user input
$(".articleSearch").on("click", () => {
  "use strict";

  const $userInput = $(".userInput").val();

  $.ajax({
    // use a proxy server to prevent CORS error
    url:
      "https://cors-anywhere.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" +
      $userInput,
    success: (data) => {
      const $searchResults = $(".searchResults");
      const pageResults = data.query.search;

      //clear any existing search results on the page
      clearSearchResults();

      // append the links, titles and descriptions of the search results to the page
      pageResults.forEach((result) => {
        $searchResults.append(
          `<div class="card resultContainers"
            <h5>
              <a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">
                ${result.title}
              </a>
            </h5>
            <p> 
              ${result.snippet}
            </p>
          </div>
          <br>`
        );
      });
    },
    error: () => {
      const $searchResults = $(".searchResults");
      clearSearchResults();
      $searchResults.append("<p>Sorry, an error has occurred.</p>");
    },
  });
});
