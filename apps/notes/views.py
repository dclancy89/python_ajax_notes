from django.shortcuts import render, HttpResponse, redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import *

# Create your views here.
@ensure_csrf_cookie
def index(request):
	notes = Note.objects.all().order_by('-created_at')
	context = {
			'notes': notes
	}
	return render(request, 'notes/index.html', context)

def new_note(request):
	title = request.POST['title']
	content = "Enter description here..."
	note = Note.objects.create(title=title, content=content)
	

	response = '''
		
		<form class="note" action="notes/{}" method="post">
		<h4>{}</h4>
		<input type="submit" value="Delete">
		<br />
		<p>{}</p>
		</form>
		'''.format(note.id, note.title, note.content)
	return HttpResponse(response)

@ensure_csrf_cookie
def delete(request, id):
	note = Note.objects.get(id=id)
	note.delete()

	return redirect('/')

@ensure_csrf_cookie
def update(request, id):
	note = Note.objects.get(id=id)
	note.content = request.POST['content']
	note.save()

	response = note.content

	return HttpResponse(response)