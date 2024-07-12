package main

import (
	"context"
	"fmt"
	"get-weather/app"
	"os"
	"os/signal"
)

func main() {

	app := app.NewApp()

	fmt.Println("initialising new app")

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, os.Kill)
	defer cancel()

	err := app.Start(ctx)

	if err != nil {
		fmt.Println("failed to start app", err)
	}

	fmt.Println(app)

}
