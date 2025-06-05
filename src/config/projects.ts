import type { ImageMetadata } from "astro";
import Chepena from "@/assets/proyects/Chepena.webp";
import Zarpe from "@/assets/proyects/Zarpe.webp";
import Erling from "@/assets/proyects/erlingnails.webp";

export interface Project {
    title: string;
    image: ImageMetadata;
    imageAlt: string;
    imageWidth?: string;
    tags: string[];
    isComingSoon?: boolean;
}

export const projects: Project[] = [
    {
        title: "Chepena Restaurant",
        image: Chepena,
        imageAlt: "Chepena Restaurant Project",
        imageWidth: "74%",
        tags: ["Website", "Frontend", "Branding"],
        isComingSoon: false
    },
    {
        title: "Zarpe Landing Page",
        image: Zarpe,
        imageAlt: "Zarpe Landing Page Project",
        imageWidth: "80%",
        tags: ["Landing Page", "UI/UX", "Design"],
        isComingSoon: false
    },
    {
        title: "Erling Nails",
        image: Erling,
        imageAlt: "Erling Nails Project",
        imageWidth: "70%",
        tags: ["Landing Page", "Web Design", "Development"],
        isComingSoon: false
    }
]; 