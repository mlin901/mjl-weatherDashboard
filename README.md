# mjl-weatherDashboard

This UCD Bootcamp assignment was to to build a weather dashboard web app that dynamically updates HTML and CSS and uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. Here's the user story:

```
AS A traveler,
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly.
```

Here is the link to the published webapp I created: [https://mlin901.github.io/mjl-weatherDashboard/](https://mlin901.github.io/mjl-weatherDashboard/). A screen capture of the web app is at the bottom of this readme.

This web app includes a search field for city names. When user enters a city name and clicks Go, the dashbard app
* uses the city name for two API searches. (It takes two to populate the different kinds of information required for this assignment)
* Populates data area (upper right) with city info.
* Populates the forcast area (lower right) with forcast information for the next five days.
* Saves name of the city to local storage and retrieves saved city names when the page is opened or refreshed.
* Adds the city name to a list that can be used for future searches.

## Known issues

There are a few issues/shortcomings that if addressed would improve this application:
* Not responsive. It was responsive at first, but something along the way changed that (and I ran out of time to fix that problem).
* Didn't have time to figure out how to allow the user to start their search by pressing enter in the search field once they enter the city name
* Should probably put up info text if one of the values (e.g., UVI) is 0
* Should probably put up a message when there is no info returned for the designated city
* Something to handle multiple cities with same name (e.g., "Auburn, CA" vs "Auburn, AL")

The application works, but it was developed far too orgainically. In the early planning stages (e.g., during the design/pseudocode state) I didn't account for the challanges I'd be facing with multiple API calls and two search sources (the search field and the list of searched locations). Additionally, because I had to wait a bit for openweather.org to send me a key, I used that waiting time to get started with some Bootstrap components. But again, I didn't have a very complete picture at this point, so I didn't choose the optimal Bootstrap component setup. I made it work, but it isn't an ideal approach. And that about summs up the design of the project in general: I made it work, but it should be redesigned for better code organization, better use of Bootstrap compontents, more optimal API calls, etc., not to mention more attention to the look of the website. 

![Weather Dashboard application screen capture](./assets/images/screencap.png)