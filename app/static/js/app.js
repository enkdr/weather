console.log("Weather API");

document.addEventListener("DOMContentLoaded", function () {

    const weatherForm = document.querySelector(".weather-form");
    const weatherInfo = document.querySelector(".weather-info");
    const weatherBlocks = document.querySelector(".weather-blocks");

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
