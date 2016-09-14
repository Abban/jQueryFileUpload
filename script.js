/**
 * JS file for manage the files
 */
var files;
$('input[type=file]').on('change', prepareUpload);
function prepareUpload(event) {
  files = event.target.files;
}
$('form#upload_file').on('submit', uploadFiles);
function uploadFiles(event) {
	event.stopPropagation();
	event.preventDefault();
    document.getElementById("loader").style.display = "block";
    var data = new FormData();
    $.each(files, function(key, value) {
    	data.append(key, value);
    });
    $.ajax({
        url: 'upload.php?files',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data, textStatus, jqXHR) {
            if(typeof data.error === 'undefined') {
                submitForm(event, data);
            } else {
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
            document.getElementById("loader").style.display = "none";
        }
    });
}
function submitForm(event, data) {
    $form = $(event.target);
    var formData = $form.serialize();
    $.each(data.files, function(key, value) {
        formData = formData + '&filenames[]=' + value;
    });
    $.ajax({
        url: 'upload.php',
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            if(typeof data.error === 'undefined') {
                console.log('SUCCESS: ' + data.success);
            } else {
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
            document.getElementById("loader").style.display = "none";
        },
        complete: function() {
            document.getElementById("loader").style.display = "none";
            alert('Plik został pomyślnie zapisany!');
        }
    });
}
