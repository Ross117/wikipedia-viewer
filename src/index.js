// open a random Wikipedia article in a new window
$(".randomArticle").on("click", () => {
  "use strict";

  const link = "https://en.wikipedia.org/wiki/Special:Random";
  window.open(link);
});


// request search results from the MediaWiki API based on user input
$(".articleSearch").on("click", () => {
  "use strict";

  const $userInput = $(".userInput").val();

  $.ajax({
    // use a proxy server to prevent CORS error
    url: "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="
    + $userInput,
    success: (json) => {

      const $searchResults = $(".searchResults");
      //an array of titles returned by the API
      const titles = json[1];
      //an array of descriptions returned by the API
      const descriptions = json[2];
      //an array of links returned by the API
      const links = json[3];

      //clear any existing search results on the page
      clearSearchResults();

      // append the links, titles and descriptions of the search results to the page
      links.map((val, index) => {
        $searchResults.append("<div class='card resultContainers'><h5><a href='"
        + val + "' >" + titles[index] + "</a></h5><p>" + descriptions[index]
        + "</p></div><br>");
      });

    },
    error: () => {

      const $searchResults = $(".searchResults");
      clearSearchResults();
      $searchResults.append("<p>Sorry, an error has occurred.</p>");
    }
  });

});

//clear any existing search results on the page
function clearSearchResults () {
  "use strict";

  const $searchResults = $(".searchResults");
  $(".searchResults").html("");
}
