.DEFAULT_GOAL=up

.PHONY: build
build:
	docker compose build

.PHONY: build-ui
build-ui:
	docker compose build ui

.PHONY: build-api
build-api:
	docker compose build api

.PHONY: up
up: build
	docker compose up

.PHONY: up-ui
up-ui: build-ui
	docker compose up ui

.PHONY: up-api
up-api: build-api
	docker compose up api
