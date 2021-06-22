from django.urls import path
from . import views

#urlpatterns = [
    #path(r'', views.top),
    #path(r'schedules/', views.index, name='index'),
    #path(r'schedules/create/', views.create, name='create'),
    #path(r'schedules/<int:id>/', views.detail, name='detail'),
#]


app_name = 'schedules'

urlpatterns = [
    #path(r'', views.Main),
    #path(r'week_with_schedule/', views.WeekWithScheduleCalendar.as_view(), name='week_with_schedule'),
    #path(
    #    r'week_with_schedule/<int:year>/<int:month>/<int:day>/',
    #    views.WeekWithScheduleCalendar.as_view(),
    #    name='week_with_schedule'
    #),
    #path(r'month_with_schedule/', views.MonthWithScheduleCalendar.as_view(), name='month_with_schedule'),
    path(
        r'',
        views.MonthWithScheduleCalendar.as_view(), name='month_with_schedule'
    ),
    path(
        r'month_with_schedule/<int:year>/<int:month>/',
        views.MonthWithScheduleCalendar.as_view(), name='month_with_schedule'
    ),
    path(r'mycalendar/', views.MyCalendar.as_view(), name='mycalendar'),
    path(
        r'mycalendar/<int:year>/<int:month>/<int:day>/', views.MyCalendar.as_view(), name='mycalendar'
    ),
    path(
        r'week2/<int:year>/<int:month>/<int:day>/', views.Week2WithScheduleCalendar.as_view(), name='week2'
    ),
    path(
        r'week2/', views.Week2WithScheduleCalendar.as_view(), name='week2'
    ),
    path(
        r'week3/<int:schedule_id>/', views.delete, name='week3'
    ),
    #path(r'day_with_schedule/<int:year>/<int:month>/<int:day>/', views.day_with_schedule, name='day_with_schedule'),
    #path(r'day_with_schedule/', views.day_with_schedule, name='day_with_schedule'),
    #path(r'<int:schedule_id>/', views.detail, name='detail'),
    #path(r'<int:schedule_id>/delete', views.delete, name='delete'),
    #path(r'<int:schedule_id>/update', views.update, name='update'),
]
