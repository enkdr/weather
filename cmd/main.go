package main

import (
	"fmt"
	"get-weather/pkg/weather"
)

func main() {

	var resp weather.WeatherResponse

	resp = weather.GetWeather()
	fmt.Println(weather.PrettyPrint(resp))

}
