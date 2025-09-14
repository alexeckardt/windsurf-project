import { generateTailwindClasses } from './tailwindGenerator';
import { componentTemplates, magicAnimations, ComponentVariants, ComponentVariantTypes } from './componentTemplates';

export const generateComponentLibrary = (brandConfig) => {
  const tailwindClasses = generateTailwindClasses(brandConfig);
  const components = {};

  // Generate each component type with variant classes instead of full code
  Object.keys(componentTemplates).forEach(componentType => {
    components[componentType] = generateComponent(
      componentType,
      componentTemplates[componentType],
      brandConfig,
      tailwindClasses
    );
  });

  return {
    components,
    tailwindClasses,
    brandConfig,
    magicAnimations,
    componentVariants: ComponentVariants,
    componentVariantTypes: ComponentVariantTypes
  };
};

const generateComponent = (componentType, template, brandConfig, tailwindClasses) => {
  // Generate CVA variant configuration instead of full component code
  const variantConfig = generateVariantConfig(componentType, template, brandConfig, tailwindClasses);
  
  return {
    name: template.name,
    description: template.description,
    category: template.category,
    variantConfig,
    // Keep individual variants for backward compatibility
    variants: template.variants.reduce((acc, variant) => {
      acc[variant.name] = {
        name: variant.name,
        description: variant.description,
        props: variant.props || []
      };
      return acc;
    }, {})
  };
};

const generateVariantConfig = (componentType, template, brandConfig, tailwindClasses) => {
  const config = {
    baseClasses: '',
    variants: {},
    defaultVariants: {}
  };

  // Debug: Log what tailwindClasses contains
  console.log('tailwindClasses in generateVariantConfig:', tailwindClasses);
  console.log('tailwindClasses.primary:', tailwindClasses.primary);

  // Extract base classes and variant configurations from template
  switch (componentType) {
    case 'Button':
      config.baseClasses = `inline-flex items-center justify-center ${tailwindClasses.borderRadius} ${tailwindClasses.fontFamily} font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`;
      config.variants = {
        variant: {
          primary: `${tailwindClasses.primary} text-white ${tailwindClasses.shadow} ${tailwindClasses.primaryHover} ${tailwindClasses.primaryFocus}`,
          secondary: `bg-white ${tailwindClasses.secondaryBorder} border ${tailwindClasses.secondaryText} ${tailwindClasses.shadow} hover:bg-gray-50 ${tailwindClasses.secondaryFocus}`,
          outline: `bg-transparent ${tailwindClasses.primaryBorder} border-2 ${tailwindClasses.primaryText} ${tailwindClasses.primaryHover} hover:text-white ${tailwindClasses.primaryFocus}`,
          ghost: `bg-transparent ${tailwindClasses.primaryText} hover:bg-gray-100 ${tailwindClasses.primaryFocus}`,
          destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
          magic: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-500 animate-gradient-x bg-[length:400%_400%] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
          "magic-dark": "bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500 animate-pulse relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-400/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
          "magic-rainbow": "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-2xl focus:ring-pink-500 animate-gradient-xy bg-[length:400%_400%] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-45deg before:from-transparent before:via-white/25 before:to-transparent before:translate-x-[-100%] before:translate-y-[-100%] hover:before:translate-x-[100%] hover:before:translate-y-[100%] before:transition-transform before:duration-1000"
        },
        size: {
          sm: `${tailwindClasses.spacing.x} ${tailwindClasses.spacing.y} text-sm`,
          md: "px-4 py-2 text-base",
          lg: "px-6 py-3 text-lg",
          xl: "px-8 py-4 text-xl"
        }
      };
      config.defaultVariants = {
        variant: "primary",
        size: "md"
      };
      break;

    default:
      // For other components, use basic configuration
      config.baseClasses = "inline-flex items-center";
      config.variants = {
        variant: {
          default: "bg-gray-100 text-gray-900"
        }
      };
      config.defaultVariants = {
        variant: "default"
      };
  }

  return config;
};

const generateComponentCode = (componentType, variant, brandConfig, tailwindClasses) => {
  let code = variant.template;

  // Replace placeholders with actual brand-specific classes
  const replacements = {
    '{{PRIMARY_COLOR}}': tailwindClasses.primary,
    '{{SECONDARY_COLOR}}': tailwindClasses.secondary,
    '{{ACCENT_COLOR}}': tailwindClasses.accent,
    '{{PRIMARY_HOVER}}': tailwindClasses.primaryHover,
    '{{PRIMARY_FOCUS}}': tailwindClasses.primaryFocus,
    '{{PRIMARY_BORDER}}': tailwindClasses.primaryBorder,
    '{{PRIMARY_TEXT}}': tailwindClasses.primaryText,
    '{{SECONDARY_BORDER}}': tailwindClasses.secondaryBorder,
    '{{SECONDARY_TEXT}}': tailwindClasses.secondaryText,
    '{{SECONDARY_FOCUS}}': tailwindClasses.secondaryFocus,
    '{{BORDER_RADIUS}}': tailwindClasses.borderRadius,
    '{{SPACING.x}}': tailwindClasses.spacing.x,
    '{{SPACING.y}}': tailwindClasses.spacing.y,
    '{{SPACING}}': tailwindClasses.spacing,
    '{{FONT_FAMILY}}': tailwindClasses.fontFamily,
    '{{SHADOW}}': tailwindClasses.shadow,
    '{{COMPANY_NAME}}': brandConfig.companyName
  };

  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    code = code.replace(new RegExp(placeholder, 'g'), replacement);
  });

  // Apply brand personality specific modifications
  code = applyPersonalityModifications(code, brandConfig.brandPersonality);

  return code;
};

const applyPersonalityModifications = (code, personality) => {
  switch (personality) {
    case 'playful':
      // Add more vibrant colors and animations
      code = code.replace(/hover:bg-/g, 'hover:bg-')
                 .replace(/transition-colors/g, 'transition-all transform hover:scale-105');
      break;
    case 'minimal':
      // Remove shadows and simplify
      code = code.replace(/shadow-\w+/g, '')
                 .replace(/border-\w+/g, 'border-gray-200');
      break;
    case 'bold':
      // Increase font weights and shadows
      code = code.replace(/font-medium/g, 'font-bold')
                 .replace(/shadow-sm/g, 'shadow-lg');
      break;
    case 'magical':
      // Enhance magic variants and add sparkle effects
      code = code.replace(/magic"/g, 'magic-sparkle"')
                 .replace(/transition-colors/g, 'transition-all transform hover:scale-105')
                 .replace(/shadow-lg/g, 'shadow-2xl');
      break;
    case 'futuristic':
      // Prefer dark magic variants and cosmic themes
      code = code.replace(/magic"/g, 'magic-dark"')
                 .replace(/magic-sparkle"/g, 'magic-cosmic"')
                 .replace(/bg-white/g, 'bg-gray-900');
      break;
    case 'professional':
    default:
      // Keep default styling
      break;
  }
  return code;
};
