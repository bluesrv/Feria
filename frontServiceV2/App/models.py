from djongo import models
from django.contrib.auth.models import  AbstractBaseUser,BaseUserManager
import datetime

# Create your models here.

class Alerts(models.Model):
    id = models.AutoField(primary_key=True)
    date=models.DateField()
    level= models.FloatField()

class Notification(models.Model):
    date=models.DateField()
    level= models.FloatField()

    def __str__(self):
        return self.level


class Usuario2(AbstractBaseUser):

    email = models.EmailField(('email address'), unique=True)
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField(default=datetime.date.today)
    password = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'

    def __str__(self):              # __unicode__ on Python 2
        return self.email

class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, name, date_of_birth, password=None):
        user = self.model(
            email=self.normalize_email(email),
            date_of_birth=date_of_birth,
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, name, date_of_birth, password):
        user = self.create_user(
            email,
            password=password,
            date_of_birth=date_of_birth,
            name=name,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, date_of_birth, password):
        user = self.create_user(
            email,
            password=password,
            date_of_birth=date_of_birth,
            name= "True",
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user
