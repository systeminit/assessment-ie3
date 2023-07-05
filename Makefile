.PHONY: build
build:
	earthly --allow-privileged +build

.PHONY: frontend
frontend:
	earthly --allow-privileged +frontend

.PHONY: backend
backend:
	earthly --allow-privileged +backend

.PHONY: deploy
deploy:
	cd infra && $(MAKE) deploy

.PHONY: diff
diff:
	cd infra && $(MAKE) diff

.PHONY: destroy
destroy:
	cd infra && $(MAKE) destroy
