 
$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("#enterCity").val().trim();
    getLatLon(city)
   
});
function getLatLon(city){
var url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=45ebbd33aab5c77a18994061b0a6ee6a";
fetch(url).then(function(response){
    return response.json()
}).then(function(data){
    var lat = data[0].lat 
    var lon = data[0].lon 
    var name = data[0].name
   GetWeather(lat,lon,name)

})
}
function GetWeather(lat,lon,name) {
console.log(lat,lon)
var url="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=alerts,minutely,hourly&appid=45ebbd33aab5c77a18994061b0a6ee6a"
fetch(url).then(function(response){
    return response.json()
}).then(function(data){
    var weatherobject = data.current

    DisplayWeatherName(weatherobject,name)
})
}

function DisplayWeatherName (weatherobject,name) {
console.log (weatherobject,name)
var cityDiv = $("<div>").addClass("card")
var cityName = $("<h2>").addClass("card-title").text(name)
$("#current-weather").append(cityDiv.append(cityName))

}








function getCurrentWeather(data) {
    $(".results-panel").addClass("visible");
$(".results-panel").addClass("visible");

$("#currentIcon")[0].src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
$("#temperature")[0].textContent = "Temperature: " + data.current.temp.toFixed(1) + " \u2109";
$("#humidity")[0].textContent = "Humidity: " + data.current.humidity + "% ";
$("#wind-speed")[0].textContent = "Wind Speed: " + data.current.wind_speed.toFixed(1) + " MPH";
$("#uv-index")[0].textContent = " uv-index-block " + data.current.uvi;

if (data.current.uvi < 3) {
    $("#uv-index").removeClass("moderate severe");
    $("#uv-index").addClass("favorable");
} else if (data.current.uvi < 6) {
    $("#uv-index").removeClass("favorable severe");
    $("#uv-index").addClass("moderate");
} else {
    $("#uv-index").removeClass("favorable moderate");
    $("#uv-index").addClass("severe");
}

getFutureWeather(data);
}

