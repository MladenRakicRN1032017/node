from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('books', views.books, name='books'),
    path('books/<int:id>/', views.book, name='book'),
    path('books/add', views.add_book, name='add_book'),
    path('books/edit/<int:id>/', views.edit_book, name='edit_book'),
    path('members', views.members, name='members'),
    path('members/add', views.add_member, name='add_member'),
    path('members/<int:id>/', views.member, name='member'),
    path('members/edit/<int:id>/', views.edit_member, name='edit_member'),
    path('reservations', views.reservations, name='reservations'),
    path('reservations/cancel/<int:id>', views.cancel_reservation, name='cancel_reservation'),
    path('reservations/loan/<int:id>', views.make_loan, name='make_loan'),
    path('loans', views.loans, name='loans'),
    path('loans/add', views.add_loan, name='add_loan'),
    path('loans/return/<int:id>', views.return_book, name='return_book'),
    path('categories', views.categories, name='categories'),
    path('categories/add', views.add_category, name='add_category')
]
