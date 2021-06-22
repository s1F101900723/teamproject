import datetime
from django.db import models
from django.utils import timezone


class Schedule(models.Model):
    """スケジュール"""
    summary = models.CharField('タイトル', max_length=50)
    description = models.TextField('内容', blank=True)
    start_time = models.TimeField('開始時間', default=datetime.time(7, 0, 0))
    end_time = models.TimeField('終了時間', default=datetime.time(7, 0, 0))
    date = models.DateField('日付')
    created_at = models.DateTimeField('作成日', default=timezone.now)
    category = models.CharField(max_length=256)
    user = models.CharField('ユーザー名', max_length=50)
    def __str__(self):
        return self.summary
