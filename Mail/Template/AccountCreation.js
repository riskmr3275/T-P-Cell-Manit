exports.AccoutCreate = (firstName) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to [Your Service Name]</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 1.5rem;
            text-align: center;
        }
        .email-body {
            padding: 2rem;
        }
        .email-body h1 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }
        .email-body p {
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            margin: 1rem 0;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 1rem;
            text-align: center;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .next-steps {
            margin-top: 2rem;
        }
        .next-steps h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        .next-steps ul {
            padding-left: 1rem;
        }
        .next-steps ul li {
            margin-bottom: 0.5rem;
        }
        .email-footer {
            background-color: #f4f4f4;
            padding: 1.5rem;
            text-align: center;
            font-size: 0.9rem;
            color: #666;
        }
        .email-footer p {
            margin: 0.5rem 0;
        }
        .social-links {
            margin-top: 1rem;
        }
        .social-links a {
            margin: 0 0.5rem;
            text-decoration: none;
            color: #007bff;
        }
        .social-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="email-header">
            <h1>Welcome to NIT Bhopal</h1>
        </div>

        <!-- Body Section -->
        <div class="email-body">
            <h1>Hello ${firstName},</h1>
            <p>We are excited to have you join us! Your account has been successfully created, and you’re just a few steps away from exploring all that we have to offer.</p>
            <p>Click the button below to Get start :</p>
            <a href="[Verification Link]" class="button">Get start</a>

            <!-- Next Steps Section -->
            <div class="next-steps">
                <h2>What's Next?</h2>
                <ul>
                    <li>Explore our <a href="[Feature Link]">features</a> and discover what Placement cell can do for you.</li>
                    <li>Complete your <a href="[Profile Link]">profile setup</a> to get personalized recommendations.</li>
                    <li>Join our community by following us on social media.</li>
                </ul>
            </div>

            <!-- Support Information -->
            <p>If you have any questions or need assistance, our support team is here to help you. Simply reply to this email or visit our <a href="[Support Link]">support center</a>.</p>
        </div>

        <!-- Footer Section -->
        <div class="email-footer">
            <p>&copy; 2024 T&p cell. All rights reserved.</p>
            <p>462003 Hostel 9 Manit Bhopal</p>

            <!-- Social Media Links -->
            <div class="social-links">
                <a href="[Facebook Link]">Facebook</a> |
                <a href="[Twitter Link]">Twitter</a> |
                <a href="[LinkedIn Link]">LinkedIn</a>
            </div>

            <!-- Unsubscribe Link -->
            <p><a href="[Unsubscribe Link]" style="color: #007bff; text-decoration: underline;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>

`
}