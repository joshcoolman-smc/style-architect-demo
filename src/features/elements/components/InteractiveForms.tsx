import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Search } from 'lucide-react';
import { useColorStore } from '../../../stores/colorStore';

const InteractiveForms = () => {
  const { palette, categories } = useColorStore();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false,
    preference: 'design'
  });

  // Extract colors from categories
  const lightColors = categories.find(cat => cat.name === 'Light Tones')?.colors || [];
  const midColors = categories.find(cat => cat.name === 'Mid Tones')?.colors || [];
  const darkColors = categories.find(cat => cat.name === 'Dark Tones')?.colors || [];

  const formColors = {
    background: lightColors[0]?.value || palette["light-1"],
    border: midColors[1]?.value || palette["mid-2"],
    focusBorder: midColors[0]?.value || palette["mid-1"],
    text: darkColors[0]?.value || palette["dark-1"],
    placeholder: darkColors[1]?.value || palette["dark-2"],
    label: darkColors[0]?.value || palette["dark-1"],
    button: midColors[0]?.value || palette["mid-1"],
    buttonText: lightColors[0]?.value || "#ffffff",
    success: '#10b981',
    error: '#ef4444'
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const InputField = ({ 
    id, 
    label, 
    type = 'text', 
    icon: Icon, 
    placeholder,
    value,
    onChange 
  }: {
    id: string;
    label: string;
    type?: string;
    icon: React.ElementType;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="text-body-bold font-structural transition-colors duration-300"
        style={{ color: formColors.label }}
      >
        {label}
      </label>
      <div className="relative">
        <Icon 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300"
          style={{ color: focusedField === id ? formColors.focusBorder : formColors.placeholder }}
        />
        <motion.input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border-2 text-body font-content transition-all duration-300 focus:outline-none"
          style={{
            backgroundColor: formColors.background,
            borderColor: focusedField === id ? formColors.focusBorder : formColors.border,
            color: formColors.text
          }}
          animate={{
            scale: focusedField === id ? 1.02 : 1,
            boxShadow: focusedField === id 
              ? `0 0 0 3px ${formColors.focusBorder}20` 
              : '0 0 0 0px transparent'
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Contact Form */}
      <motion.div 
        className="p-8 rounded-lg shadow-lg transition-colors duration-300"
        style={{ backgroundColor: formColors.background }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 
          className="text-heading-2 font-structural mb-6 transition-colors duration-300"
          style={{ color: formColors.text }}
        >
          Get In Touch
        </h3>
        
        <div className="space-y-6">
          <InputField
            id="name"
            label="Full Name"
            icon={User}
            placeholder="Enter your name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
          />

          <InputField
            id="email"
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
          />

          <div className="space-y-2">
            <label 
              htmlFor="message"
              className="text-body-bold font-structural transition-colors duration-300"
              style={{ color: formColors.label }}
            >
              Message
            </label>
            <div className="relative">
              <MessageSquare 
                className="absolute left-3 top-3 w-5 h-5 transition-colors duration-300"
                style={{ color: focusedField === 'message' ? formColors.focusBorder : formColors.placeholder }}
              />
              <motion.textarea
                id="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="w-full pl-11 pr-4 py-3 rounded-lg border-2 text-body font-content transition-all duration-300 focus:outline-none resize-none"
                style={{
                  backgroundColor: formColors.background,
                  borderColor: focusedField === 'message' ? formColors.focusBorder : formColors.border,
                  color: formColors.text
                }}
                animate={{
                  scale: focusedField === 'message' ? 1.02 : 1,
                  boxShadow: focusedField === 'message' 
                    ? `0 0 0 3px ${formColors.focusBorder}20` 
                    : '0 0 0 0px transparent'
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          <motion.button
            className="w-full py-3 rounded-lg text-body-bold font-structural transition-all duration-300"
            style={{ 
              backgroundColor: formColors.button,
              color: formColors.buttonText 
            }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </div>
      </motion.div>

      {/* Form Elements Showcase */}
      <motion.div 
        className="p-8 rounded-lg shadow-lg transition-colors duration-300"
        style={{ backgroundColor: formColors.background }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 
          className="text-heading-2 font-structural mb-6 transition-colors duration-300"
          style={{ color: formColors.text }}
        >
          Interactive Elements
        </h3>

        <div className="space-y-6">
          {/* Search Input */}
          <div className="space-y-2">
            <label 
              className="text-body-bold font-structural transition-colors duration-300"
              style={{ color: formColors.label }}
            >
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: formColors.placeholder }} />
              <input
                type="text"
                placeholder="Search components..."
                className="w-full pl-11 pr-4 py-3 rounded-lg border-2 text-body font-content transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: formColors.background,
                  borderColor: formColors.border,
                  color: formColors.text
                }}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label 
              className="text-body-bold font-structural transition-colors duration-300"
              style={{ color: formColors.label }}
            >
              Preferences
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                  className="w-5 h-5 rounded transition-colors duration-300"
                  style={{ accentColor: formColors.focusBorder }}
                />
                <span 
                  className="text-body font-content transition-colors duration-300"
                  style={{ color: formColors.text }}
                >
                  Subscribe to newsletter
                </span>
              </label>
            </div>
          </div>

          {/* Radio Buttons */}
          <div className="space-y-3">
            <label 
              className="text-body-bold font-structural transition-colors duration-300"
              style={{ color: formColors.label }}
            >
              Primary Interest
            </label>
            <div className="space-y-2">
              {[
                { value: 'design', label: 'Design Systems' },
                { value: 'development', label: 'Development' },
                { value: 'consultation', label: 'Consultation' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="preference"
                    value={option.value}
                    checked={formData.preference === option.value}
                    onChange={(e) => handleInputChange('preference', e.target.value)}
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ accentColor: formColors.focusBorder }}
                  />
                  <span 
                    className="text-body font-content transition-colors duration-300"
                    style={{ color: formColors.text }}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Select Dropdown */}
          <div className="space-y-2">
            <label 
              className="text-body-bold font-structural transition-colors duration-300"
              style={{ color: formColors.label }}
            >
              Project Size
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg border-2 text-body font-content transition-all duration-300 focus:outline-none"
              style={{
                backgroundColor: formColors.background,
                borderColor: formColors.border,
                color: formColors.text
              }}
            >
              <option>Small (1-3 components)</option>
              <option>Medium (4-10 components)</option>
              <option>Large (11+ components)</option>
              <option>Enterprise (Full system)</option>
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveForms;