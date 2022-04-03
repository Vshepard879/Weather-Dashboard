// set global variables
var citiesListArr = [];
var numOfCities = 9;
var personalAPIKey = "appid=9e204fdd58d3a5c469183fc900fcd847";
var unit = "units=imperial";
var dailyWeatherApiStarts =
  "https://api.openweathermap.org/data/2.5/weather?q=";
var dailyUVIndexApiStarts = "https://api.openweathermap.org/data/2.5/uvi?";
var forecastWeatherApiStarts =
  "https://api.openweathermap.org/data/2.5/onecall?";
// select from html element
var searchCityForm = $("#searchCityForm");
var searchedCities = $("#searchedCityLi");
//-------------------------- get weather info from OpenWeather starts here ------------------------------//
var getCityWeather = function (searchCityName) {
  // formate the OpenWeather api url
  var apiUrl =
    dailyWeatherApiStarts + searchCityName + "&" + personalAPIKey + "&" + unit;
  // make a request to url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (response) {
        $("#cityName").html(response.name);
        // display date
        var unixTime = response.dt;
        var date = moment.unix(unixTime).format("MM/DD/YY");
        $("#currentdate").html(date);
        // display weather icon
        var weatherIncoUrl =
          "http://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png";
        $("#weatherIconToday").attr("src", weatherIncoUrl);
        $("#tempToday").html(response.main.temp + " \u00B0F");
        $("#humidityToday").html(response.main.humidity + " %");
        $("#windSpeedToday").html(response.wind.speed + " MPH");
        // return coordinate for getUVIndex to call
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        getUVIndex(lat, lon);
        getForecast(lat, lon);
      });
    } else {
      alert("Please provide a valid city name.");
    }
  });
};
var getUVIndex = function (lat, lon) {
  // formate the OpenWeather api url
  var apiUrl =
    dailyUVIndexApiStarts +
    personalAPIKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&" +
    unit;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // remove all class background
      $("#UVIndexToday").removeClass();
      $("#UVIndexToday").html(response.value);
      if (response.value < 3) {
        $("#UVIndexToday").addClass("p-1 rounded bg-success text-white");
      } else if (response.value < 8) {
        $("#UVIndexToday").addClass("p-1 rounded bg-warning text-white");
      } else {
        $("#UVIndexToday").addClass("p-1 rounded bg-danger text-white");
      }
    });
};
var getForecast = function (lat, lon) {
  // format the OpenWeather api url
  var apiUrl =
    forecastWeatherApiStarts +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=current,minutely,hourly" +
    "&" +
    personalAPIKey +
    "&" +
    unit;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      for (var i = 1; i < 6; i++) {
        //display date
        var unixTime = response.daily[i].dt;
        var date = moment.unix(unixTime).format("MM/DD/YY");
        $("#Date" + i).html(date);
        // display weather icon
        var weatherIncoUrl =
          "http://openweathermap.org/img/wn/" +
          response.daily[i].weather[0].icon +
          "@2x.png";
        $("#weatherIconDay" + i).attr("src", weatherIncoUrl);
        // display temperature
        var temp = response.daily[i].temp.day + " \u00B0F";
        $("#tempDay" + i).html(temp);
        // display humidity
        var humidity = response.daily[i].humidity;
        $("#humidityDay" + i).html(humidity + " %");
      }
    });
};
//-------------------------- get weather info from OpenWeather ends here ------------------------------//
//-------------------------------------- create button starts  ----------------------------------------//
