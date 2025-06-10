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
    showDecorativeLogo?: boolean;
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
            return `${baseClasses} border border-primary-yellow bg-secondary-blue text-primary-yellow hover:bg-secondary-blue/50 transition-opacity`;
        case 'cyan':
            return `${baseClasses} bg-primary-cyan text-secondary-blue hover:opacity-90 transition-opacity`;
        case 'secondary':
        default:
            return `${baseClasses} border border-secondary-blue ${style.textColor} hover:bg-secondary-blue/10 transition-colors`;
    }
}; 


export const callToActionSections = [
    {
        title: "Talk with us",
        subtitle: "Ready for the next step?",
        description: "Communicate openly with us and let's work together on your idea. Feel free to say hello or inquire about a project.",
        style: {
            background: "bg-primary-cyan",
            textColor: "text-secondary-blue",
        },
        buttons: [
            {
                text: "Schedule a meeting",
                href: "/contact",
                variant: "primary"
            },
            {
                text: "Contact us",
                href: "/contact",
                variant: "secondary"
            }
        ]
    },
    {
        title: "Custom Plans",
        subtitle: "Wondering if your business is a good fit?",
        description: "At Stellar, we adapt to your company's needs. We offer both standard and customized plans. Explore what each of our plans offers or let us help you find a plan that suits your business.",
        style: {
            background: "bg-[#4F7CEC]/20",
            textColor: "text-white",
        },
        buttons: [
            {
                text: "Explore our plans",
                href: "/contact",
                variant: "yellow"
            },
            {
                text: "Free consultation",
                href: "/contact",
                variant: "yellow-secondary"
            }
        ]
    }
]

export const callToActionSectionsContact = [
    {
        title: "Check out ourincredible plans",
        subtitle: "Ready for the next step?",
        description: "Communicate openly with us and let's work together on your idea. Feel free to say hello or inquire about a project. Explore our services with total freedom and ask about them",
        style: {
            background: "bg-primary-cyan",
            textColor: "text-secondary-blue",
        },
        buttons: [
            {
                text: "Schedule a meeting",
                href: "/contact",
                variant: "primary"
            },
            {
                text: "Explore our plans",
                href: "/Pricing",
                variant: "secondary"
            }
        ]
    },
    {
        title: "Explore the portfolio",
        subtitle: "Do you have questions or are you interested in seeing our results?",
        description: "We adapt to your company's needs. Discover how we've transformed businesses like yours by exploring our featured projects or learning more about who we are and our mission. Get inspired and let's work together on the next big step for your company!",
        style: {
            background: "bg-[#4F7CEC]/20",
            textColor: "text-white",
        },
        buttons: [
            {
                text: "Portfolio",
                href: "/StellarProjects",
                variant: "yellow"
            },
            {
                text: "About us",
                href: "/About",
                variant: "yellow-secondary"
            }
        ]
    }
]


export const callToActionSectionsPricing = [
    {
        title: "Check out ourincredible plans",
        subtitle: "Ready for the next step?",
        description: "Communicate openly with us and let's work together on your idea. Feel free to say hello or inquire about a project. Explore our services with total freedom and ask about them",
        style: {
            background: "bg-primary-cyan",
            textColor: "text-secondary-blue",
        },
        buttons: [
            {
                text: "Schedule a meeting",
                href: "/contact",
                variant: "primary"
            },
            {
                text: "Contact us",
                href: "/Contact",
                variant: "secondary"
            }
        ]
    },
    {
        title: "Explore the portfolio",
        subtitle: "Do you have questions or are you interested in seeing our results?",
        description: "We adapt to your company's needs. Discover how we've transformed businesses like yours by exploring our featured projects or learning more about who we are and our mission. Get inspired and let's work together on the next big step for your company!",
        style: {
            background: "bg-[#4F7CEC]/20",
            textColor: "text-white",
        },
        buttons: [
            {
                text: "Portfolio",
                href: "/StellarProjects",
                variant: "yellow"
            },
            {
                text: "About us",
                href: "/About",
                variant: "yellow-secondary"
            }
        ]
    }
]