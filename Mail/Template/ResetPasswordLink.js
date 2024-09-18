exports.ResetPasswordLink=(Link)=>{ 
    const template = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Reset Password Link</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
            }
            
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
                text-align: center;
                color: #333;
            }
            
            p {
                margin-bottom: 20px;
                color: #666;
            }
            
            .reset-link {
                display: block;
                text-align: center;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
            
            .reset-link:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Reset Password</h1>
            <p>Click the button below to reset your password:</p>
            <a href=${Link} class="reset-link">Reset Password</a>
        </div>
    </body>
    </html>
    `;
    
    return template;
}

 