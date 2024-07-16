console.log("Weather API");

document.addEventListener("DOMContentLoaded", function () {

    const weatherForm = document.querySelector(".weather-form");
    const weatherInfo = document.querySelector(".weather-info");
    const weatherBlocks = document.querySelector(".weather-blocks");    
    const selectCity = weatherForm.querySelector("#city");
    const cityArray = ["Melbourne", "London", "Miami", "Berlin","Madrid","Accra"];
    
    // Loop through the cityArray and create <option> elements
    cityArray.forEach(city => {
        const option = document.createElement("option");
        option.value = city; // Set the value attribute
        option.textContent = city; // Set the text content
        selectCity.appendChild(option); // Append the option to the select element
    });    
    
    weatherForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const city = event.target.elements.city.value;
        if (! city) return;
        fetch(`/weather/${city}`)
            .then(response => response.json())
            .then(data => {
                // Update the weather information in the HTML
                weatherInfo.innerHTML = `
                    <h2>${data.location.name}, ${data.location.country}</h2>
                    <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
                    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                    <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
                    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                    <button id="add-weather-block">Add Weather Block</button>
                `;

                // Add event listener for the "add weather block" button
                const addButton = document.getElementById("add-weather-block");
                addButton.addEventListener("click", function () {
                    // add a weather-block web component
                    const weatherBlock = document.createElement('weather-block');
                    weatherBlock.data = data;
                    weatherBlocks.appendChild(weatherBlock);
                    addButton.disabled = true;
                });
            });
    });

});
