# Инструкция по запуску проекта

## Шаги для запуска

1. **Клонируйте репозиторий**:

```bash
git clone git@github.com:Oleg-Sl/tetatet_account.git
```

Перейдите в папку проекта:

```bash
cd tetatet_account
```

В папке backend проекта создайте файл .env и добавьте в него следующие ключи:
'''
    DJANGO_MODULE_STR=
    SECRET_KEY=
    EMAIL_HOST_USER=
    EMAIL_HOST_PASSWORD=
    EMAIL_HOST=
    EMAIL_PORT=
    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
'''

Вы можете запустить проект, выполнив один из следующих вариантов:
- выполните скрипт в корневой папке проекта:
```bash
./run.sh
```
- или используйте команду Make:
```bash
make up
```

При успешном запуске будут запущены три контейнера:
    Frontend: доступен по адресу http://localhost:3000/
    Backend: доступен по адресу http://localhost:8000/
    PostgreSQL: доступен по адресу http://localhost:5432/


Примечания
    Убедитесь, что у вас установлены Docker и Docker Compose.
    Перед запуском убедитесь, что все необходимые зависимости и образы Docker загружены.