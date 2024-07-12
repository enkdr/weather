console.log("OK")

document.addEventListener("DOMContentLoaded", function () {

    let cityLinks = document.querySelectorAll(".weather-city li");

    for (let i = 0; i < cityLinks.length; i++) {
        cityLinks[i].addEventListener("click", function (e) {
            e.preventDefault();
            let city = e.target.dataset.city;
            console.log(city);
        });
    }

});