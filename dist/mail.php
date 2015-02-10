<?php
// Check for empty fields
//if(empty($_POST['name'])  		||
//    empty($_POST['phone']) 		||
//    empty($_POST['message'])	||
//    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
//{
//    echo "No arguments Provided!";
//    return false;
//}

$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$hour = $_POST['hour'];
$minute = $_POST['minute'];
$userip = ($_SERVER['X_FORWARDED_FOR']) ? $_SERVER['X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];

// $message .= "\n\nUser's IP: ". $userip;

// Create the email and send the message
$to = 'ionmnl@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "New message from your website contact form.\n\n"."DETAILS:\n\nName: $name\n\nPhone: $phone\n\nMessage:\n\n$message\n\n"."Like Time: $hour : $minute\n\n "."=======================\nUser's IP: $userip";
$headers = "From: noreply@metaform.me\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
mail($to,$email_subject,$email_body,$headers);
return true;
?>