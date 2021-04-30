
let searchButton = $(".btn");
let cityNumber = 0;

function getData(apiCall, searchInput) {
  fetch(apiCall)
  .then(function(response){
    if (response.status == 200) {
        response.json().then(function (data) {
          console.log("*******data*******");
          console.log(data);
            displaySearchInfo(data, searchInput)  //  **********************
        })
    } else {
        alert("No results for " + searchInput);
    }
  })
  .catch(function(){
      console.log("Bad Request")
  })
}

// Evemt listener for Search button clicks
searchButton.on("click", function(event){
  event.preventDefault();
  // console.log("*****");
  // console.log(event);
  let searchInput =  $("#city-search").val();
  if (!searchInput) {
    alert("Enter a city name or choose one from the list.");
    return;
  }
  // console.log(searchInput);
  let apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=ab49e3c91f890388f51d73286073c3a1`
  cityNumber++;

  getData(apiCall, searchInput);
})

function displaySearchInfo(data, searchInput) {
  // The following builds these:
  // <a class="list-group-item list-group-item-action active" id="list-city1-list" data-bs-toggle="list" href="#list-city1" role="tab" aria-controls="city1">city1</a>
  // See https://getbootstrap.com/docs/5.0/components/list-group/#javascript-behavior
  // And note that the active item gets an "active" class (in addition to the classes added bdlow). This Bootstrap behavior.
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
  // The following builds these:
  // <div class="tab-pane fade" id="list-city2" role="tabpanel" aria-labelledby="list-city2-list">city2...</div>
  // See https://getbootstrap.com/docs/5.0/components/list-group/#javascript-behavior
  // And note that the active item gets an "active" class (in addition to the classes added below). This is Bootstrap behavior.
  let tabContItem = $("<div>")
      .addClass("tab-pane fade")
      .attr("id", "list-city"+cityNumber)
      .attr("role", "tabpanel")
      .attr("aria-labelledby", "list-city"+cityNumber+"-list")
      .prependTo(".tab-content");
  let tabContItemText  = $("#list-city"+cityNumber);
  tabContItemText.text(searchInput);

  $("#list-city"+cityNumber+"-list")[0].click();
  $("#city-search").val("");
}



// ******************************************************************
// ******************************************************************


// ******Add API search bit to the following (cf. getData and the call to that function)
//      Then split out display method, as I did with the above

let listClickEl = $(".list-group");  
// Event listener for list item clicks
listClickEl.on("click", function(event){
  event.preventDefault();
  var clickedItem = event.target;
  // console.log("##############");
  // console.log(event);
  // console.log(clickedItem);

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
})