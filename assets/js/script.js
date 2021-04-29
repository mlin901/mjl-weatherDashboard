
let searchButton = $(".btn");
let cityNumber = 0;

searchButton.on("click", function(event){
  event.preventDefault();
  let searchInput =  $("#city-search").val();
  console.log(searchInput);
  let apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=ab49e3c91f890388f51d73286073c3a1`

  cityNumber++;

  // Builds these:
  // <a class="list-group-item list-group-item-action active" id="list-city1-list" data-bs-toggle="list" href="#list-city1" role="tab" aria-controls="city1">city1</a>
  let listItem = $("<a>")
      .addClass("list-group-item list-group-item-action")
      .attr("blah", "****************************")
      .attr("id", "list-city"+cityNumber+"-list") //******
      .attr("data-bs-toggle", "list")
      .attr("href", "#list-city"+cityNumber) // ****
      .attr("role", "tab")
      .attr("aria-controls", "city"+cityNumber)  // **** - don't hard code
      .prependTo(".list-group");
  let listItemText  = $("#list-city"+cityNumber+"-list");
  listItemText.text(searchInput);

  // Builds these:
  // <div class="tab-pane fade" id="list-city2" role="tabpanel" 
  // aria-labelledby="list-city2-list">city2...</div>
  let tabContItem = $("<div>")
      .addClass("tab-pane fade")
      .attr("id", "list-city"+cityNumber)
      .attr("role", "tabpanel")
      .attr("aria-labelledby", "list-city"+cityNumber+"-list")
      .prependTo(".tab-content");
  let tabContItemText  = $("#list-city"+cityNumber);
  tabContItemText.text(searchInput);

})



