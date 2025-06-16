import type { APIRoute } from 'astro';
import Mailjet from 'node-mailjet';

export const POST: APIRoute = async ({ request }) => {
    console.log('Iniciando procesamiento de la solicitud');
    
    try {
        // Verificar que las variables de entorno estén disponibles
        if (!import.meta.env.MJ_API_KEY || !import.meta.env.MJ_SECRET_KEY) {
            console.error('Mailjet API keys not found');
            return new Response(
                JSON.stringify({
                    message: 'Error de configuración del servidor'
                }),
                { 
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        console.log('API keys encontradas, inicializando Mailjet');
        const mailjet = Mailjet.apiConnect(
            import.meta.env.MJ_API_KEY,
            import.meta.env.MJ_SECRET_KEY
        );

        console.log('Procesando formData');
        const formData = await request.formData();
        
        const nombre = formData.get('nombre')?.toString();
        const email = formData.get('email')?.toString();
        const empresa = formData.get('empresa')?.toString();
        const servicio = formData.get('servicio')?.toString();
        const asunto = formData.get('asunto')?.toString();
        const mensaje = formData.get('mensaje')?.toString();

        console.log('Datos recibidos:', { nombre, email, empresa, servicio, asunto });

        // Validaciones
        if (!nombre || !email || !servicio || !asunto || !mensaje) {
            console.log('Validación fallida: campos requeridos faltantes');
            return new Response(
                JSON.stringify({
                    message: 'Todos los campos requeridos deben estar completos'
                }),
                { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        // Validar email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            console.log('Validación fallida: email inválido');
            return new Response(
                JSON.stringify({
                    message: 'El formato del email no es válido'
                }),
                { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        console.log('Iniciando envío de email');
        try {
            const response = await mailjet
                .post("send", { version: 'v3.1' })
                .request({
                    Messages: [
                        {
                            From: {
                                Email: "stellarteamcr@gmail.com",
                                Name: "Stellar Team CR"
                            },
                            To: [
                                {
                                    Email: "stellarteamcr@gmail.com",
                                    Name: "Stellar Team"
                                }
                            ],
                            Subject: `Nuevo contacto: ${asunto}`,
                            TextPart: `
                                Nombre: ${nombre}
                                Email: ${email}
                                ${empresa ? `Empresa: ${empresa}` : ''}
                                Servicio: ${servicio}
                                Asunto: ${asunto}
                                Mensaje: ${mensaje}
                            `,
                            HTMLPart: `
                                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                    <div style="background: linear-gradient(135deg, #000B1C 0%, #36DBFF 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                                        <h1>🌟 STELLAR CONSULTANTS</h1>
                                        <p>Nueva solicitud desde el formulario de contacto</p>
                                    </div>
                                    
                                    <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
                                        <div style="margin-bottom: 15px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                            <strong style="color: #4F7CEC;">Nombre:</strong>
                                            <div>${nombre}</div>
                                        </div>
                                        
                                        <div style="margin-bottom: 15px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                            <strong style="color: #4F7CEC;">Email:</strong>
                                            <div>${email}</div>
                                        </div>
                                        
                                        ${empresa ? `
                                        <div style="margin-bottom: 15px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                            <strong style="color: #4F7CEC;">Empresa:</strong>
                                            <div>${empresa}</div>
                                        </div>
                                        ` : ''}
                                        
                                        <div style="margin-bottom: 15px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                            <strong style="color: #4F7CEC;">Servicio:</strong>
                                            <div>${servicio}</div>
                                        </div>
                                        
                                        <div style="margin-bottom: 15px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                            <strong style="color: #4F7CEC;">Asunto:</strong>
                                            <div>${asunto}</div>
                                        </div>
                                        
                                        <div style="margin-bottom: 15px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                            <strong style="color: #4F7CEC;">Mensaje:</strong>
                                            <div style="white-space: pre-wrap;">${mensaje}</div>
                                        </div>
                                    </div>
                                    
                                    <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 0.875rem;">
                                        <p>Este mensaje fue enviado desde el formulario de contacto de Stellar Team</p>
                                        <p>© ${new Date().getFullYear()} Stellar Team CR. Todos los derechos reservados.</p>
                                    </div>
                                </div>
                            `
                        }
                    ]
                });

            console.log('Respuesta de Mailjet:', response.response.status);
            if (response.response.status === 200) {
                return new Response(
                    JSON.stringify({ 
                        message: 'Mensaje enviado correctamente'
                    }),
                    { 
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            }
            
            throw new Error('Error al enviar el email');
        } catch (error) {
            console.error('Error detallado al enviar email:', error);
            return new Response(
                JSON.stringify({
                    message: 'Error al enviar el email',
                    details: error instanceof Error ? error.message : 'Error desconocido'
                }),
                { 
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }
    } catch (error) {
        console.error('Error detallado procesando el formulario:', error);
        return new Response(
            JSON.stringify({
                message: 'Error al procesar el formulario',
                details: error instanceof Error ? error.message : 'Error desconocido'
            }),
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}; 