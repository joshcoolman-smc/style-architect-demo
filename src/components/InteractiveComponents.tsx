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
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-display-xl font-bold text-foreground mb-2">Interactive Components</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive library of interactive UI components with consistent styling and behavior.
        </p>
      </div>

      {/* Component Categories */}
      <div className="ds-card p-8">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-primary border-primary bg-accent'
                  : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-accent/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Section */}
        {activeTab === 'cards' && (
          <div className="space-y-8">
            <div>
              <div className="technical-detail">VERTICAL CARDS</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Team Member Cards</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
                {/* Card 1 */}
                <div className="ds-card-interactive p-6">
                  <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-zinc-800">
                    <img 
                      src="/lovable-uploads/3305bbc4-8f0b-4f03-85d9-09317b8a3a1f.png" 
                      alt="Creative Director"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground">Marcus Chen</h4>
                    <div className="technical-detail">CREATIVE DIRECTOR</div>
                    <p className="text-sm text-muted-foreground">
                      Passionate about creating meaningful digital experiences that bridge the gap between design and technology.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="ds-card-interactive p-6">
                  <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-zinc-800">
                    <img 
                      src="/lovable-uploads/a2c46f92-8e14-4bb0-a73d-41febc39823a.png" 
                      alt="Product Designer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground">James Rodriguez</h4>
                    <div className="technical-detail">PRODUCT DESIGNER</div>
                    <p className="text-sm text-muted-foreground">
                      Specializes in user-centered design approaches that create intuitive and delightful product experiences.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="ds-card-interactive p-6">
                  <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-zinc-800">
                    <img 
                      src="/lovable-uploads/5b77dfe0-1f0c-4e8c-9b46-5c88c3d5e041.png" 
                      alt="Design Lead"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-foreground">Alex Taylor</h4>
                    <div className="technical-detail">DESIGN LEAD</div>
                    <p className="text-sm text-muted-foreground">
                      Leads cross-functional teams to deliver cohesive design systems and brand experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="technical-detail">HORIZONTAL CARDS</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Project Showcases</h3>
              <div className="space-y-4 max-w-4xl">
                {/* Horizontal Card 1 */}
                <div className="ds-card-interactive p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                      <img 
                        src="/lovable-uploads/209e88c5-2e6e-43dd-ac8b-37e45fd7e358.png" 
                        alt="Modern Architecture"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg font-semibold text-foreground">Architectural Studio</h4>
                      <div className="technical-detail">COPENHAGEN, DENMARK</div>
                      <p className="text-sm text-muted-foreground">
                        Contemporary workspace design featuring clean lines, natural materials, and abundant natural light creating an inspiring environment for creative collaboration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Horizontal Card 2 */}
                <div className="ds-card-interactive p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                      <img 
                        src="/lovable-uploads/c7882e27-4b93-4093-b2f0-b30adaf793ce.png" 
                        alt="Modern Interior"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg font-semibold text-foreground">Creative Workspace</h4>
                      <div className="technical-detail">BROOKLYN, NEW YORK</div>
                      <p className="text-sm text-muted-foreground">
                        Industrial-meets-modern interior design blending exposed beams with contemporary fixtures and warm wood tones for a dynamic creative environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Section */}
        {activeTab === 'buttons' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Button Variants</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Primary</h4>
                  <div className="space-y-2">
                    <button className="ds-button-primary w-full">Large Primary</button>
                    <button className="ds-button-primary text-sm px-3 py-1.5 w-full">Medium Primary</button>
                    <button className="ds-button-primary text-xs px-2 py-1 w-full">Small Primary</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Secondary</h4>
                  <div className="space-y-2">
                    <button className="ds-button-secondary w-full">Large Secondary</button>
                    <button className="ds-button-secondary text-sm px-3 py-1.5 w-full">Medium Secondary</button>
                    <button className="ds-button-secondary text-xs px-2 py-1 w-full">Small Secondary</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Outline</h4>
                  <div className="space-y-2">
                    <button className="border border-border text-foreground px-4 py-2 rounded-lg font-medium transition-colors hover:bg-accent w-full">
                      Large Outline
                    </button>
                    <button className="border border-border text-foreground text-sm px-3 py-1.5 rounded-lg font-medium transition-colors hover:bg-accent w-full">
                      Medium Outline
                    </button>
                    <button className="border border-border text-foreground text-xs px-2 py-1 rounded-lg font-medium transition-colors hover:bg-accent w-full">
                      Small Outline
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Icon Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="ds-button-primary flex items-center space-x-2">
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button className="ds-button-secondary flex items-center space-x-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="p-2 rounded-lg border border-border hover:bg-accent transition-colors">
                  <Heart size={16} className="text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg border border-border hover:bg-accent transition-colors">
                  <Star size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Button States</h3>
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
              <h3 className="text-xl font-semibold text-foreground mb-4">Input Fields</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Text Input
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter your text..."
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Search Input
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Textarea
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter your message..."
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-background text-foreground"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Dropdown
                    </label>
                    <div className="relative">
                      <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-background text-foreground"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Checkbox
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">I agree to the terms</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Range Slider
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-sm text-muted-foreground text-center">Value: {sliderValue}</div>
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
              <h3 className="text-xl font-semibold text-foreground mb-4">Navigation Elements</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Breadcrumbs</h4>
                  <nav className="flex items-center space-x-2 text-sm">
                    <a href="#" className="text-primary hover:text-primary/80">Home</a>
                    <span className="text-muted-foreground">/</span>
                    <a href="#" className="text-primary hover:text-primary/80">Components</a>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground">Navigation</span>
                  </nav>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Pagination</h4>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm border border-border rounded hover:bg-accent transition-colors">
                      Previous
                    </button>
                    <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">1</button>
                    <button className="px-3 py-1 text-sm border border-border rounded hover:bg-accent transition-colors">2</button>
                    <button className="px-3 py-1 text-sm border border-border rounded hover:bg-accent transition-colors">3</button>
                    <span className="px-2 text-muted-foreground">...</span>
                    <button className="px-3 py-1 text-sm border border-border rounded hover:bg-accent transition-colors">10</button>
                    <button className="px-3 py-1 text-sm border border-border rounded hover:bg-accent transition-colors">
                      Next
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Menu Items</h4>
                  <div className="bg-card border border-border rounded-lg p-2 w-64">
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                      <User size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Profile</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                      <Settings size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                      <Bell size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Notifications</span>
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
              <h3 className="text-xl font-semibold text-foreground mb-4">Status & Feedback</h3>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-foreground">Alert Messages</h4>
                  
                  <div className="border-l-4 border-green-500 bg-green-950/20 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-green-400">
                        <strong>Success!</strong> Your changes have been saved.
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 bg-yellow-950/20 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-yellow-400">
                        <strong>Warning!</strong> Please review your information.
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-red-500 bg-red-950/20 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-red-400">
                        <strong>Error!</strong> Something went wrong.
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 bg-blue-950/20 p-4 rounded-r-lg">
                    <div className="flex items-center">
                      <div className="text-blue-400">
                        <strong>Info:</strong> Here's some helpful information.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-foreground">Progress Indicators</h4>
                  
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Upload</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-muted-foreground mb-2">Loading Spinner</h5>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
