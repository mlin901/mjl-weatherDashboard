
let searchButton = $(".btn");
let cityNumber = 0;

// FUNCTION - Makes API call
function getData(searchInput, source) {
  let apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=ab49e3c91f890388f51d73286073c3a1`;
  fetch(apiCall)
  .then(function(response){
    if (response.status == 200) {
        response.json().then(function (data) {
          console.log("*******data*******");
          console.log(data);
          if (source == "from field search") {
            displaySearchInfo(data);
          } else if (source == "from list item click") {
            displayItemInfo(data);
          }
        })
    } else {
        alert("No results for " + searchInput);
    }
  })
  .catch(function(){
      console.log("Bad Request")
  })
}

// FUNCTION - displays data for a new search
function displaySearchInfo(data) {
  // The following builds these: <a class="list-group-item list-group-item-action active" id="list-city1-list" data-bs-toggle="list" href="#list-city1" role="tab" aria-controls="city1">city1</a>
  // See https://getbootstrap.com/docs/5.0/components/list-group/#javascript-behavior and note that the active item gets an "active" class (in addition to the classes added bdlow). This Bootstrap behavior.
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
  listItemText.text(data.name);
  // The following builds these: <div class="tab-pane fade" id="list-city2" role="tabpanel" aria-labelledby="list-city2-list">city2...</div>
  // See https://getbootstrap.com/docs/5.0/components/list-group/#javascript-behavior and note that the active item gets an "active" class (in addition to the classes added below). This is Bootstrap behavior.
      // name
  let tabContCityName = $("<div>")
      .addClass("tab-pane fade")
      .attr("id", "list-city"+cityNumber)
      .attr("role", "tabpanel")
      .attr("aria-labelledby", "list-city"+cityNumber+"-list")
      .prependTo(".tab-content");
  tabContCityName.text(data.name);
      // date
  let tabContDate = $("<p>")
      .addClass("tab-date")
      .appendTo(tabContCityName);
  displayDate(tabContDate);        
      // icon
  iconId = data.weather[0].icon
  iconUrl = "http://openweathermap.org/img/wn/"+iconId+"@2x.png"
  let tabContIcon = $("<img>")
      .addClass("tab-icon")
      .attr("src",iconUrl)
      .attr("alt", "Weather icon")
      .appendTo(tabContCityName);
      // temp
      // humidity
      // uv index

  // Programatically click item that was just searched on...
  $("#list-city"+cityNumber+"-list")[0].click();
  // ...and clear the search field
  $("#city-search").val("");
}

// FUNCTION - displays data for a clicked list item
function displayItemInfo(data) {
  // Remove cards if there are any
  if ($(".cardCol")){
    $( "#cards" ).empty();
  }
  console.log("blah");
  // Create cards for the next 5 days
  for (var i = 0; i < 5; i++) {  // *******5 shouldn't be hc
    let cardDiv1 = $("<div>")
        .addClass("col-sm-2 cardCol")
        .appendTo("#cards");
    let cardDiv2 = $("<div>")
        .addClass("card")
        .appendTo(cardDiv1);
    let cardDiv3 = $("<div>")
        .addClass("card-body")
        .appendTo(cardDiv2);
    let cardHead = $("<h5>")
        .addClass("card-title")
        .appendTo(cardDiv3);
    cardHead.text("Tomorrow"); // ***not hc
    let cardP = $("<p>")
        .addClass("card-text")
        .appendTo(cardDiv3);
    cardP.text("Stuff for Tomorrow"); // ***not hc
  }
} 

// FUNCION - display the date (uses Moment.js)  ******Should instead use API date data**************
function displayDate(tabContDate) {
  var today = moment().format('dddd, MMMM Do YYYY');
  tabContDate.text(today);
}

// EVENT LISTENER for Search button clicks
searchButton.on("click", function(event){
  event.preventDefault();
  let searchInput =  $("#city-search").val();
  if (!searchInput) {
    alert("Enter a city name or choose one from the list.");
    return;
  }
  cityNumber++;
  var source = "from field search";
  getData(searchInput, source);
})

let listClickEl = $(".list-group");  
// EVENT LISTENER for list item clicks
listClickEl.on("click", function(event){
  event.preventDefault();
  let clickedItem = event.target;
  clickedItemText = clickedItem.text
  let source = "from list item click"
  getData(clickedItemText, source)
})

