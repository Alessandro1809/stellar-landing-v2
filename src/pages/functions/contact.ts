import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
      // Verificar variables de entorno
      if (!import.meta.env.MJ_API_KEY || !import.meta.env.MJ_SECRET_KEY) {
        console.error('Variables de entorno faltantes:', {
          MJ_API_KEY: !!import.meta.env.MJ_API_KEY,
          MJ_SECRET_KEY: !!import.meta.env.MJ_SECRET_KEY
        });
        return new Response(JSON.stringify({ 
          message: "Error de configuración del servidor",
          details: "Variables de entorno no configuradas"
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const formData = await request.formData();
  
      const nombre = formData.get('nombre')?.toString();
      const email = formData.get('email')?.toString();
      const empresa = formData.get('empresa')?.toString();
      const servicio = formData.get('servicio')?.toString();
      const asunto = formData.get('asunto')?.toString();
      const mensaje = formData.get('mensaje')?.toString();
  
      if (!nombre || !email || !servicio || !asunto || !mensaje) {
        return new Response(JSON.stringify({ message: 'Todos los campos requeridos deben estar completos' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      const auth = btoa(`${import.meta.env.MJ_API_KEY}:${import.meta.env.MJ_SECRET_KEY}`);
  
      console.log('Enviando email a Mailjet...');
      const response = await fetch("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
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
              HTMLPart: `<div style="font-family: Arial, sans-serif;">
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
                <p><strong>Servicio:</strong> ${servicio}</p>
                <p><strong>Asunto:</strong> ${asunto}</p>
                <p><strong>Mensaje:</strong><br/>${mensaje}</p>
              </div>`
            }
          ]
        })
      });
  
      if (response.ok) {
        console.log('Email enviado correctamente');
        return new Response(JSON.stringify({ message: "Mensaje enviado correctamente" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        const errorData = await response.json();
        console.error("Error al enviar email:", errorData);
        return new Response(JSON.stringify({ 
          message: "Error al enviar email", 
          details: errorData,
          status: response.status
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      return new Response(JSON.stringify({ 
        message: "Error del servidor", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  };
  
  // Tipado opcional de variables de entorno
  interface Env {
    MJ_API_KEY: string;
    MJ_SECRET_KEY: string;
  }
  