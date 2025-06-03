export interface Button {
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'yellow' | 'cyan';
}

export interface CTASection {
    title: string;
    subtitle?: string;
    description: string;
    buttons: Button[];
    style: {
        background: string;
        textColor: string;
        primaryButtonBg?: string;
        primaryButtonText?: string;
    };
}

export interface CallToActionProps {
    sections?: CTASection[];
    className?: string;
}

export const defaultSections: CTASection[] = [
    {
        title: "Want to know more?",
        subtitle: "",
        description: "Learn more about our personalized services, boost your strategy with us, start today.",
        style: {
            background: "bg-primary-cyan",
            textColor: "text-secondary-blue",
        },
        buttons: [
            {
                text: "Explore our plans",
                href: "/contact",
                variant: "primary"
            },
            {
                text: "More services",
                href: "/contact",
                variant: "secondary"
            }
        ]
    },
    {
        title: "Contact Us",
        subtitle: "",
        description: "Talk to us and get all your questions answered with no commitment",
        style: {
            background: "bg-[#4F7CEC]/20",
            textColor: "text-primary-cyan",
        },
        buttons: [
            {
                text: "Let's talk",
                href: "/contact",
                variant: "primary"
            }
        ]
    }
];

export const getButtonClasses = (variant: string, style: CTASection['style']): string => {
    const baseClasses = "text-center text-lg md:text-xl px-4 py-2 rounded-full transition-all text-nowrap";
    
    switch(variant) {
        case 'primary':
            return `${baseClasses} ${style.primaryButtonBg || 'bg-secondary-blue'} ${style.primaryButtonText || 'text-primary-cyan'} hover:opacity-90 transition-opacity`;
        case 'yellow':
            return `${baseClasses} bg-primary-yellow text-secondary-blue hover:opacity-90 transition-opacity font-semibold`;
        case 'yellow-secondary':
            return `${baseClasses} border border-primary-yellow bg-secondary-blue text-primary-yellow hover:opacity-90 transition-opacity`;
        case 'cyan':
            return `${baseClasses} bg-primary-cyan text-secondary-blue hover:opacity-90 transition-opacity`;
        case 'secondary':
        default:
            return `${baseClasses} border border-secondary-blue ${style.textColor} hover:bg-secondary-blue/10 transition-colors`;
    }
}; 