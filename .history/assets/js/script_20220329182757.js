



var oneCallApi = function(data) 
{
var cityObj
}

var createCard = function(current, elementId)
{
    var cityName = document.createElement('h1');
    var temp = document.createElement('p');
    var wind = document.createElement('p');
    var humidity = document.createElement('p');
    var uvIndex = document.createElement('p');

    cityName.textContent = userInput.value;
    temp.textContent = current.temp;
    wind.textContent = current.humidity;
    uvIndex.textContent = current.uvi;


    const weatherContainer = document.querySelector(elementId);
    weatherContainer.appendChild(cityName);
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(wind);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(uvIndex);

}


var fiveDay = function()
{
    var dailyTemp = document.createElement
}