$(".randomArticle").on("click", () => {
  "use strict";

  const link = "https://en.wikipedia.org/wiki/Special:Random";
  window.open(link);
});


// request search results from the MediaWiki API based on user input
$(".articleSearch").on("click", () => {
  "use strict";

  // need user entry validation?
  const $userInput = $(".userInput").val();

  $.ajax({
    // use a proxy server to prevent CORS error
    url: "https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + $userInput,
    success: (json) => {
      "use strict";

      const $searchResults = $(".searchResults");
      //an array of titles returned by the API
      const titles = json[1];
      //an array of descriptions returned by the API
      const description = json[2];
      //an array of links returned by the API
      const links = json[3];

      //clear any existing search results on the page
      clearSearchResults();

      // append the titles, links and descriptions of the search results to the page
      links.map((val, index) => {
        $searchResults.append("<div><h5 class='text-center'><a href='" + val + "' >" + titles[index] + "</a></h5><p class='text-center'>" + description[index] + "</p></div><br>");
      });

    },
    error: () => {
      "use strict";

      const $searchResults = $(".searchResults");
      clearSearchResults();
      $searchResults.append("<p>Error</p>");
    }
  });

});

//clear any existing search results on the page
function clearSearchResults () {
  "use strict";

  const $searchResults = $(".searchResults");
  $(".searchResults").html("");
}
