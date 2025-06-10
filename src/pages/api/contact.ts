import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stellarteamcr@gmail.com',
        pass: import.meta.env.GMAIL_APP_PASSWORD
    }
});

export const POST: APIRoute = async ({ request }) => {
    try {
        console.log('Starting contact form submission...');
        
        if (!import.meta.env.GMAIL_APP_PASSWORD) {
            console.error('GMAIL_APP_PASSWORD environment variable is not set');
            return new Response(
                JSON.stringify({
                    message: 'Server configuration error'
                }),
                { status: 500 }
            );
        }
        console.log('Environment variable check passed');

        const formData = await request.formData();
        
        const nombre = formData.get('nombre')?.toString();
        const email = formData.get('email')?.toString();
        const empresa = formData.get('empresa')?.toString();
        const servicio = formData.get('servicio')?.toString();
        const asunto = formData.get('asunto')?.toString();
        const mensaje = formData.get('mensaje')?.toString();

        console.log('Form data received:', { nombre, email, empresa, servicio, asunto });

        // Validaciones
        if (!nombre || !email || !servicio || !asunto || !mensaje) {
            console.error('Missing required fields:', { nombre, email, servicio, asunto, mensaje });
            return new Response(
                JSON.stringify({
                    message: 'All required fields must be completed'
                }),
                { status: 400 }
            );
        }
        console.log('Required fields validation passed');

        // Validar email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.error('Invalid email format:', email);
            return new Response(
                JSON.stringify({
                    message: 'Invalid email format'
                }),
                { status: 400 }
            );
        }
        console.log('Email format validation passed');

        try {
            console.log('Attempting to send email...');
            // Verificar la configuración del transportador
            console.log('Transporter config:', {
                service: 'gmail',
                auth: {
                    user: 'stellarteamcr@gmail.com',
                    pass: import.meta.env.GMAIL_APP_PASSWORD ? 'set' : 'not set'
                }
            });

            // Enviar email
            await transporter.sendMail({
                from: 'stellarteamcr@gmail.com',
                to: 'stellarteamcr@gmail.com',
                subject: `New contact: ${asunto}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                            }
                            .header {
                                background: linear-gradient(135deg, #000B1C 0%, #36DBFF 100%);
                                color: white;
                                padding: 20px;
                                border-radius: 10px 10px 0 0;
                                text-align: center;
                            }
                            .content {
                                background: #f9fafb;
                                padding: 20px;
                                border-radius: 0 0 10px 10px;
                                border: 1px solid #e5e7eb;
                            }
                            .field {
                                margin-bottom: 15px;
                                background: white;
                                padding: 15px;
                                border-radius: 8px;
                                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                            }
                            .label {
                                color: #4F7CEC;
                                font-weight: bold;
                                margin-bottom: 5px;
                                display: block;
                            }
                            .value {
                                color: #1f2937;
                            }
                            .message-box {
                                background: white;
                                padding: 20px;
                                border-radius: 8px;
                                margin-top: 20px;
                                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                            }
                            .footer {
                                text-align: center;
                                margin-top: 20px;
                                color: #6b7280;
                                font-size: 0.875rem;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>🌟 STELLAR CONSULTANTS</h1> 
                            <p>You have received a new request from the contact form</p>
                        </div>
                        
                        <div class="content">
                            <div class="field">
                                <span class="label">Name</span>
                                <div class="value">${nombre}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">Email</span>
                                <div class="value">${email}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">Company</span>
                                <div class="value">${empresa || 'Not specified'}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">Service of Interest</span>
                                <div class="value">${servicio}</div>
                            </div>
                            
                            <div class="field">
                                <span class="label">Subject</span>
                                <div class="value">${asunto}</div>
                            </div>
                            
                            <div class="message-box">
                                <span class="label">Message</span>
                                <div class="value" style="white-space: pre-wrap;">${mensaje}</div>
                            </div>
                            
                            <div class="footer">
                                <p>This message was sent from the Stellar Team contact form</p>
                                <p>© ${new Date().getFullYear()} Stellar Team CR. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            });
            console.log('Email sent successfully');

            return new Response(
                JSON.stringify({ 
                    message: 'Message sent successfully'
                }),
                { status: 200 }
            );
        } catch (emailError: any) {
            console.error('Error sending email - Full error:', emailError);
            console.error('Error sending email - Message:', emailError.message);
            console.error('Error sending email - Stack:', emailError.stack);
            return new Response(
                JSON.stringify({
                    message: 'Error sending email: ' + emailError.message
                }),
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Error processing form - Full error:', error);
        console.error('Error processing form - Message:', error.message);
        console.error('Error processing form - Stack:', error.stack);
        return new Response(
            JSON.stringify({
                message: 'Error processing form: ' + error.message
            }),
            { status: 500 }
        );
    }
}; 