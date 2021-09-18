from django.db import models
from django.db.models.base import Model
from django.forms import ModelForm, Form, fields
from .models import Books, Categories, Members, Loans


class BooksForm(ModelForm):
    class Meta:
        model = Books
        fields = ['title', 'author', 'publish_year', 'category', 'br_komada']

class AddBooksForm(ModelForm):
    class Meta:
        model = Books
        fields = ['br_komada']

class CategoriesForm(ModelForm):
    class Meta:
        model = Categories
        fields = ['name', 'description']


class MembersForm(ModelForm):
    class Meta:
        model = Members
        fields = ['membership_until']

class AddMemberForm(ModelForm):
    class Meta:
        model = Members
        fields = ['name', 'email', 'password']

class LoansForm(ModelForm):
    class Meta:
        model = Loans
        fields = ['member', 'book', 'start_date', 'due_date']
