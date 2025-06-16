import type { APIRoute } from "astro";
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
    try {
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

      if (!import.meta.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY no configurada');
        return new Response(JSON.stringify({ 
          message: "Error de configuración del servidor",
          details: "API key de Resend no configurada"
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const resend = new Resend(import.meta.env.RESEND_API_KEY);
  
      const { data, error } = await resend.emails.send({
        from: 'Stellar Team <onboarding@resend.dev>',
        to: 'stellarteamcr@gmail.com',
        subject: `Nuevo contacto: ${asunto}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
            <p><strong>Servicio:</strong> ${servicio}</p>
            <p><strong>Asunto:</strong> ${asunto}</p>
            <p><strong>Mensaje:</strong><br/>${mensaje}</p>
          </div>
        `,
        text: `
          Nombre: ${nombre}
          Email: ${email}
          ${empresa ? `Empresa: ${empresa}` : ''}
          Servicio: ${servicio}
          Asunto: ${asunto}
          Mensaje: ${mensaje}
        `
      });
  
      if (error) {
        console.error("Error al enviar email:", error);
        return new Response(JSON.stringify({ 
          message: "Error al enviar email", 
          details: error
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ 
        message: "Mensaje enviado correctamente",
        data
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error inesperado:", error);
      return new Response(JSON.stringify({ 
        message: "Error del servidor", 
        details: error instanceof Error ? error.message : String(error)
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  };
  