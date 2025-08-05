# Monorepo commands
install:
	yarn install --frozen-lockfile

lint:
	yarn eslint apps/frontend/src packages/**/src --ext .ts,.tsx

format:
	yarn prettier --write .

dev:
	cd apps/frontend && yarn dev

# Python API
api-dev:
	cd apps/api/image-to-video && make dev

api-install:
	cd apps/api/image-to-video && make install

.PHONY: install lint format dev api-dev api-install
