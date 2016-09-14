<?php
$data = array();
if (isset($_GET['files'])) {
    $error = false;
    $files = array();
    $uploaddir = './../'; //enter the right path to the directory with uploaded files
    foreach ($_FILES as $file) {
        if (move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name']))) {
            $files[] = $uploaddir .$file['name'];
        }
        else {
            $error = true;
        }
    }
    $data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);
}
else {
    $data = array('success' => 'Form was submitted', 'formData' => $_POST);
}
echo json_encode($data);
