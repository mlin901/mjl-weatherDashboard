let searchButton = $(".btn");
let cityNumber = 0;
// var returnedUvi;


// FUNCTION - Makes API call for UVI info <===============
function getDataUvi(coordinates) {
  let apiCallUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,daily,alerts&appid=ab49e3c91f890388f51d73286073c3a1`;
  fetch(apiCallUvi)
  .then(function(response){
    if (response.status == 200) {
        response.json().then(function (data2) {  
        returnedUvi = data2.current.uvi;   
        })
    } else {
        alert("No results for " + cityName);
    }
  })
  .catch(function(){
      console.log("Bad Request")
  })
}


// FUNCTION - Makes API call to get data for the day
function getData(searchInput, source) {
  let units = "imperial";
  let apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=${units}&appid=ab49e3c91f890388f51d73286073c3a1`;
  fetch(apiCall)
  .then(function(response){
    if (response.status == 200) {
        response.json().then(function (data) {
          let coordinates = data.coord;
          // Get UVI using coordinates from previous API call
          let apiCallUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&units=${units}&appid=ab49e3c91f890388f51d73286073c3a1`;
          fetch(apiCallUvi)
          .then(function(response){
            if (response.status == 200) {
                response.json().then(function (data2) {  
                var returnedUvi = data2.current.uvi; 
                // Call one of the two display functions
                if (source == "from field search") {
                  displaySearchInfo(data, returnedUvi);
                } else if (source == "from list item click") {
                  displayCardInfo(data2);
                }  
                })
            } else {
                alert("No results for " + cityName);
            }
          })
          .catch(function(){
              console.log("Bad Request")
          })  // end of UVI-retrieval fetch-catch
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
function displaySearchInfo(data, returnedUvi) {
  // The following builds these: <a class="list-group-item list-group-item-action active" id="list-city1-list" data-bs-toggle="list" href="#list-city1" role="tab" aria-controls="city1">city1</a>
  // See https://getbootstrap.com/docs/5.0/components/list-group/#javascript-behavior and note that the active item gets an "active" class (in addition to the classes added bdlow). This Bootstrap behavior.
  let listItem = $("<a>")
      .addClass("list-group-item list-group-item-action")
      .attr("id", "list-city"+cityNumber+"-list") 
      .attr("data-bs-toggle", "list")
      .attr("href", "#list-city"+cityNumber) 
      .attr("role", "tab")
      .attr("aria-controls", "city"+cityNumber)  
      .prependTo(".list-group");
  let listItemText  = $("#list-city"+cityNumber+"-list");
  listItemText.text(data.name);
  // Add to local storage
  addEntry(data.name, cityNumber);

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
  iconUrl = "http://openweathermap.org/img/wn/"+iconId+"@2x.png"  // ***Remove @2x ?????
  let tabContIcon = $("<img>")
      .addClass("tab-icon")
      .attr("src", iconUrl)
      .attr("alt", "Weather icon")
      .appendTo(tabContCityName);
      // temp
  let tabContTemp = $("<p>")
      .addClass("tab-temp")
      .appendTo(tabContCityName);
  tabContTemp.text("Temperature: " + data.main.temp);  // ****must convert
      // humidity
  let tabContHumidity = $("<p>")
      .addClass("tab-humidity")
      .appendTo(tabContCityName);
  tabContHumidity.text("Humidity: " + data.main.humidity);
      // uv index   ****needs to be color coded
  let tabContUvi = $("<p>")
      .addClass("tab-uvi")
      .appendTo(tabContCityName);
  tabContUvi.text("UV index: ");
  let tabContUviSpan = $("<span>")
      .addClass("uvi-span")
      .appendTo(tabContUvi);
  tabContUviSpan.text(returnedUvi);
  changeUviColor(returnedUvi);

  // Programatically click item that was just searched on...
  $("#list-city"+cityNumber+"-list")[0].click();
  // ...and clear the search field
  $("#city-search").val("");
}

// FUNCTION - displays data for a clicked list item
function displayCardInfo(data2) {
  // Remove cards if there are any
  if ($(".cardCol")){
    $( "#cards" ).empty();
  }
  // Create cards for the next 5 days
  for (var i = 1; i < 6; i++) {  // *******5 shouldn't be hc????????
    let cardDiv1 = $("<div>")
        .addClass("col-sm-2 cardCol")
        .appendTo("#cards");
    let cardDiv2 = $("<div>")
        .addClass("card")
        .appendTo(cardDiv1);
    let cardDiv3 = $("<div>")
        .addClass("card-body")
        .appendTo(cardDiv2);
    // date - daily.date
    let cardHead = $("<h5>")
        .addClass("card-title")
        .appendTo(cardDiv3);
    dateVal = data2.daily[i].dt;
    dateVal = convertDate(dateVal);
    cardHead.text(dateVal); // +++++date
    // icon - daily.weather.icon
    let cardIconId = data2.daily[i].weather[0].icon;
    cardIconUrl = "http://openweathermap.org/img/wn/"+cardIconId+".png"
    let cardIcon = $("<img>")
        .addClass("card-icon")
        .attr("src", cardIconUrl)
        .appendTo(cardDiv3);
    // temp  - daily.temp.day
    let cardTemp =  $("<p>")
        .addClass("card-temp")
        .appendTo(cardDiv3);
    tempVal = data2.daily[i].temp.day;
    cardTemp.text("Temp: " + tempVal); 
    // humidity
    let cardHumidity =  $("<p>")
        .addClass("card-humidity")
        .appendTo(cardDiv3);
    humidityVal = data2.daily[i].humidity;
    cardHumidity.text("Humidity: " + humidityVal); 

  }
} 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// FUNCION - display the date (uses Moment.js)  // -------Should instead use API date data----------
function displayDate(tabContDate) {
  var today = moment().format('dddd, MMMM Do YYYY');
  tabContDate.text(today);
}  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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

// EVENT LISTENER for list item clicks
let listClickEl = $(".list-group");  
listClickEl.on("click", function(event){
  event.preventDefault();
  let clickedItem = event.target;
  clickedItemText = clickedItem.text
  let source = "from list item click"
  getData(clickedItemText, source)
})

// FUNCTION to convert date - adapted from https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript 
function convertDate(utcDate) {
  let unixTimestamp = utcDate;
  let milliseconds = utcDate * 1000; 
  let dateObject = new Date(milliseconds);
  let humanDateFormat = dateObject.toLocaleString(); 
  humanDateFormat = humanDateFormat.slice(0, -12);
  return humanDateFormat;
}

function changeUviColor(uviVal) {
  if (uviVal < 3) {
    $(".uvi-span").css("background-color", "green");
  } else if (uviVal < 6) {
    $(".uvi-span").css("background-color", "yellow");
  } else if (uviVal < 8) {
    $(".uvi-span").css("background-color", "orange");
  } else if (uviVal < 11) {
    $(".uvi-span").css("background-color", "red");
  } else {
    $(".uvi-span").css("background-color", "purple");
  }
}

// Function to add entry to local storage. Adapted from https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage/55968743
function addEntry(cityName, cityNum) {
  // Parse any JSON previously stored in allEntries
  var existingEntries = JSON.parse(localStorage.getItem("mjlWeather"));
  if (existingEntries == null) existingEntries = [];
  var entry = {
      "title": cityNum,
      "text": cityName
  };
  existingEntries.push(entry);
  localStorage.setItem("mjlWeather", JSON.stringify(existingEntries));
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function initialDisplay() {
  var existingEntries = JSON.parse(localStorage.getItem("mjlWeather"));
  if (existingEntries !== null) {
    for (let i = 0; i < existingEntries.length; i++) {
      console.log("blah");
    }
  }

}

initialDisplay();