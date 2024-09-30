FROM python:3.12-alpine
ENV PYTHONUNBUFFERED=1
WORKDIR /src
COPY . .
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# docker build -t my_django_app .
# docker run -d --name backend -p 8000:8000 my_django_app
