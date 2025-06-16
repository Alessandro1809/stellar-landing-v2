import type { APIRoute } from "astro";

const url = 'https://api.emailjs.com/api/v1.0/email/send';

const serviceId: string = import.meta.env.SECRET_EMAILJS_SERVICE_ID;
const templateId: string = import.meta.env.SECRET_EMAILJS_TEMPLATE_ID;
const userId: string = import.meta.env.SECRET_EMAILJS_USER_ID;

export const POST: APIRoute = async ({ request }) => {
  console.log('Iniciando petición POST a /api/contact');
  console.log('Variables de entorno:', {
    serviceId: serviceId ? 'Configurado' : 'No configurado',
    templateId: templateId ? 'Configurado' : 'No configurado',
    userId: userId ? 'Configurado' : 'No configurado'
  });

  if (!serviceId || !templateId || !userId) {
    console.error('Faltan variables de entorno de EmailJS:', {
      serviceId: !!serviceId,
      templateId: !!templateId,
      userId: !!userId
    });
    return new Response(JSON.stringify({
      message: "Error de configuración del servidor",
      details: "Variables de entorno de EmailJS no configuradas"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.formData();
    console.log('Datos del formulario recibidos');

    const nombre = formData.get('nombre')?.toString();
    const email = formData.get('email')?.toString();
    const empresa = formData.get('empresa')?.toString();
    const servicio = formData.get('servicio')?.toString();
    const asunto = formData.get('asunto')?.toString();
    const mensaje = formData.get('mensaje')?.toString();

    console.log('Datos procesados:', { nombre, email, empresa, servicio, asunto });

    if (!nombre || !email || !servicio || !asunto || !mensaje) {
      console.error('Faltan campos requeridos');
      return new Response(JSON.stringify({ message: 'Todos los campos requeridos deben estar completos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const templateParams = {
      from_name: nombre,
      from_email: email,
      empresa: empresa ?? "No especificada",
      servicio,
      asunto,
      message: mensaje,
    };

    console.log('Preparando envío de email con parámetros:', templateParams);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        template_params: templateParams
      })
    });

    console.log('Respuesta de EmailJS:', {
      status: response.status,
      ok: response.ok
    });

    if (response.ok) {
      console.log('Email enviado correctamente');
      return new Response(JSON.stringify({ message: "Mensaje enviado correctamente" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      const errorData = await response.text();
      console.error("Error al enviar email:", errorData);
      return new Response(JSON.stringify({
        message: "Error al enviar email",
        details: errorData
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
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
