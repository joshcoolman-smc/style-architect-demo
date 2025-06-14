
import React from 'react';
import { Search, Bell, User, Settings, ChevronDown, Heart, Star, Download } from 'lucide-react';

const InteractiveComponents = () => {
  const [activeTab, setActiveTab] = React.useState('buttons');
  const [selectedOption, setSelectedOption] = React.useState('option1');
  const [isChecked, setIsChecked] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(50);
  const [inputValue, setInputValue] = React.useState('');

  const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'forms', label: 'Forms' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-display-xl font-bold text-neutral-900 mb-2">Interactive Components</h1>
        <p className="text-lg text-neutral-600">
          A comprehensive library of interactive UI components with consistent styling and behavior.
        </p>
      </div>

      {/* Component Categories */}
      <div className="ds-card p-8">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-brand-600 border-brand-600 bg-brand-50'
                  : 'text-neutral-600 border-transparent hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Buttons Section */}
        {activeTab === 'buttons' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Button Variants</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-neutral-700">Primary</h4>
                  <div className="space-y-2">
                    <button className="ds-button-primary w-full">Large Primary</button>
                    <button className="ds-button-primary text-sm px-3 py-1.5 w-full">Medium Primary</button>
                    <button className="ds-button-primary text-xs px-2 py-1 w-full">Small Primary</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-neutral-700">Secondary</h4>
                  <div className="space-y-2">
                    <button className="ds-button-secondary w-full">Large Secondary</button>
                    <button className="ds-button-secondary text-sm px-3 py-1.5 w-full">Medium Secondary</button>
                    <button className="ds-button-secondary text-xs px-2 py-1 w-full">Small Secondary</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-neutral-700">Outline</h4>
                  <div className="space-y-2">
                    <button className="border-2 border-brand-600 text-brand-600 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-brand-50 w-full">
                      Large Outline
                    </button>
                    <button className="border-2 border-brand-600 text-brand-600 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors hover:bg-brand-50 w-full">
                      Medium Outline
                    </button>
                    <button className="border-2 border-brand-600 text-brand-600 text-xs px-2 py-1 rounded-lg font-medium transition-colors hover:bg-brand-50 w-full">
                      Small Outline
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Icon Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="ds-button-primary flex items-center space-x-2">
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button className="ds-button-secondary flex items-center space-x-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-colors">
                  <Heart size={16} className="text-neutral-600" />
                </button>
                <button className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-colors">
                  <Star size={16} className="text-neutral-600" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Button States</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button className="ds-button-primary">Normal</button>
                <button className="ds-button-primary opacity-75">Hover</button>
                <button className="ds-button-primary opacity-50 cursor-not-allowed" disabled>Disabled</button>
                <button className="ds-button-primary animate-pulse">Loading</button>
              </div>
            </div>
          </div>
        )}

        {/* Forms Section */}
        {activeTab === 'forms' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Input Fields</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Text Input
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter your text..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Search Input
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
                      <input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Textarea
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter your message..."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Select Dropdown
                    </label>
                    <div className="relative">
                      <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Checkbox
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="w-4 h-4 text-brand-600 border-neutral-300 rounded focus:ring-brand-500"
                      />
                      <span className="text-sm text-neutral-700">I agree to the terms</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Range Slider
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-sm text-neutral-600 text-center">Value: {sliderValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Section */}
        {activeTab === 'navigation' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Navigation Elements</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-3">Breadcrumbs</h4>
                  <nav className="flex items-center space-x-2 text-sm">
                    <a href="#" className="text-brand-600 hover:text-brand-700">Home</a>
                    <span className="text-neutral-400">/</span>
                    <a href="#" className="text-brand-600 hover:text-brand-700">Components</a>
                    <span className="text-neutral-400">/</span>
                    <span className="text-neutral-700">Navigation</span>
                  </nav>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-3">Pagination</h4>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">
                      Previous
                    </button>
                    <button className="px-3 py-1 text-sm bg-brand-600 text-white rounded">1</button>
                    <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">2</button>
                    <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">3</button>
                    <span className="px-2 text-neutral-400">...</span>
                    <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">10</button>
                    <button className="px-3 py-1 text-sm border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-3">Menu Items</h4>
                  <div className="bg-white border border-neutral-200 rounded-lg p-2 w-64">
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
                      <User size={16} className="text-neutral-600" />
                      <span className="text-sm text-neutral-700">Profile</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
                      <Settings size={16} className="text-neutral-600" />
                      <span className="text-sm text-neutral-700">Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
                      <Bell size={16} className="text-neutral-600" />
                      <span className="text-sm text-neutral-700">Notifications</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Section */}
        {activeTab === 'feedback' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Status & Feedback</h3>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-neutral-900">Alert Messages</h4>
                  
                  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-green-800">
                        <strong>Success!</strong> Your changes have been saved.
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-yellow-800">
                        <strong>Warning!</strong> Please review your information.
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-red-800">
                        <strong>Error!</strong> Something went wrong.
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-blue-800">
                        <strong>Info:</strong> Here's some helpful information.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-neutral-900">Progress Indicators</h4>
                  
                  <div>
                    <div className="flex justify-between text-sm text-neutral-600 mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-brand-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-neutral-600 mb-1">
                      <span>Upload</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-accent-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-neutral-700 mb-2">Loading Spinner</h5>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveComponents;
