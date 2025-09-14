import React, { useState } from 'react';
import './index.css';
import BrandInputForm from './components/BrandInputForm';
import ComponentPreview from './components/ComponentPreview';
import ComponentExporter from './components/ComponentExporter';
import { generateComponentLibrary } from './utils/componentGenerator.ts';

function App() {
  const [brandConfig, setBrandConfig] = useState(null);
  const [generatedComponents, setGeneratedComponents] = useState(null);
  const [currentStep, setCurrentStep] = useState('input'); // 'input', 'preview', 'export'

  const handleBrandSubmit = (config) => {
    setBrandConfig(config);
    
    // Update CSS custom properties for brand colors
    if (config.primaryColor) {
      document.documentElement.style.setProperty('--brand-primary', config.primaryColor);
      document.documentElement.style.setProperty('--brand-secondary', config.secondaryColor);
      document.documentElement.style.setProperty('--brand-accent', config.accentColor);
      
      // Calculate and set hover colors (10% darker)
      const darkenColor = (hex, percent) => {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return "#" + ((R << 16) | (G << 8) | B).toString(16).padStart(6, '0');
      };
      
      document.documentElement.style.setProperty('--brand-primary-hover', darkenColor(config.primaryColor, -25));
      document.documentElement.style.setProperty('--brand-secondary-hover', darkenColor(config.secondaryColor, -25));
      document.documentElement.style.setProperty('--brand-accent-hover', darkenColor(config.accentColor, -25));
      
      // Set text colors (same as base colors for now)
      document.documentElement.style.setProperty('--brand-primary-text', config.primaryColor);
      document.documentElement.style.setProperty('--brand-secondary-text', config.secondaryColor);
      document.documentElement.style.setProperty('--brand-accent-text', config.accentColor);
    }
    
    // Get the components
    const components = generateComponentLibrary(config);
    setGeneratedComponents(components);

    console.log(components);

    setCurrentStep('preview');
  };

  const handleBackToInput = () => {
    setCurrentStep('input');
    setBrandConfig(null);
    setGeneratedComponents(null);
  };

  const handleExport = () => {
    setCurrentStep('export');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Component Library Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your brand guidelines into a complete React component library with Tailwind CSS
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep === 'input' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'input' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Brand Input</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${currentStep === 'preview' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Preview</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${currentStep === 'export' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'export' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Export</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 'input' && (
            <BrandInputForm onSubmit={handleBrandSubmit} />
          )}
          
          {currentStep === 'preview' && brandConfig && generatedComponents && (
            <ComponentPreview 
              brandConfig={brandConfig}
              componentLibrary={generatedComponents}
              onBack={handleBackToInput}
              onExport={handleExport}
            />
          )}
          
          {currentStep === 'export' && generatedComponents && (
            <ComponentExporter 
              components={generatedComponents}
              brandConfig={brandConfig}
              onBack={() => setCurrentStep('preview')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
