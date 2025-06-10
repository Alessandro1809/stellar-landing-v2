import { cn } from "@/lib/utils";
import { Marquee } from "@/components/shadcn/MarqueeComponent";

interface Service {
  name: string;
  company: string;
  description: string;
}

const opiniones: Service[] = [
  {
    name: "Erling Vargas",
    company: "Independent Professional - Erling Nails",
    description: "Working with STELLAR has been an incredible experience. The website they developed completely exceeded our expectations. We are very satisfied with the final result and the professionalism of the entire team.",
  },
  {
    name: "Dayana Hernández",
    company: "Founder - Chepeña da Fonda, Zarpe Catering Service",
    description: "The branding and website development work that STELLAR did for our restaurant was exceptional. They perfectly captured the essence of our brand and helped us stand out in a highly competitive market",
  },
  {
    name: "Leonel Sevilla",
    company: "Founder - Soluciones Leo",
    description: "STELLAR's creativity and professionalism exceeded all our expectations. Our website is not only visually impressive, but it has also significantly increased our conversions",
  },
  {
    name: "Ana Martínez",
    company: "Entrepreneur - Various Services",
    description: "Thanks to the marketing strategies implemented by STELLAR, our online visibility has multiplied. We have seen a significant increase in our sales",
  }
];

const firstRow = opiniones.slice(0, opiniones.length / 2);
const secondRow = opiniones.slice(opiniones.length / 2);

const TestimonialCard = ({ name, company, description }: Service) => {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl p-6",
        "bg-[#4F7CEC]/20 hover:bg-[#4F7CEC]/25",
        "backdrop-blur-sm transition-all duration-300"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-300/80">{company}</p>
        </div>
        <p className="text-sm text-white/90">{description}</p>
      </div>
    </figure>
  );
};

export function TestimonialsMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden py-10"
    style={{
        WebkitMaskImage:
        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:
        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    }}>
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((service) => (
          <TestimonialCard key={service.name} {...service} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((service) => (
          <TestimonialCard key={service.name} {...service} />
        ))}
      </Marquee>
    </div>
  );
}
