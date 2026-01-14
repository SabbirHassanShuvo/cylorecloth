<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure OTP Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            background: #f8fafc;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1e293b;
        }

        .email-container {
            width: 100%;
            max-width: 480px;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .header {
            background: white;
            padding: 32px 24px;
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
        }

        .logo {
            width: 64px;
            height: 64px;
            background: #f1f5f9;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
        }

        .logo img {
            max-height: 40px;
            width: auto;
        }

        .content {
            padding: 32px 24px;
            text-align: center;
        }

        .title {
            color: #0f172a;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            line-height: 1.3;
        }

        .description {
            color: #64748b;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 32px;
            font-weight: 400;
        }

        .otp-container {
            background: #f8fafc;
            border: 2px solid #cbd5e1;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            display: inline-block;
        }

        .otp {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 12px;
            color: #0f172a;
            font-family: monospace;
        }

        .timer {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 8px 16px;
            display: inline-block;
            margin-top: 16px;
            font-size: 13px;
            font-weight: 600;
            color: #dc2626;
        }

        .footer {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
        }

        .footer a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 600;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .security-note {
            background: #f8fafc;
            border-left: 3px solid #dc2626;
            padding: 12px 16px;
            margin-top: 20px;
            text-align: left;
            border-radius: 0 8px 8px 0;
        }

        .security-note p {
            font-size: 12px;
            color: #64748b;
            line-height: 1.5;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">
                <img src="{{ asset('images/email.png') }}" alt="Logo">
            </div>
        </div>

        <div class="content">
            <h1 class="title">Secure OTP Verification</h1>
            <p class="description">Your security is our priority. Please use the one-time password below to verify your
                identity and access your account securely.</p>

            <div class="otp-container">
                <div class="otp">{{ $otp }}</div>
                <div class="timer">Expires in: 05:00</div>
            </div>

            <div class="security-note">
                <p>🔒 This OTP is valid for 5 minutes only. Never share this code with anyone, including our support
                    team.</p>
            </div>

            <p class="footer">
                If you didn't request this verification, please <a href="#">contact our security team</a>
                immediately.<br>
                © 2026 Cylore. All rights reserved.
            </p>
        </div>
    </div>
</body>

</html>
