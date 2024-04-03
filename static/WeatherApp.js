const apiKey = '31fd47765ed0db7cb66a1ff869b444c1';

let citySearch = document.querySelector('.searchBar input');
let  cityName = document.querySelector('.searchBar input').value;
let searchButton = document.querySelector('.searchBar button');

// API used is from OpenWeatherMap 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function checkWeather(cityName){
try{
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    var data = await response.json();
}catch(err){
    console.log(err)
}

    console.log(data);
    console.log(cityName);
    
    // Update all the info fields
    document.querySelector('.name').innerHTML = data.name;
    document.querySelector('.pressure').innerHTML = data.main.pressure + ' mbar';
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.feelsLike').innerHTML = Math.round(data.main.feels_like) + '°C';
    document.querySelector('.windSpeed').innerHTML = data.wind.speed + ' km/hr';
    document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
    document.querySelector('.weatherStatus').innerHTML = data.weather[0].description ;

    if(data.weather[0].main === "Clouds"){
        document.body.style.backgroundImage = "url('./assets/images/cloudy-weather-background.png')";
        document.body.querySelector('.weatherbox img').style.content = "url('./assets/weather_icons/few clouds.png')";
    }else if(data.weather[0].main === "Thunderstorm"){
        document.body.style.backgroundImage = "url('./assets/images/thunderstorm-weather-background.png')";
        document.body.querySelector('.weatherbox img').style.content = "url('./assets/weather_icons/thunderstorm.png')";
    }else if(data.weather[0].main === "Drizzle"){
        document.body.style.backgroundImage = "url('./assets/images/rainy-weather-background.png')";
        document.body.querySelector('.weatherbox img').style.content = "url('./assets/weather_icons/shower rain.png')";
    }else if(data.weather[0].main === "Rain"){
        document.body.style.backgroundImage = "url('./assets/images/rainy-weather-background.png')";
        document.body.querySelector('.weatherbox img').style.content = "url('./assets/weather_icons/rain.png')";
    }else if(data.weather[0].main === "Snow"){
        document.body.style.backgroundImage = "url('./assets/images/snow-weather-background.png')";
        document.body.querySelector('.weatherbox img').style.content = "url('./assets/weather_icons/snow.png')";
    }else if(data.weather[0].main === "Clear"){
        document.body.style.backgroundImage = "url('./assets/images/sunny-weather-background.png')";
        document.body.querySelector('.weatherbox img').style.content = "url('./assets/weather_icons/clear sky.png')";
    }else if(data.weather[0].main === "Haze" || data.weather[0].main === "Mist" || data.weather[0].main === "Smoke" || data.weather[0].main === "Fog" || data.weather[0].main === "Dust"){
        document.body.style.backgroundImage = "url('./assets/images/mist-weather-background.jpg')";
        document.body.querySelector('.weatherbox img').style.content = "url('./assets/weather_icons/mist.png')";
    }

    var offset = data.timezone;
    var utc = new Date();

     // Check if Timezone is from source location Timezone or not
     if (offset === 19800) {
        var local = new Date(utc.getTime());
     }else{
        var timezoneOS = offset/3600;
        var tzDiff = timezoneOS * 60 + utc.getTimezoneOffset();
        var local = new Date(utc.getTime() + tzDiff * 60000)
     }
     console.log(local.getHours())
     var hours = local.getHours();
     var minutes = "0" + local.getMinutes();
    

    // Will display time in 10:30 format
    var locale = hours + ':' + minutes.substr(-2);
    document.querySelector(".time").innerText = locale;
    
    // Update Sunrise Time
    var sunRiseTs = data.sys.sunrise;
    var d1 = new Date(sunRiseTs*1000);
    var srHours = d1.getHours();
    var srMinutes = "0" + d1.getMinutes();
    var srTime = srHours + ':' + srMinutes.substr(-2);
    document.querySelector(".sunrise").innerText = srTime;
    
    // Update Sunset Time
    var sunSetTs = data.sys.sunset;
    var d2 = new Date(sunSetTs*1000);
    var ssHours = d2.getHours();
    var ssMinutes = "0" + d2.getMinutes();
    var ssTime = ssHours + ':' + ssMinutes.substr(-2);
    document.querySelector(".sunset").innerText = ssTime;
}
searchButton.addEventListener("click", ()=>{
    checkWeather(citySearch.value)
})
