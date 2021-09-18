from django.contrib.messages.api import success
from django.db.models import query
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse
from datetime import timedelta, date
from .models import *
from .forms import AddBooksForm, AddMemberForm, BooksForm, CategoriesForm, LoansForm, MembersForm
import requests


def index(req):
    return render(req, 'index.html')

def books(req):
    books = Books.objects.all()
    return render(req, 'books.html', {'books': books})

def book(req, id):
    book = Books.objects.get(id=id)
    return render(req, 'book.html', {'book': book})

def add_book(req):
    categories = Categories.objects.all()
    if req.method == 'POST':
        form = BooksForm(req.POST)

        if form.is_valid():
            title = form.cleaned_data['title']
            author = form.cleaned_data['author']
            publish_year = form.cleaned_data['publish_year']
            category = form.cleaned_data['category']
            br_komada = form.cleaned_data['br_komada']

            book = Books(title=title, author=author, publish_year=publish_year, category=category, br_komada=br_komada)
            book.save()
            messages.success(req, 'Knjiga uspesno dodata.')
            return redirect('books')

        else:
            return render(req, 'addBook.html', {'form': form, 'categories': categories})
    else:
        form = BooksForm()
        return render(req, 'addBook.html', {'form': form, 'categories': categories})


def edit_book(req, id):
    if req.method == 'POST':
        form = AddBooksForm(req.POST)
        book = Books.objects.get(id=id)
        if form.is_valid():
            br_komada = form.cleaned_data['br_komada']
            book.br_komada = book.br_komada + br_komada
            book.save()
            return redirect('book', book.id)
        else:
            return render(req, 'editBook.html', {'form': form, 'book': book})
    else:
        book = Books.objects.get(id=id)
        form = AddBooksForm()
        return render(req, 'editBook.html', {'form': form, 'book': book})



def members(req):
    members = Members.objects.all()
    return render(req, 'members.html', {'members': members})


def add_member(req):
    if req.method == 'POST':
        form = AddMemberForm(req.POST)

        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            # Fetch na node, koji je zaduzen za registraciju korisnika
            url = 'http://localhost:8000/members/register'
            data = {"name": name, "email": email, "password": password}
            r = requests.post(url,json=data)
            if r.status_code == 200:
                messages.success(req, 'Korisnik je uspesno dodat.')
            else:
                messages.error(req, 'Doslo je do greske!')
            return redirect('members')
    else:
        form = AddMemberForm
        return render(req, 'addMember.html', {'form': form})

def member(req, id):
    if req.method == 'POST':
        member = Members.objects.get(id=id)
        if member.active == 1:
            member.active = 0
        else:
            member.active = 1
        member.save()
        return redirect('members')
    else:
        member = Members.objects.get(id=id)
        return render(req, 'member.html', {'member': member})

def edit_member(req, id):
    if req.method == 'POST':
        form = MembersForm(req.POST)

        if form.is_valid():
            member = Members.objects.get(id=id)
            member.membership_until = form.cleaned_data['membership_until']
            member.save()
            return redirect('members')
        else:
            return render(req, 'editMember.html', {'form': form, 'id': id})
    else:
        member = Members.objects.get(id=id)
        form = MembersForm(instance=member)
        return render(req, 'editMember.html', {'form': form, 'id': id})


def reservations(req):
    reservations = Reservations.objects.select_related('book', 'member').all()
    return render(req, 'reservations.html', {'reservations': reservations})

def make_loan(req, id):
    # Make loan
    reservation = Reservations.objects.get(id=id)
    member = reservation.member
    book = reservation.book
    start_date = reservation.start_date
    due_date = start_date + timedelta(days=10)
    if book.na_stanju:
        book.br_komada = book.br_komada - 1
        book.save()
        loan = Loans(member=member, book=book, start_date=start_date, due_date=due_date)
        loan.save()
        # Delete from reservations
        messages.success(req, 'Knjiga je dodata u pozajmice.')
        reservation.delete()
    else:
        messages.error(req, 'Greska: nema dovoljno knjiga na stanju')  
    return redirect('reservations')


def cancel_reservation(req, id):
    # Delete from reservations
    reservation = Reservations.objects.get(id=id)
    reservation.delete()
    messages.warning(req, 'Rezervacija je ponistena.')
    return redirect('reservations')


def loans(req):
    loans = Loans.objects.select_related('book', 'member').all()
    return render(req, 'loans.html', {'loans': loans})


def add_loan(req):
    members = Members.objects.all()
    books = Books.objects.all()
    if req.method == 'POST':
        form = LoansForm(req.POST)

        if form.is_valid():
            member = form.cleaned_data['member']
            book = form.cleaned_data['book']
            start_date = form.cleaned_data['start_date']
            due_date = form.cleaned_data['due_date']
            
            if book.na_stanju:
                loan = Loans(member=member, book=book, start_date=start_date, due_date=due_date)
                loan.save()
                # Smanjujemo broj knjiga na stanju
                book.br_komada = book.br_komada - 1
                book.save()
                messages.success(req, 'Knjiga je uspesno dodata u pozajmice.')

            else:
                messages.warning(req, 'Nema dovoljno knjiga na stanju!')

            return redirect('loans')

        else:
            return render(req, 'addLoan.html', {'form': form, 'members': members, 'books': books})
    else:
        form = LoansForm()
        return render(req, 'addLoan.html', {'form': form, 'members': members, 'books': books})


def return_book(req, id):
    if req.method == 'POST':
        loan = Loans.objects.get(id=id)
        # Dodamo loan u history
        history = History(member=loan.member, book=loan.book, start_date=loan.start_date, return_date=date.today())
        history.save()
        # Izbrisemo iz pozajmica
        loan.delete()
        messages.warning(req, 'Knjiga je vracena.')
        # Dodamo br_komada knjige
        book = loan.book
        book.br_komada = book.br_komada + 1
        book.save()

    return redirect('loans')


def categories(req):
    categories = Categories.objects.all()
    return render(req, 'categories.html', {'categories': categories})

def add_category(req):
    if req.method == 'POST':
        form = CategoriesForm(req.POST)

        if form.is_valid():
            name = form.cleaned_data['name']
            desc = form.cleaned_data['description']

            category = Categories(name=name, description=desc)
            category.save()
            messages.success(req, 'Uspesno ste dodali kategoriju.')

        else:
            messages.warning(req, 'Doslo je do greske!')
        return redirect('categories')
    else:
        form = CategoriesForm()
        return render(req, 'addCategory.html', {'form': form})