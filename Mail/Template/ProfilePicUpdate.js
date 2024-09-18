exports.ProfilePicUpdate=()=>
    {
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile Update Successful</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(to right, #00c6ff, #0072ff);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
    
            .container {
                text-align: center;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                padding: 30px;
                max-width: 500px;
                width: 100%;
                animation: fadeIn 1s ease-in-out;
            }
    
            .success-icon {
                font-size: 80px;
                color: #4caf50;
                margin-bottom: 20px;
            }
    
            .message {
                margin-top: 20px;
                font-size: 1.1em;
                color: #333;
                line-height: 1.6;
            }
    
            .address {
                margin-top: 20px;
                font-size: 1em;
                color: #555;
            }
    
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 25px;
                font-size: 1.1em;
                color: #ffffff;
                background-color: #4caf50;
                border: none;
                border-radius: 8px;
                text-decoration: none;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;
            }
    
            .button:hover {
                background-color: #45a049;
                transform: scale(1.05);
            }
    
            .button:active {
                transform: scale(0.95);
            }
    
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">&#10004;</div>
            <div class="message">
                <p>Your profile has been updated successfully!</p>
                <p>Thank you for keeping your information up to date.</p>
            </div>
            <div class="address">
                <p>Visit us at:</p>
                <p>Wave Learn</p>
                <p>Hostel 9, MANIT</p>
                <p>Bhopal, Madhya Pradesh</p>
            </div>
            <a href="http://localhost:3000/dashboard/my-profile" class="button">Go to Profile</a>
        </div>
    </body>
    </html>
    `
    }