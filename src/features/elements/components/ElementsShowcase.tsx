
import React from 'react';
import { motion } from 'framer-motion';
import { useColorStore } from '../../../stores/colorStore';
import TeamMemberCard from './cards/TeamMemberCard';
import ProjectShowcaseCard from './cards/ProjectShowcaseCard';
import { teamMembers } from '../data/teamMembers';
import { projects } from '../data/projects';

const ElementsShowcase = () => {
  const { palette } = useColorStore();

  // Animation variants for staggered card entrance
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4
      }
    }
  };

  return (
    <div className="space-y-12">
      {/* Cards Section */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <div>
            <h3 className="text-heading-3 font-structural text-foreground mb-4">Cards</h3>
            <motion.div 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {teamMembers.map((member, index) => (
                <motion.div key={member.id} variants={cardVariants}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {projects.map((project, index) => (
                <motion.div key={project.id} variants={cardVariants}>
                  <ProjectShowcaseCard project={project} />
                </motion.div>
              ))}
            </motion.div>
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
