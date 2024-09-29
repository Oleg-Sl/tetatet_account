from django.db import models
from django.db.models.signals import post_save, post_delete
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.dispatch import receiver


class Task(models.Model):
    STATUS_CHOICES = (
        ('completed', 'Выполнена'),
        ('uncompleted', 'Не выполнена'),
    )

    PRIORITY_CHOICES = (
        ('high', 'Высокий'),
        ('medium', 'Средний'),
        ('low', 'Низкий'),
    )

    title = models.CharField(verbose_name='Заголовок', max_length=255)
    description = models.TextField(verbose_name='Описание')
    status = models.CharField(db_index=True, verbose_name='Статус', max_length=15, choices=STATUS_CHOICES)
    priority = models.CharField(db_index=True, verbose_name='Приоритет', max_length=10, choices=PRIORITY_CHOICES)
    deadline = models.DateTimeField(verbose_name='Дедлайн', blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Создал', on_delete=models.CASCADE, related_name='task', blank=True, null=True)
    date_created = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'

    def __str__(self) -> str:
        return self.title
