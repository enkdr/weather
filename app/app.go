package app

import (
	"context"
	"fmt"
	"html/template"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type App struct {
	router    http.Handler
	templates *template.Template
}

func NewApp() *App {

	var templatesPath string
	templatesPath = "app/templates/index.html"

	app := &App{
		templates: template.Must(template.ParseFiles(templatesPath)),
	}

	app.loadRoutes()

	return app
}

func (a *App) Start(ctx context.Context) error {

	server := &http.Server{
		Addr:    ":8001",
		Handler: a.router,
	}

	fmt.Printf("::: starting server on port %s:::", server.Addr)

	ch := make(chan error, 1)

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			ch <- fmt.Errorf("failed to start server: %w", err)
		}
		close(ch)
	}()

	select {
	case err := <-ch:
		return err
	case <-ctx.Done():
		timeout, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()
		return server.Shutdown(timeout)
	}

}

func (a *App) loadRoutes() *chi.Mux {

	fs := http.FileServer(http.Dir("app/static"))

	router := chi.NewRouter()

	router.Use(middleware.Logger)
	router.Handle("/static/*", http.StripPrefix("/static/", fs))
	router.Route("/", a.homeRoute)
	a.router = router

	return router
}

func (a *App) homeRoute(router chi.Router) {

	homeHandler := NewHome(a.templates)
	router.Get("/", homeHandler.HomePage)

}
