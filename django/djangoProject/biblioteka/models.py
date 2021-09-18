from django.db import models

class Books(models.Model):
    title = models.CharField(max_length=250)
    author = models.CharField(max_length=100)
    publish_year = models.SmallIntegerField()  # This field type is a guess.
    category = models.CharField(max_length=100)
    br_komada = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def na_stanju(self):
        return self.br_komada > 0

    class Meta:
        db_table = 'books'


class Categories(models.Model):
    name = models.CharField(unique=True, max_length=100)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'categories'


class History(models.Model):
    member = models.ForeignKey('Members', models.CASCADE)
    book = models.ForeignKey(Books, models.CASCADE)
    start_date = models.DateField()
    return_date = models.DateField()

    class Meta:
        db_table = 'history'


class Loans(models.Model):
    member = models.ForeignKey('Members', models.CASCADE)
    book = models.ForeignKey(Books, models.CASCADE)
    start_date = models.DateField()
    due_date = models.DateField()

    class Meta:
        db_table = 'loans'


class Members(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=200)
    password = models.CharField(max_length=200)
    active = models.IntegerField()
    membership_until = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'members'


class Reservations(models.Model):
    member = models.ForeignKey(Members, models.CASCADE)
    book = models.ForeignKey(Books, models.CASCADE)
    start_date = models.DateField()        

    class Meta:
        db_table = 'reservations'
        unique_together = (('book', 'member', 'start_date'),)
