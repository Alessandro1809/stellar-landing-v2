import { PopupButton } from "react-calendly";

interface CalendlyButtonProps {
  text?: string;
  url?: string;
  rootElement?: HTMLElement;
  variant?: 'primary' | 'secondary' | 'primaryCyan' | 'secondaryCyan' | 'primaryBlue' | 'secondaryBlue';
  className?: string;
}

const CalendlyButton = ({
  text = "Agendar reunión",
  url = "https://calendly.com/stellarteamcr",
  rootElement = document.getElementById("calendly-button") || document.body,
  variant = 'primary',
  className = ""
}: CalendlyButtonProps) => {
  const baseStyles = "px-6 py-3 font-semibold rounded-full transition-colors group flex justify-center items-center gap-2";
  const variants = {
    primary: "bg-primary-yellow text-theme-deepblue hover:bg-primary-yellow/90",
    secondary: "border-2 border-primary-yellow text-white hover:bg-white/10",
    primaryCyan: "bg-primary-cyan text-secondary-blue hover:bg-primary-cyan/80",
    secondaryCyan: "border-2 border-secondary-blue text-primary-cyan hover:bg-secondary-blue/10",
    primaryBlue: "bg-secondary-blue text-primary-cyan hover:bg-secondary-blue/90",
    secondaryBlue: "bg-secondary-blue/30 text-primary-cyan hover:bg-secondary-blue/70"
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <PopupButton
      url={url}
      rootElement={rootElement}
      text={text}
      className={buttonClasses}
    />
  );
};

export default CalendlyButton;