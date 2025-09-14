import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const BrandInputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#64748B',
    accentColor: '#F59E0B',
    fontFamily: 'Inter',
    borderRadius: 'medium', // small, medium, large
    spacing: 'medium', // tight, medium, loose
    buttonStyle: 'rounded', // rounded, square, pill
    shadowStyle: 'subtle', // none, subtle, prominent
    brandPersonality: 'professional' // professional, playful, minimal, bold
  });

  const [showColorPicker, setShowColorPicker] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (field, color) => {
    setFormData(prev => ({
      ...prev,
      [field]: color.hex
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const ColorInput = ({ label, field, value }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
          style={{ backgroundColor: value }}
          onClick={() => setShowColorPicker(showColorPicker === field ? null : field)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="brand-input flex-1"
          placeholder="#000000"
        />
      </div>
      {showColorPicker === field && (
        <div className="absolute top-full left-0 z-10 mt-2">
          <div
            className="fixed inset-0"
            onClick={() => setShowColorPicker(null)}
          />
          <ChromePicker
            color={value}
            onChange={(color) => handleColorChange(field, color)}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="brand-card max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tell us about your brand
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="brand-input"
              placeholder="Enter your company name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={formData.fontFamily}
              onChange={(e) => handleInputChange('fontFamily', e.target.value)}
              className="brand-input"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Lato">Lato</option>
              <option value="Source Sans Pro">Source Sans Pro</option>
            </select>
          </div>
        </div>

        {/* Brand Colors */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ColorInput
              label="Primary Color"
              field="primaryColor"
              value={formData.primaryColor}
            />
            <ColorInput
              label="Secondary Color"
              field="secondaryColor"
              value={formData.secondaryColor}
            />
            <ColorInput
              label="Accent Color"
              field="accentColor"
              value={formData.accentColor}
            />
          </div>
        </div>

        {/* Design Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius
              </label>
              <select
                value={formData.borderRadius}
                onChange={(e) => handleInputChange('borderRadius', e.target.value)}
                className="brand-input"
              >
                <option value="small">Small (4px)</option>
                <option value="medium">Medium (8px)</option>
                <option value="large">Large (12px)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spacing
              </label>
              <select
                value={formData.spacing}
                onChange={(e) => handleInputChange('spacing', e.target.value)}
                className="brand-input"
              >
                <option value="tight">Tight</option>
                <option value="medium">Medium</option>
                <option value="loose">Loose</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Style
              </label>
              <select
                value={formData.buttonStyle}
                onChange={(e) => handleInputChange('buttonStyle', e.target.value)}
                className="brand-input"
              >
                <option value="rounded">Rounded</option>
                <option value="square">Square</option>
                <option value="pill">Pill</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shadow Style
              </label>
              <select
                value={formData.shadowStyle}
                onChange={(e) => handleInputChange('shadowStyle', e.target.value)}
                className="brand-input"
              >
                <option value="none">None</option>
                <option value="subtle">Subtle</option>
                <option value="prominent">Prominent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Brand Personality */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Personality</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['professional', 'playful', 'minimal', 'bold'].map((personality) => (
              <label
                key={personality}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  formData.brandPersonality === personality
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="brandPersonality"
                  value={personality}
                  checked={formData.brandPersonality === personality}
                  onChange={(e) => handleInputChange('brandPersonality', e.target.value)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-lg font-medium capitalize">{personality}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {personality === 'professional' && 'Clean, trustworthy, corporate'}
                    {personality === 'playful' && 'Fun, creative, energetic'}
                    {personality === 'minimal' && 'Simple, elegant, focused'}
                    {personality === 'bold' && 'Strong, impactful, confident'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Component Library
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandInputForm;
