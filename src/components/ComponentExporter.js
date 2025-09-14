import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ComponentExporter = ({ components, brandConfig, onBack }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('complete'); // 'complete', 'components-only'
  const [includeStorybook, setIncludeStorybook] = useState(true);
  const [includeTests, setIncludeTests] = useState(false);

  const generatePackageJson = () => {
    return JSON.stringify({
      name: `${brandConfig.companyName.toLowerCase().replace(/\s+/g, '-')}-component-library`,
      version: "1.0.0",
      description: `React component library for ${brandConfig.companyName}`,
      main: "dist/index.js",
      module: "dist/index.esm.js",
      types: "dist/index.d.ts",
      files: ["dist"],
      scripts: {
        build: "rollup -c",
        storybook: "start-storybook -p 6006",
        "build-storybook": "build-storybook",
        "install:deps": "pnpm install"
      },
      packageManager: "pnpm@8.0.0",
      dependencies: {
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.0.0"
      },
      peerDependencies: {
        react: ">=16.8.0",
        "react-dom": ">=16.8.0"
      },
      devDependencies: {
        "@rollup/plugin-commonjs": "^22.0.0",
        "@rollup/plugin-node-resolve": "^13.3.0",
        "@rollup/plugin-typescript": "^8.3.2",
        "@storybook/addon-essentials": "^6.5.0",
        "@storybook/react": "^6.5.0",
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        "rollup": "^2.75.0",
        "rollup-plugin-peer-deps-external": "^2.2.4",
        "rollup-plugin-postcss": "^4.0.2",
        "tailwindcss": "^3.3.0",
        "typescript": "^4.7.0"
      }
    }, null, 2);
  };

  // Helper function to darken colors for hover states
  const darkenColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return "#" + ((R << 16) | (G << 8) | B).toString(16).padStart(6, '0');
  };

  const generateTailwindConfig = () => {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)',
          'primary-hover': 'var(--brand-primary-hover)',
          'secondary-hover': 'var(--brand-secondary-hover)',
          'accent-hover': 'var(--brand-accent-hover)',
          'primary-text': 'var(--brand-primary-text)',
          'secondary-text': 'var(--brand-secondary-text)',
          'accent-text': 'var(--brand-accent-text)',
        }
      },
      fontFamily: {
        brand: ['${brandConfig.fontFamily}', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        brand: '${brandConfig.borderRadius === 'small' ? '0.25rem' : brandConfig.borderRadius === 'large' ? '0.75rem' : '0.5rem'}'
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 4s ease infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-position': '0% 0%' },
          '25%': { 'background-position': '100% 0%' },
          '50%': { 'background-position': '100% 100%' },
          '75%': { 'background-position': '0% 100%' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}`;
  };

  const generateIndexFile = () => {
    const exports = Object.keys(components.components).map(componentName => {
      const component = components.components[componentName];
      return Object.keys(component.variants).map(variantName => {
        const exportName = variantName === 'Primary' || variantName === 'Basic' || variantName === 'Default' 
          ? componentName 
          : `${componentName}${variantName}`;
        return `export { default as ${exportName} } from './components/${componentName}/${variantName}';`;
      }).join('\n');
    }).join('\n');

    return `// ${brandConfig.companyName} Component Library
// Generated on ${new Date().toISOString()}

${exports}

export * from './types';`;
  };

  const generateTypesFile = () => {
    return `import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

${components.componentVariantTypes}

export interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  disabled?: boolean;
}

export interface CardProps extends BaseProps, CardVariants {
  title?: string;
  onClick?: () => void;
}

export interface BadgeProps extends BaseProps, BadgeVariants {
}

export interface AlertProps extends BaseProps, AlertVariants {
  title?: string;
  onClose?: () => void;
}

export interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement>, InputVariants {
  label?: string;
  error?: string;
  required?: boolean;
}

export interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export interface ModalProps extends BaseProps, ModalVariants {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface DatePickerProps extends BaseProps, DatePickerVariants {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface ColorPickerProps extends BaseProps, ColorPickerVariants {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface CheckboxProps extends BaseProps, CheckboxVariants {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface TabsProps extends BaseProps, TabsVariants {
  tabs: Array<{
    id: string;
    label: string;
    content: ReactNode;
  }>;
  defaultTab?: string;
}

export interface SliderProps extends BaseProps, SliderVariants {
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export interface SwitchProps extends BaseProps, SwitchVariants {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}`;
  };

  const generateVariantsFile = () => {
    return `// Component Variant Constants
// This file provides easy access to all available component variants for TypeScript environments

export const COMPONENT_VARIANTS = ${JSON.stringify(components.componentVariants, null, 2)};

// Helper functions to get variant options
export const getButtonVariants = () => COMPONENT_VARIANTS.Button.variant;
export const getButtonSizes = () => COMPONENT_VARIANTS.Button.size;

export const getCardVariants = () => COMPONENT_VARIANTS.Card.variant;
export const getCardPadding = () => COMPONENT_VARIANTS.Card.padding;

export const getBadgeVariants = () => COMPONENT_VARIANTS.Badge.variant;
export const getBadgeSizes = () => COMPONENT_VARIANTS.Badge.size;

export const getAlertVariants = () => COMPONENT_VARIANTS.Alert.variant;
export const getAlertSizes = () => COMPONENT_VARIANTS.Alert.size;

export const getInputVariants = () => COMPONENT_VARIANTS.Input.variant;
export const getInputSizes = () => COMPONENT_VARIANTS.Input.size;

export const getModalVariants = () => COMPONENT_VARIANTS.Modal.variant;
export const getModalSizes = () => COMPONENT_VARIANTS.Modal.size;

export const getDatePickerVariants = () => COMPONENT_VARIANTS.DatePicker.variant;
export const getDatePickerSizes = () => COMPONENT_VARIANTS.DatePicker.size;

export const getColorPickerVariants = () => COMPONENT_VARIANTS.ColorPicker.variant;
export const getColorPickerSizes = () => COMPONENT_VARIANTS.ColorPicker.size;

export const getCheckboxVariants = () => COMPONENT_VARIANTS.Checkbox.variant;
export const getCheckboxSizes = () => COMPONENT_VARIANTS.Checkbox.size;

export const getTabsVariants = () => COMPONENT_VARIANTS.Tabs.variant;
export const getTabsSizes = () => COMPONENT_VARIANTS.Tabs.size;

export const getSliderVariants = () => COMPONENT_VARIANTS.Slider.variant;
export const getSliderSizes = () => COMPONENT_VARIANTS.Slider.size;

export const getSwitchVariants = () => COMPONENT_VARIANTS.Switch.variant;
export const getSwitchSizes = () => COMPONENT_VARIANTS.Switch.size;

// Type guards for runtime validation
export const isValidButtonVariant = (variant: string): variant is ButtonVariants['variant'] => {
  return getButtonVariants().includes(variant as any);
};

export const isValidButtonSize = (size: string): size is ButtonVariants['size'] => {
  return getButtonSizes().includes(size as any);
};

// Export all variant types for external use
export type { 
  ButtonVariants, 
  CardVariants, 
  BadgeVariants, 
  AlertVariants, 
  InputVariants, 
  ModalVariants,
  DatePickerVariants,
  ColorPickerVariants,
  CheckboxVariants,
  TabsVariants,
  SliderVariants,
  SwitchVariants
} from './types';`;
  };

  const generateReadme = () => {
    return `# ${brandConfig.companyName} Component Library

A React component library built with Tailwind CSS, designed specifically for ${brandConfig.companyName}.

## Installation

\`\`\`bash
pnpm add ${brandConfig.companyName.toLowerCase().replace(/\s+/g, '-')}-component-library
\`\`\`

Or with npm:
\`\`\`bash
npm install ${brandConfig.companyName.toLowerCase().replace(/\s+/g, '-')}-component-library
\`\`\`

## Usage

\`\`\`jsx
import { Button, Card, Input } from '${brandConfig.companyName.toLowerCase().replace(/\s+/g, '-')}-component-library';

function App() {
  return (
    <div>
      <Card>
        <h1>Welcome to ${brandConfig.companyName}</h1>
        <Input label="Email" placeholder="Enter your email" />
        <Button>Get Started</Button>
      </Card>
    </div>
  );
}
\`\`\`

## Brand Colors

- **Primary**: ${brandConfig.primaryColor}
- **Secondary**: ${brandConfig.secondaryColor}
- **Accent**: ${brandConfig.accentColor}

## Typography

- **Font Family**: ${brandConfig.fontFamily}

## Components

${Object.keys(components.components).map(componentName => {
  const component = components.components[componentName];
  return `### ${component.name}

${component.description}

**Variants:**
${Object.keys(component.variants).map(variantName => `- ${variantName}: ${component.variants[variantName].description || 'Standard variant'}`).join('\n')}
`;
}).join('\n')}

## Development

This component library was generated using the Component Library Generator tool.

### Building

\`\`\`bash
pnpm build
\`\`\`

### Storybook

\`\`\`bash
pnpm storybook
\`\`\`

## License

MIT`;
  };

  const generateStorybookConfig = () => {
    return `module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};`;
  };

  const generateComponentStory = (componentName, component) => {
    const firstVariant = Object.keys(component.variants)[0];
    const variantCode = component.variants[firstVariant].code;
    
    return `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ${componentName} from './${firstVariant}';

export default {
  title: '${component.category}/${componentName}',
  component: ${componentName},
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  ${componentName === 'Button' ? "children: 'Button'" : ''}
  ${componentName === 'Card' ? "children: 'Card content'" : ''}
  ${componentName === 'Input' ? "label: 'Input Label', placeholder: 'Enter text'" : ''}
  ${componentName === 'Badge' ? "children: 'Badge'" : ''}
  ${componentName === 'Alert' ? "children: 'Alert message'" : ''}
};`;
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const zip = new JSZip();
      
      // Create folder structure
      const srcFolder = zip.folder('src');
      const componentsFolder = srcFolder.folder('components');
      
      // Add package.json
      zip.file('package.json', generatePackageJson());
      
      // Add README
      zip.file('README.md', generateReadme());
      
      // Add Tailwind config
      zip.file('tailwind.config.js', generateTailwindConfig());
      
      // Add main index file
      srcFolder.file('index.ts', generateIndexFile());
      
      // Add types
      srcFolder.file('types.ts', generateTypesFile());
      
      // Add variant constants file
      srcFolder.file('variants.ts', generateVariantsFile());
      
      // Add globals.css with CSS custom properties
      srcFolder.file('globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ${brandConfig.companyName} Brand Colors */
    --brand-primary: ${brandConfig.primaryColor};
    --brand-secondary: ${brandConfig.secondaryColor};
    --brand-accent: ${brandConfig.accentColor};
    --brand-primary-hover: ${darkenColor(brandConfig.primaryColor, -25)};
    --brand-secondary-hover: ${darkenColor(brandConfig.secondaryColor, -25)};
    --brand-accent-hover: ${darkenColor(brandConfig.accentColor, -25)};
    --brand-primary-text: ${brandConfig.primaryColor};
    --brand-secondary-text: ${brandConfig.secondaryColor};
    --brand-accent-text: ${brandConfig.accentColor};
  }
}

@layer base {
  body {
    margin: 0;
    font-family: '${brandConfig.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
}

${components.magicAnimations || ''}`);

      // Generate component files
      Object.entries(components.components).forEach(([componentName, component]) => {
        const componentFolder = componentsFolder.folder(componentName);
        
        Object.entries(component.variants).forEach(([variantName, variant]) => {
          componentFolder.file(`${variantName}.tsx`, variant.code);
          
          // Add Storybook stories if requested
          if (includeStorybook) {
            componentFolder.file(`${variantName}.stories.tsx`, generateComponentStory(componentName, component));
          }
          
          // Add basic tests if requested
          if (includeTests) {
            componentFolder.file(`${variantName}.test.tsx`, `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${variantName} from './${variantName}';

describe('${componentName} - ${variantName}', () => {
  it('renders without crashing', () => {
    render(<${variantName}>${componentName === 'Button' ? 'Test' : ''}</${variantName}>);
  });
});`);
          }
        });
      });
      
      // Add Storybook configuration if requested
      if (includeStorybook) {
        const storybookFolder = zip.folder('.storybook');
        storybookFolder.file('main.js', generateStorybookConfig());
      }
      
      // Add build configuration
      zip.file('rollup.config.js', `import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
    }),
  ],
};`);

      // Add TypeScript config
      zip.file('tsconfig.json', JSON.stringify({
        compilerOptions: {
          target: 'es5',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          module: 'esnext',
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          declaration: true,
          outDir: 'dist'
        },
        include: ['src'],
        exclude: ['node_modules', 'dist', 'build']
      }, null, 2));

      // Generate and download the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      const fileName = `${brandConfig.companyName.toLowerCase().replace(/\s+/g, '-')}-component-library.zip`;
      saveAs(content, fileName);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="brand-card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Export Your Component Library
        </h2>
        
        <div className="space-y-6">
          {/* Export Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="brand-input max-w-xs"
                >
                  <option value="complete">Complete Package (Ready to publish)</option>
                  <option value="components-only">Components Only</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeStorybook}
                    onChange={(e) => setIncludeStorybook(e.target.checked)}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">Include Storybook configuration</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeTests}
                    onChange={(e) => setIncludeTests(e.target.checked)}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">Include basic test files</span>
                </label>
              </div>
            </div>
          </div>

          {/* Package Preview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Contents</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-mono text-gray-700 space-y-1">
                <div>📦 {brandConfig.companyName.toLowerCase().replace(/\s+/g, '-')}-component-library/</div>
                <div className="ml-4">├── package.json</div>
                <div className="ml-4">├── README.md</div>
                <div className="ml-4">├── tailwind.config.js</div>
                <div className="ml-4">├── rollup.config.js</div>
                <div className="ml-4">├── tsconfig.json</div>
                <div className="ml-4">└── src/</div>
                <div className="ml-8">├── index.ts</div>
                <div className="ml-8">├── types.ts</div>
                <div className="ml-8">├── globals.css</div>
                <div className="ml-8">└── components/</div>
                {Object.keys(components.components).map(componentName => (
                  <div key={componentName} className="ml-12">
                    └── {componentName}/
                    {Object.keys(components.components[componentName].variants).map(variantName => (
                      <div key={variantName} className="ml-16">
                        ├── {variantName}.tsx
                        {includeStorybook && <div className="ml-16">├── {variantName}.stories.tsx</div>}
                        {includeTests && <div className="ml-16">├── {variantName}.test.tsx</div>}
                      </div>
                    ))}
                  </div>
                ))}
                {includeStorybook && (
                  <div className="ml-8">└── .storybook/</div>
                )}
              </div>
            </div>
          </div>

          {/* Component Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(components.components).map(([componentName, component]) => (
                <div key={componentName} className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">{component.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      {Object.keys(component.variants).length} variant(s)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back to Preview
        </button>
        
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <span>📦</span>
              <span>Download Component Library</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ComponentExporter;
