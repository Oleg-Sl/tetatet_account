.PHONY: up down migrate


up:
	docker compose up -d

down: 
	docker compose down

migrate:
	docker compose run backend python manage.py makemigrations
	docker compose run backend python manage.py migrate

cleandb:
	docker volume rm tetatet_account_pgdb

# docker exec -it backend sh