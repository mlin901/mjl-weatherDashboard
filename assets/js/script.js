let searchButton = $(".btn");
let cityNumber = 0;

// FUNCTION - Makes API call for UVI info 
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
// ab49e3c91f890388f51d73286073c3a1
function getData(searchInput, source) {
  let units = "imperial";
  // Main API call
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=${units}&appid=ab49e3c91f890388f51d73286073c3a1`;
  fetch(apiCall)
  .then(function(response){
    if (response.status == 200) {
        response.json().then(function (data) {
          let coordinates = data.coord;
          // Query API for UVI using coordinates from previous API call
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
          })  // End of UVI-retrieval fetch-catch
        })
    } else {
        alert("No results for " + searchInput);
    }
  })
  .catch(function(){
      console.log("Bad Request")
  }) // End of primary API call
}

// FUNCTION - displays data for a new search
function displaySearchInfo(data, returnedUvi) {

  $(".tab-pane").removeClass("show");
  $(".tab-pane").removeClass("active");

  var notThere = true;
  $('.list-group-item').each(function() {
    if ($(this).text() === data.name) {
      notThere = false;
      getData(data.name, "from list item click")
      alert("Enter a city that is not in the list, or select a city from the list.");
    }
  });
  if (notThere == true) {
    cityNumber++;
    // The following dynamically builds this type of HTML element for the searched city list: <a class="list-group-item list-group-item-action active" id="list-city1-list" data-bs-toggle="list" href="#list-city1" role="tab" aria-controls="city1">city1</a>
    // See https://getbootstrap.com/docs/5.0/components/list-group/#javascript-behavior and note that the active item gets an "active" class (in addition to the classes added bdlow). This Bootstrap behavior.
    let listItem = $("<a>")
        .addClass("list-group-item list-group-item-action")
        .attr("id", "list-city"+cityNumber+"-list") 
        .attr("data-bs-toggle", "list")
        .attr("href", "#list-city"+cityNumber) 
        .attr("role", "tab")
        .attr("aria-controls", "city"+cityNumber)  
        .prependTo(".list-group");
    let listItemText = $("#list-city"+cityNumber+"-list");
    listItemText.text(data.name);
    // Add to local storage
    addToLocalStorage(data.name, cityNumber);
    // $("#nav-tabContent").empty();
    // The following builds this tpe of element for the current forcast: <div class="tab-pane fade" id="list-city2" role="tabpanel" aria-labelledby="list-city2-list">city2...</div>
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
    iconUrl = "https://openweathermap.org/img/wn/"+iconId+"@2x.png"  
    let tabContIcon = $("<img>")
        .addClass("tab-icon")
        .attr("src", iconUrl)
        .attr("alt", "Weather icon")
        .appendTo(tabContCityName);
        // temp
    let tabContTemp = $("<p>")
        .addClass("tab-temp")
        .appendTo(tabContCityName);
    tabContTemp.text("Temperature: " + data.main.temp + " F");  
        // humidity
    let tabContHumidity = $("<p>")
        .addClass("tab-humidity")
        .appendTo(tabContCityName);
    tabContHumidity.text("Humidity: " + data.main.humidity + "%");
        // uv index   
    let tabContUvi = $("<p>")
        .addClass("tab-uvi")
        .appendTo(tabContCityName);
    tabContUvi.text("UV index: ");
    let tabContUviSpan = $("<span>")
        .addClass("uvi-span")
        .appendTo(tabContUvi);
    tabContUviSpan.text(returnedUvi);
    color = changeUviColor(returnedUvi);
    tabContUviSpan.css("background-color", color);
    // Programatically click item that was just searched on.
    $("#list-city"+cityNumber+"-list")[0].click();
  }
  // Clear the search field
  $("#city-search").val("");
}

// FUNCTION - displays five-day forcast cards 
function displayCardInfo(data2) {
  // Remove cards if there are any
  if ($(".cardCol")){
    $( "#cards" ).empty();
  }
  // Create cards for the next five days
  for (var i = 1; i <= 5; i++) {  
    // Outer divs needed for Bootstrap cards
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
    cardHead.text(dateVal); 
    // icon - daily.weather.icon
    let cardIconId = data2.daily[i].weather[0].icon;
    cardIconUrl = "https://openweathermap.org/img/wn/"+cardIconId+".png"
    let cardIcon = $("<img>")
        .addClass("card-icon")
        .attr("src", cardIconUrl)
        .appendTo(cardDiv3);
    // temp  - daily.temp.day
    let cardTemp =  $("<p>")
        .addClass("card-temp")
        .appendTo(cardDiv3);
    tempVal = data2.daily[i].temp.day;
    cardTemp.text("Temp: " + tempVal + " F"); 
    // humidity
    let cardHumidity =  $("<p>")
        .addClass("card-humidity")
        .appendTo(cardDiv3);
    humidityVal = data2.daily[i].humidity;
    cardHumidity.text("Humidity: " + humidityVal + "%"); 
  }
} 

// FUNCTION to convert Linux UTC date into more readable format. Adapted from https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript.
function convertDate(utcDate) {
  let unixTimestamp = utcDate;
  let milliseconds = utcDate * 1000; 
  let dateObject = new Date(milliseconds);
  let humanDateFormat = dateObject.toLocaleString(); 
  humanDateFormat = humanDateFormat.slice(0, -12);
  return humanDateFormat;
}

// FUNCTION to set background color for UVI for current forcast.
function changeUviColor(uviVal) {
  if (uviVal < 3) {
    return "green";
  } else if (uviVal < 6) {
    return "yellow";
  } else if (uviVal < 8) {
    return "orange";
  } else if (uviVal < 11) {
    return "red";
  } else {
    return "purple";
  }
}

// FUNCTION to add entry to local storage. Reference: https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage/55968743
function addToLocalStorage(cityName, cityNum) {
  // Parse data previously stored in allEntries
  var existingEntries = JSON.parse(localStorage.getItem("mjlWeather"));
  if (existingEntries == null) existingEntries = [];
  var entry = {
      "number": cityNum,
      "name": cityName
  };
  if(existingEntries.some(entry => entry.name === cityName)){
    // alert("Object found inside the array."); // ********
  } else{
    existingEntries.push(entry);
    localStorage.setItem("mjlWeather", JSON.stringify(existingEntries));
  }
};

// FUNCTION - display the date in tab area (uses Moment.js)  
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

// FUNCTION - Populate page when refreshed or first opened
function initialDisplay() {
  var existingEntries = JSON.parse(localStorage.getItem("mjlWeather"));
  if (existingEntries !== null) {
    for (let i = 0; i < existingEntries.length; i++) {
      var storedEntry = existingEntries[i];
      let source = "from field search";
      getData(storedEntry.name, source);
    }
  }
}

initialDisplay();