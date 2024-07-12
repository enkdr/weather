package main

import (
	"fmt"
	"get-weather/pkg/weather"
	"log"
)

func main() {

	locale := "Melbourne"

	resp, err := weather.GetWeather(locale)
	if err != nil {
		log.Println(err)
	}

	// using type assertion to check if the response is of type WeatherResponse or ErrorResponse
	if weatherResp, ok := resp.(weather.WeatherResponse); ok {
		fmt.Println(weather.PrettyPrint(weatherResp))
	} else if errorResp, ok := resp.(weather.ErrorResponse); ok {
		fmt.Println(weather.PrettyPrint(errorResp))
	} else {
		fmt.Println("Unexpected response type")
	}
}
