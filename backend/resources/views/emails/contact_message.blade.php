<!DOCTYPE html>
<html>
<head>
    <title>New Contact Us Message</title>
</head>
<body>
    <h2>New Inquiry Received from {{ $messageData->name }}</h2>
    <p><strong>Email:</strong> {{ $messageData->email }}</p>
    <p><strong>Subject:</strong> {{ $messageData->subject }}</p>
    <br>
    <p><strong>Message:</strong></p>
    <p>{!! nl2br(e($messageData->message)) !!}</p>
    <br>
    <p>Login to your Admin Dashboard to manage this message.</p>
</body>
</html>
