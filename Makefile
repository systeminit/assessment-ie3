.DEFAULT_GOAL=up

.PHONY: build
build:
	docker compose build

.PHONY: build-frontend
build-frontend:
	docker compose build frontend

.PHONY: build-backend
build-backend:
	docker compose build backend

.PHONY: up
up: build
	docker compose up

.PHONY: up-frontend
up-frontend: build-frontend
	docker compose up frontend

.PHONY: up-backend
up-backend: build-backend
	docker compose up backend
