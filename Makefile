# Simple Makefile for a Go project

# Build the application
build:
	@echo "building..."
	@go build -o weather cmd/main.go

# Run the application
run:
	@go run cmd/main.go

watch:
	@echo "watching for file changes..."
	@find . -name "*.go" -o -name "*.html" -o -name "*.css" -o -name "*.js" | entr -r sh -c 'kill -9 $$PID; make run & PID=$$!'
