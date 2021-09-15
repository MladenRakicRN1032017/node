from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('books', views.books, name='books'),
    path('books/<int:id>/', views.book, name='book'),
    path('books/add', views.add_book, name='add_book'),
    path('members', views.members, name='members'),
    path('members/<int:id>/', views.member, name='member'),
    path('members/edit/<int:id>', views.edit_member, name='edit_member'),
    path('categories', views.categories, name='categories'),
]
