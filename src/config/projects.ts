import type { ImageMetadata } from "astro";
import Chepena from "@/assets/proyects/Chepena.webp";
import Zarpe from "@/assets/proyects/Zarpe.webp";
import Erling from "@/assets/proyects/erlingnails.webp";
import BCR from "@/assets/proyects/Bcr.webp";

export interface Project {
    title: string;
    href: string;
    image: ImageMetadata;
    imageAlt: string;
    imageWidth?: string;
    tags: string[];
    isComingSoon?: boolean;
}

export const projects: Project[] = [
    {
        title: "Chepena Restaurant",
        href: "#",
        image: Chepena,
        imageAlt: "Chepena Restaurant Project",
        imageWidth: "74%",
        tags: ["Branding"],
        isComingSoon: false
    },
    {
        title: "Zarpe Landing Page",
        href: "https://zarpe.netlify.app/",
        image: Zarpe,
        imageAlt: "Zarpe Landing Page Project",
        imageWidth: "80%",
        tags: ["Landing Page", "UI/UX", "Design"],
        isComingSoon: false
    },
    {
        title: "Erling Nails",
        href: "https://www.erlingnails.com/",
        image: Erling,
        imageAlt: "Erling Nails Project",
        imageWidth: "70%",
        tags: ["Landing Page", "Web Design", "Development"],
        isComingSoon: false
    },
    {
        title: "BCR",
        href: "#",
        image: BCR,
        imageAlt: "BCR Project",
        imageWidth: "70%",
        tags: ["Web Design", "Development"],
        isComingSoon: false
    }
]; 