<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
        <tr>
            <td align="center">
                <!-- Main Card -->
                <table width="100%" cellpadding="0" cellspacing="0"
                    style="max-width: 420px; background:#ffffff; border-radius:8px; padding:30px;">

                    <!-- Logo -->
                    <tr>
                        <td align="center" style="padding-bottom:20px;">
                            <img src="{{ asset('logo.png') }}" alt="Logo" style="max-height:50px;">
                        </td>
                    </tr>

                    <!-- Title -->
                    <tr>
                        <td align="center" style="padding-bottom:10px;">
                            <h2 style="margin:0; color:#111827;">OTP Verification</h2>
                        </td>
                    </tr>

                    <!-- Text -->
                    <tr>
                        <td align="center" style="padding-bottom:20px;">
                            <p style="margin:0; color:#6b7280; font-size:14px;">
                                Use the OTP below to verify your account
                            </p>
                        </td>
                    </tr>

                    <!-- OTP Box -->
                    <tr>
                        <td align="center" style="padding-bottom:20px;">
                            <div
                                style="
                                display:inline-block;
                                padding:14px 24px;
                                font-size:22px;
                                font-weight:bold;
                                letter-spacing:4px;
                                color:#111827;
                                background:#f3f4f6;
                                border-radius:6px;
                            ">
                                {{ $otp }}
                            </div>
                        </td>
                    </tr>

                    <!-- Footer Text -->
                    <tr>
                        <td align="center">
                            <p style="margin:0; font-size:12px; color:#9ca3af;">
                                This OTP will expire in a few minutes.<br>
                                If you didn’t request this, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>
