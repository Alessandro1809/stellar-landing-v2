import type { APIRoute } from 'astro';

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

        // Preparar el contenido del email
        const emailContent = {
            nombre,
            email,
            empresa: empresa || 'No especificada',
            servicio,
            asunto,
            mensaje
        };

        // Aquí la GitHub Action se encargará de enviar el email
        // Guardamos los datos en un archivo temporal que la action procesará
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `contact-form-${timestamp}.json`;

        return new Response(
            JSON.stringify({ 
                message: 'Formulario recibido correctamente',
                fileName,
                emailContent 
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