build:
	docker-compose build

down:
	docker-compose down

stop:
	docker-compose stop

start:
	docker-compose up -d

logs:
	docker-compose logs -f

images:
	docker-compose images
