# Generated by Django 2.2.5 on 2020-01-23 18:29

import datetime
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('summary', models.CharField(max_length=50, verbose_name='タイトル')),
                ('description', models.TextField(blank=True, verbose_name='内容')),
                ('start_time', models.TimeField(default=datetime.time(7, 0), verbose_name='開始時間')),
                ('end_time', models.TimeField(default=datetime.time(7, 0), verbose_name='終了時間')),
                ('date', models.DateField(verbose_name='日付')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='作成日')),
                ('category', models.CharField(max_length=256)),
                ('user', models.CharField(max_length=50, verbose_name='ユーザー名')),
            ],
        ),
    ]