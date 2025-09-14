// Component generator with TypeScript support
import { ComponentTypes, ComponentDetails, ComponentDetailRecord } from "./componentDetails.ts";

export interface BrandConfig {
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: 'small' | 'medium' | 'large';
  spacing: 'tight' | 'medium' | 'loose';
  shadowStyle: 'none' | 'subtle' | 'prominent';
  fontFamily: string;
  brandPersonality: 'professional' | 'playful' | 'minimal' | 'bold' | 'magical' | 'futuristic';
  buttonStyle?: string;
}

export interface VariantConfig {
  baseClasses: string;
  variants: {
    variant: Record<string, string>;
    size?: Record<string, string>;
  };
  defaultVariants: {
    variant: string;
    size?: string;
  };
}

export interface ComponentVariant {
  name: string;
  description: string;
  code: string;
  config: VariantConfig;
  props: any[];
}

export interface ComponentData {
  name: string;
  description: string;
  category: string;
  variantConfig?: VariantConfig;
}

export interface ComponentLibrary {
  components: Record<string, ComponentData>;
  brandConfig: BrandConfig;
}

export const generateComponentLibrary = (brandConfig: BrandConfig): ComponentLibrary => {
  const components: Record<string, ComponentData> = {};
  
  // Generate components for each template
  Object.entries(ComponentDetails).forEach(([componentTypeName, template]) => {
    
    const componentData: ComponentData = {
      ...template,
      variantConfig: generateVariantConfig(componentTypeName as ComponentTypes, template, brandConfig),
    };
    
    components[componentTypeName] = componentData;
  });
  
  const out: ComponentLibrary = {
    components,
    brandConfig
  };
  console.log("ComponentLibrary:", out)
  return out;
};

const generateVariantConfig = (componentType: ComponentTypes, template: ComponentDetailRecord, brandConfig: BrandConfig): VariantConfig => {
  
  const config: VariantConfig = {
    baseClasses: '',
    variants: {
      variant: {}
    },
    defaultVariants: {
      variant: 'primary'
    }
  };

  // Helper functions for brand config
  const getBorderRadius = (): string => {
    switch (brandConfig.borderRadius) {
      case 'small': return 'rounded';
      case 'medium': return 'rounded-lg';
      case 'large': return 'rounded-xl';
      default: return 'rounded-lg';
    }
  };

  const getSpacing = (): { x: string; y: string } => {
    switch (brandConfig.spacing) {
      case 'tight': return { x: 'px-3', y: 'py-1.5' };
      case 'medium': return { x: 'px-4', y: 'py-2' };
      case 'loose': return { x: 'px-6', y: 'py-3' };
      default: return { x: 'px-4', y: 'py-2' };
    }
  };

  const getShadow = (): string => {
    switch (brandConfig.shadowStyle) {
      case 'none': return '';
      case 'subtle': return 'shadow-sm';
      case 'prominent': return 'shadow-lg';
      default: return 'shadow-sm';
    }
  };

  const borderRadius = getBorderRadius();
  const spacing = getSpacing();
  const shadow = getShadow();
  const fontFamily = `font-['${brandConfig.fontFamily}']`;

  // Extract base classes and variant configurations from template
  switch (componentType) {
    case 'Button':
      config.baseClasses = `inline-flex items-center justify-center ${borderRadius} ${fontFamily} font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`;
      config.variants = {
        variant: {
          primary: `bg-brand-primary text-white ${shadow} hover:bg-brand-primary-hover focus:ring-brand-primary`,
          outline: `bg-transparent border border-brand-primary border-2 text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary`,
          secondary: `bg-brand-secondary text-white ${shadow} hover:bg-brand-secondary-hover focus:ring-brand-secondary`,
          "secondary-outline": `bg-transparent border border-brand-secondary border-2 text-brand-secondary hover:bg-brand-secondary hover:text-white focus:ring-brand-secondary`,
          accent: `bg-brand-accent text-white ${shadow} hover:bg-brand-accent-hover focus:ring-brand-accent`,
          "accent-outline": `bg-transparent border border-brand-accent border-2 text-brand-accent hover:bg-brand-accent hover:text-white focus:ring-brand-accent`,
          unobtrusive: `bg-white border border-gray-300 text-gray-700 ${shadow} hover:bg-gray-50 focus:ring-gray-300`,
          ghost: `bg-transparent text-brand-primary hover:bg-gray-100 focus:ring-brand-primary`,
          destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        },
        size: {
          sm: `${spacing.x} ${spacing.y} text-sm`,
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

    case 'Card':
      config.baseClasses = `${borderRadius} ${fontFamily} transition-all duration-200 overflow-hidden`;
      config.variants = {
        variant: {
          basic: `bg-white border border-gray-200 ${spacing.x} ${spacing.y}`,
          outlined: `bg-white border-2 border-brand-primary ${spacing.x} ${spacing.y} hover:border-brand-primary-hover`,
          elevated: `bg-white ${shadow === 'shadow-sm' ? 'shadow-lg' : shadow === 'shadow-lg' ? 'shadow-xl' : 'shadow-md'} ${spacing.x} ${spacing.y} hover:shadow-2xl transform hover:-translate-y-1`,
          magic: `bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white ${spacing.x} ${spacing.y} shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700`
        },
        size: {
          sm: "p-3",
          md: "p-4",
          lg: "p-6",
          xl: "p-8"
        }
      };
      config.defaultVariants = {
        variant: "basic",
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

const processTemplate = (template: string, brandConfig: BrandConfig): string => {
  let processedTemplate = template;
  
  // Helper functions for brand config
  const getBorderRadius = (): string => {
    switch (brandConfig.borderRadius) {
      case 'small': return 'rounded';
      case 'medium': return 'rounded-lg';
      case 'large': return 'rounded-xl';
      default: return 'rounded-lg';
    }
  };

  const getSpacing = (): { x: string; y: string } => {
    switch (brandConfig.spacing) {
      case 'tight': return { x: 'px-3', y: 'py-1.5' };
      case 'medium': return { x: 'px-4', y: 'py-2' };
      case 'loose': return { x: 'px-6', y: 'py-3' };
      default: return { x: 'px-4', y: 'py-2' };
    }
  };

  const getShadow = (): string => {
    switch (brandConfig.shadowStyle) {
      case 'none': return '';
      case 'subtle': return 'shadow-sm';
      case 'prominent': return 'shadow-lg';
      default: return 'shadow-sm';
    }
  };

  const spacing = getSpacing();
  
  // Replace placeholders with actual values
  const replacements: Record<string, string> = {
    '{{PRIMARY_COLOR}}': 'bg-brand-primary',
    '{{SECONDARY_COLOR}}': 'bg-brand-secondary',
    '{{ACCENT_COLOR}}': 'bg-brand-accent',
    '{{PRIMARY_HOVER}}': 'hover:bg-brand-primary',
    '{{PRIMARY_FOCUS}}': 'focus:ring-brand-primary',
    '{{PRIMARY_BORDER}}': 'border border-brand-primary',
    '{{PRIMARY_TEXT}}': 'text-brand-primary',
    '{{SECONDARY_BORDER}}': 'border border-brand-secondary',
    '{{SECONDARY_TEXT}}': 'text-brand-secondary',
    '{{SECONDARY_FOCUS}}': 'focus:ring-brand-secondary',
    '{{BORDER_RADIUS}}': getBorderRadius(),
    '{{SPACING.x}}': spacing.x,
    '{{SPACING.y}}': spacing.y,
    '{{FONT_FAMILY}}': `font-['${brandConfig.fontFamily}']`,
    '{{SHADOW}}': getShadow(),
    '{{COMPANY_NAME}}': brandConfig.companyName
  };
  
  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    processedTemplate = processedTemplate.replace(new RegExp(placeholder, 'g'), replacement);
  });
  
  return processedTemplate;
};

const applyPersonalityModifications = (code: string, personality: BrandConfig['brandPersonality']): string => {
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
