import {useState} from "react";
import {Particles} from "@/components/shadcn/Particles.tsx";

interface Service {
  name: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    name: "Software Development",
    description:
      "We build custom software solutions tailored to your unique business challenges. Whether you need a scalable enterprise platform, an internal tool, or a cloud-based application, our team leverages modern technologies and agile methodologies to deliver secure, high-performance systems. From planning to deployment and support, we focus on reliability, integration, and long-term value.",
    icon: "/icons/software-dev.svg"
  },
  {
    name: "Web Design",
    description:
      "We design engaging and user-centered websites that combine aesthetics with functionality. Each site is carefully crafted with intuitive navigation, responsive layouts, and optimized performance across all devices. We follow UX/UI best practices to ensure that your online presence not only looks professional but also drives conversions and user satisfaction.",
    icon: "/icons/web-design-icon.svg"
  },
  {
    name: "Branding",
    description:
      "We help you craft a memorable and consistent brand identity that resonates with your target audience. From logo creation and visual language to brand messaging and voice, we build the foundation for a strong brand presence that inspires trust, recognition, and loyalty. Ideal for new businesses or those seeking a brand refresh.",
    icon: "/icons/branding-icon.svg"
  },
  {
    name: "SEO",
    description:
      "We optimize your website and content to improve visibility on search engines like Google. Our approach includes technical SEO, keyword research, on-page optimization, content strategy, and performance enhancements. The goal is to attract quality traffic organically and turn visits into real business opportunities over time.",
    icon: "/icons/seo-icon.svg"
  }
];


export default function ServicesSelector() {
  const [seleccionado, setSeleccionado] = useState(0);
  const [fade, setFade] = useState(true);

  // Maneja el fade-out y fade-in al cambiar de servicio
  const handleSelect = (idx: number) => {
    if (idx === seleccionado) return;
    setFade(false);
    setTimeout(() => {
      setSeleccionado(idx);
      setFade(true);
    }, 200); // Duración del fade-out
  };

  return (
    <section className="w-full pt-32 md:pt-52 pb-20" aria-labelledby="services-title">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Columna Izquierda */}
        <div>
        <header>
          <h2
            id="services-title"
            className={`text-4xl font-bold mb-2 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            {services[seleccionado].name}
          </h2>
        </header>
        <div>
          <p
            className={`mb-6 text-lg text-gray-600 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            aria-live="polite"
          >
            {services[seleccionado].description}
          </p>
          <div className="flex gap-3">
          <a
            href="/Contact"
            className="inline-block border border-primary-yellow text-primary-yellow hover:bg-primary-cyan/10 rounded-full px-4 py-2 transition-colors"
            role="button"
          >
            Contact
          </a>
          <a
            href="https://calendly.com/stellarteamcr"
            className="inline-block border border-primary-cyan text-primary-cyan hover:bg-primary-cyan/10 rounded-full px-4 py-2 transition-colors"
            role="button"
          >
            Schedule a call
          </a>
          </div>
          </div>
        </div>
        {/* Columna Derecha */}
        <div>
          <nav aria-label="Servicios ofrecidos" className="md:col-span-2 mt-6 md:mt-0">
          <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
            {services.map((service, idx) => (
              <li key={service.name}>
                <button
                  className={
                    `flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-200 border ` +
                    (seleccionado === idx
                      ? 'bg-primary-yellow/90 text-theme-deepblue border-primary-yellow shadow-md -translate-y-1 scale-105'
                      : 'bg-primary-cyan/10 text-primary-cyan border-primary-cyan/30 hover:bg-primary-cyan/20 hover:-translate-y-0.5')
                  }
                  aria-pressed={seleccionado === idx}
                  aria-current={seleccionado === idx ? "true" : undefined}
                  onClick={() => handleSelect(idx)}
                  type="button"
                >
                  <img
                    src={service.icon}
                    alt={`Ícono de ${service.name}`}
                    className="w-5 h-5"
                    loading="lazy"
                  />
                  <span>{service.name}</span>
                  {seleccionado === idx && (
                    <span className="ml-1">
                      <Particles color="black" size={0.5} />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        </div>
      </div>
    </section>
  );
}