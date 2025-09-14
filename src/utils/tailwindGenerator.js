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

  // Convert hex colors to Tailwind-compatible format
  const colorToTailwind = (hexColor, type = 'bg') => {
    // For now, we'll use the hex color directly with arbitrary values
    // In a real implementation, you might want to find the closest Tailwind color
    const result = `${type}-[${hexColor}]`;
    console.log(`colorToTailwind(${hexColor}, ${type}) = ${result}`);
    return result;
  };

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
    primary: colorToTailwind(primaryColor, 'bg'),
    primaryText: colorToTailwind(primaryColor, 'text'),
    primaryBorder: colorToTailwind(primaryColor, 'border'),
    secondary: colorToTailwind(secondaryColor, 'bg'),
    secondaryText: colorToTailwind(secondaryColor, 'text'),
    secondaryBorder: colorToTailwind(secondaryColor, 'border'),
    accent: colorToTailwind(accentColor, 'bg'),
    accentText: colorToTailwind(accentColor, 'text'),
    accentBorder: colorToTailwind(accentColor, 'border'),
    borderRadius: getBorderRadius(),
    buttonRadius: getButtonStyle(),
    spacing: spacingConfig,
    shadow: getShadow(),
    fontFamily: `font-['${fontFamily}']`,
    
    // Hover states
    primaryHover: colorToTailwind(adjustColorBrightness(primaryColor, -10), 'hover:bg'),
    secondaryHover: colorToTailwind(adjustColorBrightness(secondaryColor, -10), 'hover:bg'),
    accentHover: colorToTailwind(adjustColorBrightness(accentColor, -10), 'hover:bg'),
    
    // Focus states
    primaryFocus: `focus:ring-[${primaryColor}]`,
    secondaryFocus: `focus:ring-[${secondaryColor}]`,
    accentFocus: `focus:ring-[${accentColor}]`,
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
