package app

import (
	"context"
	"encoding/json"
	"fmt"
	"get-weather/pkg/weather"
	"html/template"
	"log"
	"net/http"
	"time"
)

type App struct {
	server    *http.Server
	templates *template.Template
	mux       *http.ServeMux // Replace chi.Mux with http.ServeMux
}

func NewApp() *App {
	var templatesPath string
	templatesPath = "app/templates/index.html"

	app := &App{
		templates: template.Must(template.ParseFiles(templatesPath)),
		mux:       http.NewServeMux(), // Initialize the ServeMux
	}

	app.loadRoutes()

	return app
}

func (a *App) Start(ctx context.Context) error {
	a.server = &http.Server{
		Addr:    ":8001",
		Handler: a.mux, // Set the ServeMux as the handler
	}

	fmt.Printf("::: starting server on port %s:::", a.server.Addr)

	go func() {
		err := a.server.ListenAndServe()
		if err != nil {
			fmt.Printf("failed to start server: %s\n", err)
		}
	}()

	select {
	case <-ctx.Done():
		timeout, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()
		return a.server.Shutdown(timeout)
	}
}

func (a *App) loadRoutes() {
	fs := http.FileServer(http.Dir("app/static"))

	a.mux.Handle("/static/", http.StripPrefix("/static/", fs))
	a.mux.HandleFunc("/", a.homeRoute)
	a.mux.HandleFunc("GET /weather/{locale}", a.weatherRoute)
}

func (a *App) homeRoute(w http.ResponseWriter, r *http.Request) {
	homeHandler := NewHome(a.templates)
	homeHandler.HomePage(w, r)
}

func (a *App) weatherRoute(w http.ResponseWriter, r *http.Request) {

	locale := r.PathValue("locale")

	resp, err := weather.GetWeather(locale)
	if err != nil {
		log.Println(err)
		http.Error(w, "Failed to fetch weather data", http.StatusInternalServerError)
		return
	}

	// Marshal the response to JSON
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Println("Failed to marshal JSON response:", err)
		http.Error(w, "Failed to process weather data", http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")

	// Write JSON response to the client
	w.Write(jsonResp)
}
