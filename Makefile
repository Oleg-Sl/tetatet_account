.PHONY: up down migrate cleandb cleanimages volumes


up:
	docker compose up -d

down: 
	docker compose down

migrate:
	docker compose run backend python manage.py makemigrations
	docker compose run backend python manage.py migrate

cleandb:
	docker rmi postgres:alpine

cleanimages:
	docker rmi tetatet_account-backend:latest
	docker rmi tetatet_account-frontend:latest
	docker volume rm tetatet_account_postgres_data

volumes:
	docker volume ls
	
# docker exec -it backend sh
