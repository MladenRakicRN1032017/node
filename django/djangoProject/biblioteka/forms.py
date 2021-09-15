from django.db import models
from django.db.models.base import Model
from django.forms import ModelForm, Form, fields
from .models import Books, Members, Loans


class BooksForm(ModelForm):
    class Meta:
        model = Books
        fields = ['title', 'author', 'publish_year', 'category', 'br_komada']


class MembersForm(ModelForm):
    class Meta:
        model = Members
        fields = ['active', 'membership_until']
