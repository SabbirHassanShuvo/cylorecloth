<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Cylore</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .logo img {
            max-width: 120px;
            margin-bottom: 20px;
        }

        .header {
            font-size: 26px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }

        .message {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .btn {
            background: linear-gradient(135deg, #ff4d4d, #ff6666);
            color: white;
            padding: 14px 24px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            transition: background 0.3s;
        }

        .btn:hover {
            background: linear-gradient(135deg, #ff6666, #ff4d4d);
        }

        .footer {
            font-size: 14px;
            color: #888;
            margin-top: 25px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
            <img src="{{ asset('images/logo.jpg') }}" alt="Cylore Logo">
        </div>
        <div class="header">
            Reset Your Password, {{ $user->name }}
        </div>
        <div class="message">
            We received a request to reset your password. Click the button below to set a new password and regain access
            to your account.
        </div>
        <a href="{{ route('resetpassword', ['token' => $formdata['token']]) }}" class="btn">
            Reset Password
        </a>
        <div class="message" style="margin-top: 15px;">
            If you did not request this, please ignore this email. Your account security is our priority.
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Cylore. All Rights Reserved.
        </div>
    </div>
</body>

</html>
