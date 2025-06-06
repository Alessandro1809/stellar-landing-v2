import { cn } from "@/lib/utils";
import { Marquee } from "@/components/shadcn/MarqueeComponent";

interface Service {
  name: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    name: "Software Development",
    description: "Build custom software solutions to meet your unique business needs.",
    icon: "/icons/software-dev.svg"
  },
  {
    name: "Web Design",
    description: "Create stunning, user-friendly websites that engage and convert visitors.",
    icon: "/icons/web-design-icon.svg"
  },
  {
    name: "Branding",
    description: "Develop a strong, recognizable brand identity that sets you apart.",
    icon: "/icons/branding-icon.svg"
  },
  {
    name: "SEO",
    description: "Improve your search engine rankings and drive organic traffic to your site.",
    icon: "/icons/seo-icon.svg"
  }
];

const firstRow = services.slice(0, services.length / 2);
const secondRow = services.slice(services.length / 2);

const ServiceCard = ({ name, description, icon }: Service) => {
  return (
    <figure
    
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-6",
        "border-primary-yellow/70 bg-gray-950/[0.3] hover:bg-gray-950/[0.4]",
        "backdrop-blur-sm transition-all duration-300"
      )}
      
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-yellow/10 p-2">
            <img 
              src={icon} 
              alt={name} 
              width="24"
              height="24"
              style={{
                filter: "invert(89%) sepia(42%) saturate(1033%) hue-rotate(24deg) brightness(107%) contrast(103%)"
              }}
              className="h-6 w-6"
            />
          </div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </figure>
  );
};

export function ServicesMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden "
    style={{
        
        WebkitMaskImage:
        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:
        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    }}>
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s]">
        {secondRow.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </Marquee>
    
    </div>
  );
}
