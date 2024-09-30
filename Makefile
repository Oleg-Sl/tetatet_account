.PHONY: up down migrate


up:
	docker compose up -d

down: 
	docker compose down

migrate: up down
	docker compose run backend python manage.py makemigrations
	docker compose run backend python manage.py migrate

