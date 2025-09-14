import React, { useState, useEffect } from 'react';
import { generateComponentLibrary } from '../utils/componentGenerator';
import { cva } from 'class-variance-authority';
import ComponentExporter from './ComponentExporter';
import { clsx } from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Extract component variants from generated variant configurations
const getComponentVariants = (components) => {
  console.log("getComponentVariants input:", components);
  const variants = {};

  // Check if components is the full library object or just the components part
  const componentsToProcess = components?.components || components;
  console.log("Processing components:", componentsToProcess);

  if (!componentsToProcess) {
    console.warn("No components found to process");
    return variants;
  }

  Object.keys(componentsToProcess).forEach(componentType => {
    const component = componentsToProcess[componentType];
    console.log(`Processing ${componentType}:`, component);

    if (component && component.variantConfig) {
      // Extract variants from the new variantConfig structure
      variants[componentType] = {
        variant: Object.keys(component.variantConfig.variants.variant || {}),
        size: Object.keys(component.variantConfig.variants.size || {})
      };
      console.log(`Extracted variants for ${componentType}:`, variants[componentType]);
    } else {
      console.warn(`No variantConfig found for ${componentType}`);
    }
  });

  return variants;
};

// This function is no longer needed since we extract variants from variantConfig

const ComponentPreview = ({ brandConfig, components, onBack, onExport }) => {
  const [showCode, setShowCode] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  // Extract component variants dynamically from the generated components
  console.log("Components structure:", components);
  const ComponentVariants = getComponentVariants(components);
  console.log("Found variants", ComponentVariants);

  // Inject magic animations CSS
  useEffect(() => {
    const styleId = 'magic-animations-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-y {
          0%, 100% { background-position: 50% 0%; }
          50% { background-position: 50% 100%; }
        }
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-gradient-y { animation: gradient-y 3s ease infinite; }
        .animate-gradient-xy { animation: gradient-xy 4s ease infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const componentCategories = {
    'Interactive': ['Button'],
    // 'Interactive': ['Button', 'Switch', 'Tabs'],
    // 'Layout': ['Card'],
    // 'Forms': ['Input', 'Checkbox', 'Slider', 'DatePicker', 'ColorPicker'],
    // 'Display': ['Badge'],
    // 'Feedback': ['Alert'],
    // 'Overlay': ['Modal']
  };

  const toggleCode = (componentType, variantName) => {
    const key = `${componentType}-${variantName}`;
    setShowCode(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSection = (componentType) => {
    setExpandedSections(prev => ({ ...prev, [componentType]: !prev[componentType] }));
  };

  const renderVariantPreview = (componentType, variantName, variant) => {
    const key = `${componentType}-${variantName}`;

    return (
      <div key={variantName} className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{variantName}</h4>
              <p className="text-sm text-gray-600">{variant.description}</p>
            </div>
            <button
              onClick={() => toggleCode(componentType, variantName)}
              className="text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              {showCode[key] ? 'Hide' : 'Code'}
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white border border-gray-100 rounded-lg p-4 mb-4">
            {renderComponentSamples(componentType, variantName, variant)}
          </div>

          {showCode[key] && (
            <div className="mt-4">
              <SyntaxHighlighter
                language="jsx"
                style={tomorrow}
                className="rounded-lg text-xs"
                customStyle={{ fontSize: '11px', maxHeight: '300px' }}
              >
                {variant.code}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderComponentSamples = (componentType, variantName, variant) => {
    switch (componentType) {
      case 'Button':
        const buttonVariants = ComponentVariants.Button?.variant || ['primary'];
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {buttonVariants.map(buttonVariant => {
                console.log(buttonVariant);
                return(
                  <ComponentRenderer
                    key={buttonVariant}
                    componentType={componentType}
                    variant={buttonVariant}
                    props={{ children: buttonVariant, size: 'md' }}
                    brandConfig={brandConfig}
                    components={components}
                  />
                )
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              <ComponentRenderer
                componentType={componentType}
                variant={variantName}
                props={{ children: 'Disabled', disabled: true }}
                brandConfig={brandConfig}
                components={components}
              />
            </div>
          </div>
        );

      // Temporarily disabled for MVP - focus on Button components only
      /*
      case 'Modal':
        return (
          <div className="space-y-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
              Open Modal Preview
            </button>
            <p className="text-xs text-gray-500">Modal components are shown in overlay</p>
          </div>
        );
      */

      default:
        return <div className="text-gray-500 text-sm">Only Button components are available in MVP mode</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {brandConfig.companyName} Component Library
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brandConfig.primaryColor }} />
                  <span className="text-xs text-gray-600">{brandConfig.primaryColor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brandConfig.secondaryColor }} />
                  <span className="text-xs text-gray-600">{brandConfig.secondaryColor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brandConfig.accentColor }} />
                  <span className="text-xs text-gray-600">{brandConfig.accentColor}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={onExport}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export Library
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {Object.entries(componentCategories).map(([category, componentList]) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{category} Components</h2>
                <span className="text-sm text-gray-500">{componentList.length} component{componentList.length !== 1 ? 's' : ''}</span>
              </div>

              <div className="space-y-8">
                {componentList.map(componentType => {
                  const component = components.components[componentType];
                  if (!component) return null;

                  return (

                    Object.entries(component.variants).map(([variantName, variant]) =>
                      renderVariantPreview(componentType, variantName, variant)
                    )

                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

// Helper component to render components using the new variant configuration system
const ComponentRenderer = ({ componentType, variant, props, brandConfig, components }) => {
  // Get the component's variant configuration
  const componentsToProcess = components?.components || components;
  const component = componentsToProcess?.[componentType];

  if (!component?.variantConfig) {
    console.warn(`No variantConfig found for ${componentType}`);
    return <div className="p-2 bg-red-100 text-red-600 rounded text-sm">No variant config found</div>;
  }

  const config = component.variantConfig;
  const size = props?.size || 'md';

  // Combine base classes + variant classes + size classes
  const baseClasses = config.baseClasses || '';
  const variantClasses = config.variants.variant?.[variant] || '';
  const sizeClasses = config.variants.size?.[size] || '';

  const finalClasses = [baseClasses, variantClasses, sizeClasses]
    .filter(Boolean)
    .join(' ')
    .trim();

  console.log(`${componentType} ${variant} ${size}:`, finalClasses);

  // Render the component based on type
  switch (componentType) {
    case 'Button':
      const { children, disabled = false } = props;

      return (
        <button
          className={finalClasses}
          disabled={disabled}
        >
          {children}
        </button>
      );

    default:
      return (
        <div className="p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
          Component type "{componentType}" not implemented in MVP
        </div>
      );
  }
};

// Separate component for Tabs to avoid hook rule violations
const TabsComponent = ({ tabs, variant = 'default', generatedClasses }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id);

  // Use generated classes if available, otherwise fall back to variant-specific styles
  const getTabStyles = (isActive) => {
    if (generatedClasses) {
      // If we have generated classes, use them with active/inactive states
      return generatedClasses + (isActive ? ' opacity-100' : ' opacity-70 hover:opacity-90');
    }

    // Fallback to hardcoded styles
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-blue-100 text-blue-700 px-3 py-2 rounded-full font-medium text-sm'
          : 'text-gray-500 hover:text-gray-700 px-3 py-2 rounded-full font-medium text-sm hover:bg-gray-100';

      case 'underline':
        return isActive
          ? 'border-b-2 border-blue-500 text-blue-600 py-2 px-1 font-medium text-sm'
          : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 font-medium text-sm';

      default:
        return isActive
          ? 'border-b-2 border-blue-500 text-blue-600 py-2 px-1 font-medium text-sm'
          : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 font-medium text-sm';
    }
  };

  const getContainerStyles = () => {
    if (generatedClasses) {
      return 'flex space-x-2'; // Basic container for generated styles
    }

    switch (variant) {
      case 'pills':
        return 'flex space-x-2 p-1 bg-gray-100 rounded-lg';
      case 'underline':
        return 'border-b-2 border-gray-200 -mb-px flex space-x-8';
      default:
        return 'border-b border-gray-200 -mb-px flex space-x-8';
    }
  };

  return (
    <div className="w-full">
      <div className={variant === 'pills' ? '' : 'border-b border-gray-200'}>
        <nav className={getContainerStyles()}>
          {tabs?.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={getTabStyles(activeTab === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs?.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default ComponentPreview;
