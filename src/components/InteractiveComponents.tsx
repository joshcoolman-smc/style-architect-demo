
import React from 'react';
import { useColorStore } from '../stores/colorStore';
import TeamMemberCard from './cards/TeamMemberCard';
import ProjectShowcaseCard from './cards/ProjectShowcaseCard';
import { teamMembers } from '../data/teamMembers';
import { projects } from '../data/projects';

const InteractiveComponents = () => {
  const { palette } = useColorStore();

  return (
    <div className="space-y-12">
    

      {/* Cards Section */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <div>
            <div className="technical-detail">VERTICAL CARDS</div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Team Member Cards</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          <div>
            <div className="technical-detail">HORIZONTAL CARDS</div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Project Showcases</h3>
            <div className="space-y-4 max-w-4xl">
              {projects.map((project) => (
                <ProjectShowcaseCard key={project.id} project={project} />
              ))}
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
            <div className="grid gap-6 sm:grid-cols-3 max-w-2xl">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Primary</h4>
                <button 
                  className="w-full px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-white"
                  style={{ backgroundColor: palette["mid-1"] }}
                >
                  Primary Button
                </button>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Secondary</h4>
                <button 
                  className="w-full px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  style={{ backgroundColor: palette["light-2"], color: palette["dark-1"] }}
                >
                  Secondary Button
                </button>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Outline</h4>
                <button 
                  className="px-6 py-3 rounded-lg font-medium transition-colors duration-300 w-full"
                  style={{ border: `1px solid ${palette["mid-2"]}`, color: palette["dark-1"] }}
                >
                  Outline Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveComponents;
