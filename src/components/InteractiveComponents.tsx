import React from 'react';
import { Search, Bell, User, Settings, ChevronDown, Heart, Star, Download } from 'lucide-react';
import { useColorStore } from '../stores/colorStore';

const InteractiveComponents = () => {
  const { palette } = useColorStore();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-display-xl font-bold text-foreground mb-2">Components</h1>
      </div>

      {/* Cards Section */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <div>
            <div className="technical-detail">VERTICAL CARDS</div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Team Member Cards</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              {/* Card 1 */}
              <div 
                className="ds-card-interactive p-6 transition-colors duration-300" 
                style={{ backgroundColor: palette["light-1"] + "20", borderColor: palette["mid-2"] }}
              >
                <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-zinc-800">
                  <img 
                    src="/lovable-uploads/3305bbc4-8f0b-4f03-85d9-09317b8a3a1f.png" 
                    alt="Creative Director"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">Marcus Chen</h4>
                  <div 
                    className="technical-detail transition-colors duration-300" 
                    style={{ color: palette["dark-1"] }}
                  >
                    CREATIVE DIRECTOR
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Passionate about creating meaningful digital experiences that bridge the gap between design and technology.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                className="ds-card-interactive p-6 transition-colors duration-300" 
                style={{ backgroundColor: palette["light-2"] + "20", borderColor: palette["mid-2"] }}
              >
                <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-zinc-800">
                  <img 
                    src="/lovable-uploads/a2c46f92-8e14-4bb0-a73d-41febc39823a.png" 
                    alt="Product Designer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">James Rodriguez</h4>
                  <div 
                    className="technical-detail transition-colors duration-300" 
                    style={{ color: palette["dark-1"] }}
                  >
                    PRODUCT DESIGNER
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Specializes in user-centered design approaches that create intuitive and delightful product experiences.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                className="ds-card-interactive p-6 transition-colors duration-300" 
                style={{ backgroundColor: palette["light-3"] + "20", borderColor: palette["mid-2"] }}
              >
                <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-zinc-800">
                  <img 
                    src="/lovable-uploads/5b77dfe0-1f0c-4e8c-9b46-5c88c3d5e041.png" 
                    alt="Design Lead"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">Alex Taylor</h4>
                  <div 
                    className="technical-detail transition-colors duration-300" 
                    style={{ color: palette["dark-1"] }}
                  >
                    DESIGN LEAD
                  </div>
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
              <div 
                className="ds-card-interactive p-6 transition-colors duration-300" 
                style={{ backgroundColor: palette["light-1"] + "15", borderColor: palette["mid-2"] }}
              >
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
                    <div 
                      className="technical-detail transition-colors duration-300" 
                      style={{ color: palette["dark-1"] }}
                    >
                      COPENHAGEN, DENMARK
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Contemporary workspace design featuring clean lines, natural materials, and abundant natural light creating an inspiring environment for creative collaboration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Horizontal Card 2 */}
              <div 
                className="ds-card-interactive p-6 transition-colors duration-300" 
                style={{ backgroundColor: palette["light-2"] + "15", borderColor: palette["mid-2"] }}
              >
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
                    <div 
                      className="technical-detail transition-colors duration-300" 
                      style={{ color: palette["dark-1"] }}
                    >
                      BROOKLYN, NEW YORK
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Industrial-meets-modern interior design blending exposed beams with contemporary fixtures and warm wood tones for a dynamic creative environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <div>
            <div className="technical-detail">BUTTON VARIANTS</div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Button Styles</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Primary</h4>
                <div className="space-y-2">
                  <button 
                    className="w-full px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-white"
                    style={{ backgroundColor: palette["mid-1"] }}
                  >
                    Large Primary
                  </button>
                  <button 
                    className="text-sm px-3 py-1.5 w-full rounded-lg font-medium transition-colors duration-300 text-white"
                    style={{ backgroundColor: palette["mid-1"] }}
                  >
                    Medium Primary
                  </button>
                  <button 
                    className="text-xs px-2 py-1 w-full rounded-lg font-medium transition-colors duration-300 text-white"
                    style={{ backgroundColor: palette["mid-1"] }}
                  >
                    Small Primary
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Secondary</h4>
                <div className="space-y-2">
                  <button 
                    className="w-full px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                    style={{ backgroundColor: palette["light-2"], color: palette["dark-1"] }}
                  >
                    Large Secondary
                  </button>
                  <button 
                    className="text-sm px-3 py-1.5 w-full rounded-lg font-medium transition-colors duration-300"
                    style={{ backgroundColor: palette["light-2"], color: palette["dark-1"] }}
                  >
                    Medium Secondary
                  </button>
                  <button 
                    className="text-xs px-2 py-1 w-full rounded-lg font-medium transition-colors duration-300"
                    style={{ backgroundColor: palette["light-2"], color: palette["dark-1"] }}
                  >
                    Small Secondary
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Outline</h4>
                <div className="space-y-2">
                  <button 
                    className="px-4 py-2 rounded-lg font-medium transition-colors duration-300 w-full"
                    style={{ border: `1px solid ${palette["mid-2"]}`, color: palette["dark-1"] }}
                  >
                    Large Outline
                  </button>
                  <button 
                    className="text-sm px-3 py-1.5 rounded-lg font-medium transition-colors duration-300 w-full"
                    style={{ border: `1px solid ${palette["mid-2"]}`, color: palette["dark-1"] }}
                  >
                    Medium Outline
                  </button>
                  <button 
                    className="text-xs px-2 py-1 rounded-lg font-medium transition-colors duration-300 w-full"
                    style={{ border: `1px solid ${palette["mid-2"]}`, color: palette["dark-1"] }}
                  >
                    Small Outline
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="technical-detail">ICON BUTTONS</div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Buttons with Icons</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-white"
                style={{ backgroundColor: palette["mid-1"] }}
              >
                <Download size={16} />
                <span>Download</span>
              </button>
              <button 
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                style={{ backgroundColor: palette["light-2"], color: palette["dark-1"] }}
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button 
                className="p-2 rounded-lg transition-colors duration-300"
                style={{ border: `1px solid ${palette["mid-2"]}`, color: palette["dark-1"] }}
              >
                <Heart size={16} />
              </button>
              <button 
                className="p-2 rounded-lg transition-colors duration-300"
                style={{ border: `1px solid ${palette["mid-2"]}`, color: palette["dark-1"] }}
              >
                <Star size={16} />
              </button>
            </div>
          </div>

          <div>
            <div className="technical-detail">BUTTON STATES</div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Interactive States</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-white"
                style={{ backgroundColor: palette["mid-1"] }}
              >
                Normal
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-white opacity-75"
                style={{ backgroundColor: palette["mid-1"] }}
              >
                Hover
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-white opacity-50 cursor-not-allowed" 
                style={{ backgroundColor: palette["mid-1"] }}
                disabled
              >
                Disabled
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-white animate-pulse"
                style={{ backgroundColor: palette["mid-1"] }}
              >
                Loading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveComponents;
