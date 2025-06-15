
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useColorStore } from '../../../stores/colorStore';
import { useColorStrategy } from '../hooks/useColorStrategy';
import SectionHeader from './SectionHeader';
import TestimonialCard from './cards/TestimonialCard';
import TeamMemberCard from './cards/TeamMemberCard';
import ProjectShowcaseCard from './cards/ProjectShowcaseCard';
import DataVisualization from './DataVisualization';
import InteractiveForms from './InteractiveForms';
import { testimonials } from '../data/testimonials';
import { teamMembers } from '../data/teamMembers';
import { projects } from '../data/projects';

const ElementsShowcase = () => {
  const { palette } = useColorStore();
  const { strategyState, refreshStrategy, toggleLock, toggleInvert } = useColorStrategy();

  // Animation variants for staggered card entrance
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
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
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        duration: 0.4
      }
    }
  };

  return (
    <div className="space-y-12">
      {/* Cards Section - Moved to top */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <SectionHeader
            title="Cards"
            description="Cards showcase how content adapts to different color tones and typography hierarchies."
            isLocked={strategyState.cards.isLocked}
            isInverted={strategyState.cards.isInverted}
            onRefresh={() => refreshStrategy('cards', 3)}
            onToggleLock={() => toggleLock('cards')}
            onToggleInvert={() => toggleInvert('cards')}
          />
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={member.id} variants={cardVariants}>
                <TeamMemberCard 
                  member={member} 
                  colorStrategy={strategyState.cards.currentStrategy}
                  isInverted={strategyState.cards.isInverted}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Single horizontal card representation */}
          <div className="mt-8">
            <motion.div variants={cardVariants}>
              <ProjectShowcaseCard 
                project={projects[0]} 
                colorStrategy={strategyState.cards.currentStrategy}
                isInverted={strategyState.cards.isInverted}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - Quote typography & color backgrounds */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <SectionHeader
            title="Testimonials"
            description="See how typography and color create different moods for the same content."
            isLocked={strategyState.testimonials.isLocked}
            isInverted={strategyState.testimonials.isInverted}
            onRefresh={() => refreshStrategy('testimonials', 4)}
            onToggleLock={() => toggleLock('testimonials')}
            onToggleInvert={() => toggleInvert('testimonials')}
          />
          <motion.div 
            className="grid gap-6 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={cardVariants}>
                <TestimonialCard 
                  testimonial={testimonial} 
                  colorStrategy={strategyState.testimonials.currentStrategy}
                  cardIndex={index}
                  isInverted={strategyState.testimonials.isInverted}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Data Visualization - Numbers & progress with color mapping */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <SectionHeader
            title="Data Visualization"
            description="Watch numbers come alive with your color choices and typography selections."
            isLocked={strategyState.dataVisualization.isLocked}
            isInverted={strategyState.dataVisualization.isInverted}
            onRefresh={() => refreshStrategy('dataVisualization', 4)}
            onToggleLock={() => toggleLock('dataVisualization')}
            onToggleInvert={() => toggleInvert('dataVisualization')}
          />
          <DataVisualization 
            colorStrategy={strategyState.dataVisualization.currentStrategy}
            isInverted={strategyState.dataVisualization.isInverted}
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <div>
            <h3 className="text-heading-3 font-structural text-foreground mb-2">Buttons</h3>
            <p className="text-body font-content text-muted-foreground mb-6">
              Button variations demonstrate your color system in interactive elements.
            </p>
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

      {/* Interactive Forms - Focus states & dynamic feedback */}
      <div className="ds-card p-8">
        <div className="space-y-8">
          <SectionHeader
            title="Interactive Forms"
            description="Experience how your color palette creates interactive feedback systems."
            isLocked={strategyState.forms.isLocked}
            isInverted={strategyState.forms.isInverted}
            onRefresh={() => refreshStrategy('forms', 3)}
            onToggleLock={() => toggleLock('forms')}
            onToggleInvert={() => toggleInvert('forms')}
          />
          <InteractiveForms 
            colorStrategy={strategyState.forms.currentStrategy}
            isInverted={strategyState.forms.isInverted}
          />
        </div>
      </div>
    </div>
  );
};

export default ElementsShowcase;
