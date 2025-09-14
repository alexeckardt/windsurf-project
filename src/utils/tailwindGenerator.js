export const generateTailwindClasses = (brandConfig) => {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    borderRadius,
    spacing,
    buttonStyle,
    shadowStyle,
    fontFamily,
    brandPersonality
  } = brandConfig;

  // Debug: Log the input brand config
  console.log('generateTailwindClasses input:', brandConfig);
  console.log('primaryColor:', primaryColor);

  const getBorderRadius = () => {
    switch (borderRadius) {
      case 'small': return 'rounded';
      case 'medium': return 'rounded-lg';
      case 'large': return 'rounded-xl';
      default: return 'rounded-lg';
    }
  };

  const getSpacing = () => {
    switch (spacing) {
      case 'tight': return { x: 'px-3', y: 'py-1.5', gap: 'gap-2' };
      case 'medium': return { x: 'px-4', y: 'py-2', gap: 'gap-4' };
      case 'loose': return { x: 'px-6', y: 'py-3', gap: 'gap-6' };
      default: return { x: 'px-4', y: 'py-2', gap: 'gap-4' };
    }
  };

  const getShadow = () => {
    switch (shadowStyle) {
      case 'none': return '';
      case 'subtle': return 'shadow-sm';
      case 'prominent': return 'shadow-lg';
      default: return 'shadow-sm';
    }
  };

  const getButtonStyle = () => {
    switch (buttonStyle) {
      case 'square': return 'rounded-none';
      case 'pill': return 'rounded-full';
      case 'rounded': return getBorderRadius();
      default: return getBorderRadius();
    }
  };

  const spacingConfig = getSpacing();

  return {

    // Base Colors
    primary: 'bg-brand-primary',
    primaryText: 'text-brand-primary',
    primaryBorder: 'border border-brand-primary',
    secondary: 'bg-brand-secondary',
    secondaryText: 'text-brand-secondary-text',
    secondaryBorder: 'border border-brand-secondary',
    accent: 'bg-brand-accent',
    accentText: 'text-brand-accent-text',
    accentBorder: 'border border-brand-accent',
    
    // Base Styles
    borderRadius: getBorderRadius(),
    buttonRadius: getButtonStyle(),
    spacing: spacingConfig,
    shadow: getShadow(),
    fontFamily: `font-['${fontFamily}']`,
    
    // Hover states
    primaryHover: 'hover:bg-brand-primary',
    primaryHoverDark: 'hover:bg-brand-primary-hover',
    secondaryHover: 'hover:bg-brand-secondary',
    secondaryHoverDark: 'hover:bg-brand-secondary-hover',
    accentHover: 'hover:bg-brand-accent',
    accentHoverDark: 'hover:bg-brand-accent-hover',
    
    // Focus states
    primaryFocus: 'focus:ring-brand-primary',
    secondaryFocus: 'focus:ring-brand-secondary',
    accentFocus: 'focus:ring-brand-accent',
  };
};

// Helper function to adjust color brightness
const adjustColorBrightness = (hex, percent) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
};
