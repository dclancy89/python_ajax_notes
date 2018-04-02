from __future__ import unicode_literals

from django.db import models

# Create your models here.
class NoteManager(models.Manager):
	def validate_note(request, postData):
		errors = {}
		return errors

class Note(models.Model):
	title = models.CharField(max_length=255)
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

