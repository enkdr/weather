console.log("Weather API")

document.addEventListener("DOMContentLoaded", function () {
    let cityLinks = document.querySelectorAll(".weather-city li");
    let weatherInfo = document.querySelector(".weather-info");

    for (let i = 0; i < cityLinks.length; i++) {
        cityLinks[i].addEventListener("click", function (e) {
            e.preventDefault();
            let city = e.target.dataset.city;
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
                        <!-- Add more weather details as needed -->
                    `;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
                });
        });
    }
});
