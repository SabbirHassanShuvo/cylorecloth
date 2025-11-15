<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Blocked - Cylore</title>
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
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
        }

        .logo img {
            max-width: 150px;
            margin-bottom: 20px;
        }

        .header {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-top: 20px;
        }

        .message {
            font-size: 16px;
            color: #666;
            margin-top: 20px;
        }

        .warning {
            font-size: 18px;
            color: #ff4d4d;
            font-weight: bold;
            margin-top: 15px;
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
            transition: background 0.3s;
        }

        .btn:hover {
            background: #e03e3e;
        }

        .footer {
            font-size: 14px;
            color: #999;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
            <img src="{{ asset('images/logo.jpg') }}" alt="Cylore Logo">
        </div>
        <div class="header">
            Account Blocked
        </div>
        <div class="message">
            We regret to inform you that your account has been temporarily blocked due to certain issues.
            Please contact our support team for assistance or clarification.
        </div>

        <div class="warning">
            ✨ **Important:** If you believe this is a mistake, please reach out to our support team as soon as possible.
        </div>

        <a href="{{ url('http://127.0.0.1:8000/contact') }}" class="btn">Contact Support</a>

        <div class="footer">
            &copy; {{ date('Y') }} Cylore. All Rights Reserved.
        </div>
    </div>
</body>

</html>
