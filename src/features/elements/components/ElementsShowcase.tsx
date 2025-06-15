
import React from 'react';
import { useColorStore } from '../../../stores/colorStore';
import TeamMemberCard from './cards/TeamMemberCard';
import ProjectShowcaseCard from './cards/ProjectShowcaseCard';
import { teamMembers } from '../data/teamMembers';
import { projects } from '../data/projects';

const ElementsShowcase = () => {
  const { palette } = useColorStore();

  return (
    <div className="space-y-12">
      {/* Cards Section */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <div>
            <h3 className="text-heading-3 font-structural text-foreground mb-4">Cards</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          <div>
            <div className="space-y-4">
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
            <h3 className="text-heading-3 font-structural text-foreground mb-4">Buttons</h3>
            <div className="grid gap-6 sm:grid-cols-3 max-w-2xl">
              <div className="space-y-3">
                <h4 className="text-caption font-structural text-muted-foreground uppercase tracking-wide">Primary</h4>
                <button 
                  className="w-full px-6 py-3 rounded-lg text-body font-structural transition-colors duration-300 text-white"
                  style={{ backgroundColor: palette["mid-1"] }}
                >
                  Primary Button
                </button>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-caption font-structural text-muted-foreground uppercase tracking-wide">Secondary</h4>
                <button 
                  className="w-full px-6 py-3 rounded-lg text-body font-structural transition-colors duration-300"
                  style={{ backgroundColor: palette["light-2"], color: palette["dark-1"] }}
                >
                  Secondary Button
                </button>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-caption font-structural text-muted-foreground uppercase tracking-wide">Outline</h4>
                <button 
                  className="px-6 py-3 rounded-lg text-body font-structural transition-colors duration-300 w-full"
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

export default ElementsShowcase;
