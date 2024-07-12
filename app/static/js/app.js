console.log("Weather API")

document.addEventListener("DOMContentLoaded", function () {

    const weatherForm = document.querySelector(".weather-form");
    const weatherInfo = document.querySelector(".weather-info");

    weatherForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const city = event.target.elements.city.value;
        console.log(city);
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
                `;
            })
    });


});
