<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Cylore</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }

        .logo img {
            max-width: 150px;
        }

        .header {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-top: 20px;
        }

        .message {
            font-size: 16px;
            color: #666;
            margin-top: 10px;
        }

        .btn {
            background: #ff4d4d;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            font-size: 16px;
        }

        .footer {
            font-size: 14px;
            color: #999;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
            <img src="{{ asset('images/logo.jpg') }}" alt="Cylore Logo">
        </div>
        <div class="header">
            Welcome, {{ $user->name }}! 🎉
        </div>
        <div class="message">
            ✨ Welcome to the Cylore Family! ✨

            We're thrilled to have you on board! Get ready to explore the finest fashion collections, crafted just for
            you. Elevate your style, embrace confidence, and stand out with every outfit.

            Your fashion journey starts now! 🚀💫
        </div>
        <a href="{{ url('http://127.0.0.1:8000/') }}" class="btn">Start Shopping</a>
        <div class="footer">
            &copy; {{ date('Y') }} Cylore. All Rights Reserved.
        </div>
    </div>
</body>

</html>
