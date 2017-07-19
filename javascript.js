$(".randomArticle").on("click", () => {
  "use strict";

  const link = "https://en.wikipedia.org/wiki/Special:Random";
  window.open(link);
});

// need user entry validation
$(".articleSearch").on("click", () => {
  "use strict";

  const $userInput = $(".userInput").val();
  const $searchResults = $(".searchResults");

  $.ajax({
    // use a proxy server to prevent CORS error
    url: "https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=france",
    success: (json) => {

      //an array of titles returned by the API
      const titles = json[1];
      //an array of descriptions returned by the API
      const description = json[2];
      //an array of links returned by the API
      const links = json[3];

      // append the titles, links and descriptions of the search results to the page
      links.map((val, index) => {
        $searchResults.append("<div><h5><a href='" + val + "' >" + titles[index]
        + "</a></h5><p>" + description[index] + "</p></div><br>");
      });

    },
    error: () => {

      $searchResults.append("Error");
    }
  });

});
