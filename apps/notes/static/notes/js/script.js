// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
console.log(csrftoken);

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}




$("#new_note").submit(function(e) {
	e.preventDefault();
	console.log("Clickity click!");
    console.log($('#notes').html());

	$.ajax({
		url: $(this).attr('action'),
		method: 'post',
		data: $(this).serialize(),
		success: function(serverResponse) {
			$('#notes').html(serverResponse + $('#notes').html());
			$('#new_note')[0].reset();
		}
	});
});



$("#notes").on("click", "form.note input[type='submit']", function(e){
    e.preventDefault();
    var url = $(this).parent().attr('action') + "/delete";
    var data = $(this).parent().serialize();
    $(this).closest('form.note').remove();

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                console.log("ajax setup called");
            }
        }
    });
    $.ajax({
        url: url,
        method: 'post',
        data: data,
        success: function(serverResponse) {
            console.log('deleted note');
            console.log($('#notes'));
            
        }
    });
});

$("#notes").on("click", ".note p", function(e){
    e.preventDefault();

    $(this).parent().append("<textarea name='content'>" + $(this).text() + "</textarea>")
    $(this).remove();

});

$("#notes").on("focusout", ".note textarea", function(){
    var url = $(this).parent().attr('action') + "/update";
    var data = $(this).parent().serialize();
    
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                console.log("ajax setup called");
            }
        }
    });
    $.ajax({
        url: url,
        method: 'post',
        data: data,
        success: function(serverResponse) {
            console.log('updated note');
            console.log(serverResponse);
            console.log($(this).parent());
            
            
        }
    });
    $(this).parent().append("<p>" + $(this).val() + "</p>");
    $(this).remove();
});




