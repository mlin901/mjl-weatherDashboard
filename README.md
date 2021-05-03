# mjl-weatherDashboard

This UCD Bootcamp assignment was to to build a weather dashboard web app that dynamically updates HTML and CSS and uses the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. Here's the user story:

```
AS A traveler,
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly.
```

This web app includes a search field for city names. When user enters a city name and clicks Go, the dashbard app
* uses the city name for two API searches. (It takes two to populate the different kinds of information required for this assignment)
* Populates data area (upper right) with city info.
* Populates the forcast area (lower right) forcast information for the next 5 days.
* Saves name of city to local storage and retrieves saved names when the page is opened or refreshed.
* Adds the name to a list that can be used for future searches.

## Links

GitHub repository: **********
Published website: *********

## Known issues

There are a few issues/shortcomings that if addressed would improve this application:
* Didn't have time to figure out how to handle pressing enter in search field
* Should probably put up info text if one of the values (e.g., UVI is 0)
* Should probably put up message when no info for returned city
* Something to handle mult cities with same name (e.g., "Auburn, CA")

The application works, but it was developed far too orgainically. In the early planning stages (e.g., during the design/pseudocode state) I didn't account for the challanges I'd be facing with multiple API calls and two search sources (the search field and the list of searched locations). Additionally, because I had to wait a bit for openweather.org to send me a key, I used that waiting time to get started with some Bootstrap components. But again, I didn't have a very complete picture at this point, so I didn't choose the optimal Bootstrap component setup. I made it work, but it isn't an ideal approach. And that about summs up the design of the project in general: I made it work, but it should be redesigned for better code organization, better use of Bootstrap compontents, more optimal API calls, etc., not to mention more attention to the look of the website. 








# old stuff below************************************
# 06 Server-Side APIs: Weather Dashboard

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that provides basic setup and usage instructions. You will use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./Assets/06-server-side-apis-homework-demo.png)

## Grading Requirements

This homework is graded based on the following criteria: 

### Technical Acceptance Criteria: 40%

* Satisfies all of the above acceptance criteria plus the following:

    * Uses the OpenWeather API to retrieve weather data.

    * Uses `localStorage` to store persistent data.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository that contains application code.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application resembles the mock-up functionality provided in the homework instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality readme file with description, screenshot, and link to deployed application.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a readme describing the project.

- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
