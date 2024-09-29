from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, first_name, date_of_birth, password=None):
        user = self.model(
            email=self.normalize_email(email),
            date_of_birth=date_of_birth,
            first_name=first_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, date_of_birth, password):
        user = self.create_user(
            email,
            password=password,
            date_of_birth=date_of_birth,
            first_name=first_name,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='e-mail', unique=True)
    date_of_birth = models.DateField(verbose_name='birth date', null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'date_of_birth', 'last_name']

    objects = CustomUserManager()
  
    def __str__(self):
        return f'{self.id}. {self.first_name} - {self.last_name}'

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()
