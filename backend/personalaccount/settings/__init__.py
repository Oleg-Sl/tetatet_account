import os
from pathlib import Path
from django.core.exceptions import ImproperlyConfigured
from dotenv import read_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent.parent

read_dotenv(BASE_DIR)

DJANGO_MODULE_STR = str(os.getenv('DJANGO_MODULE_STR'))


if DJANGO_MODULE_STR == 'development':
    from .development import *
else:
    from .production import *
