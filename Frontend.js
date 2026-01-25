
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = '3ecf65cd78e9cf965c91df28302cbb13';

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    
    const city = cityInput.value.includes(',') ? cityInput.value.split(",")[0].trim() : cityInput.value.trim();

    console.log(city);
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter a city");
    }
})

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiURL);

    if(!response){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayInfo(data){
    const {name :city , 
        main: {temp,humidity}, 
        weather : [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}