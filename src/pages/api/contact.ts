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
        const formData = await request.formData();
        
        const nombre = formData.get('nombre')?.toString();
        const email = formData.get('email')?.toString();
        const empresa = formData.get('empresa')?.toString();
        const servicio = formData.get('servicio')?.toString();
        const asunto = formData.get('asunto')?.toString();
        const mensaje = formData.get('mensaje')?.toString();

        // Validaciones
        if (!nombre || !email || !servicio || !asunto || !mensaje) {
            return new Response(
                JSON.stringify({
                    message: 'Todos los campos requeridos deben estar completos'
                }),
                { status: 400 }
            );
        }

        // Validar email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({
                    message: 'El formato del email no es válido'
                }),
                { status: 400 }
            );
        }

        // Enviar email
        await transporter.sendMail({
            from: 'stellarteamcr@gmail.com',
            to: 'stellarteamcr@gmail.com',
            subject: `Nuevo contacto: ${asunto}`,
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
                        <p>Has recibido una nueva solicitud desde el formulario de contacto</p>
                    </div>
                    
                    <div class="content">
                        <div class="field">
                            <span class="label">Nombre</span>
                            <div class="value">${nombre}</div>
                        </div>
                        
                        <div class="field">
                            <span class="label">Email</span>
                            <div class="value">${email}</div>
                        </div>
                        
                        <div class="field">
                            <span class="label">Empresa</span>
                            <div class="value">${empresa || 'No especificada'}</div>
                        </div>
                        
                        <div class="field">
                            <span class="label">Servicio de Interés</span>
                            <div class="value">${servicio}</div>
                        </div>
                        
                        <div class="field">
                            <span class="label">Asunto</span>
                            <div class="value">${asunto}</div>
                        </div>
                        
                        <div class="message-box">
                            <span class="label">Mensaje</span>
                            <div class="value" style="white-space: pre-wrap;">${mensaje}</div>
                        </div>
                        
                        <div class="footer">
                            <p>Este mensaje fue enviado desde el formulario de contacto de Stellar Team</p>
                            <p>© ${new Date().getFullYear()} Stellar Team CR. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        return new Response(
            JSON.stringify({ 
                message: 'Mensaje enviado correctamente'
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error procesando el formulario:', error);
        return new Response(
            JSON.stringify({
                message: 'Error al procesar el formulario'
            }),
            { status: 500 }
        );
    }
}; 