from django.db.models import query
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from .forms import BooksForm, MembersForm

def index(req):
    return render(req, 'index.html')

def books(req):
    books = Books.objects.all()
    return render(req, 'books.html', {'books': books})

def book(req, id):
    book = Books.objects.get(id=id)
    return render(req, 'book.html')

def add_book(req):

    if req.method == 'POST':
        form = BooksForm(req.POST or None)

        if form.is_valid():
            title = form.cleaned_data['title']
            author = form.cleaned_data['author']
            publish_year = form.cleaned_data['publish_year']
            category = form.cleaned_data['category']
            br_komada = form.cleaned_data['br_komada']

            book = Books(title=title, author=author, publish_year=publish_year, category=category, br_komada=br_komada)
            book.save()
            return redirect('books')

        else:
            return render(req, 'addBook.html', {'form': form})
    else:
        form = BooksForm()
        return render(req, 'addBook.html', {'form': form})

def categories(req):
    return render(req, 'categories.html')

def members(req):
    members = Members.objects.all()
    return render(req, 'members.html', {'members': members})

def member(req, id):
    if req.method == 'POST':
        return
    else:
        member = Members.objects.get(id=id)
        return render(req, 'member.html', {'member': member})

def edit_member(req, id):
    if req.method == 'POST':
        form = MembersForm(req.POST)

        if form.is_valid():
            member = Members.objects.get(id=id)
            member.membership_until = form.cleaned_data['membership_until']
            member.active = form.cleaned_data['active']
            member.save()
            return redirect('members')
        else:
            return render(req, 'editMember.html', {'form': form, 'id': id})
    else:
        member = Members.objects.get(id=id)
        form = MembersForm(instance=member)
        return render(req, 'editMember.html', {'form': form, 'id': id})

