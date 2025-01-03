<!DOCTYPE html>
<html>
<head>
    <title>Invitation to Join {{ $invitation->company->name }}</title>
</head>
<body>
    <h1>You've been invited!</h1>
    <p>Hello,</p>
    <p>You have been invited to join {{ $invitation->company->name }} on our platform.</p>
    <p>To accept this invitation, please click on the link below:</p>
    <a href="{{ route('invitation.accept', $invitation->token) }}">Accept Invitation</a>
    <p>If you didn't expect this invitation, you can safely ignore this email.</p>
    <p>Thank you!</p>
</body>
</html>