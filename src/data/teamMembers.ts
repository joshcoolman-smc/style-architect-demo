
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  colorTone: 'light' | 'mid' | 'dark';
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Marcus Chen',
    role: 'CREATIVE DIRECTOR',
    description: 'Passionate about creating meaningful digital experiences that bridge the gap between design and technology.',
    imageUrl: '/lovable-uploads/3305bbc4-8f0b-4f03-85d9-09317b8a3a1f.png',
    colorTone: 'light'
  },
  {
    id: '2',
    name: 'James Rodriguez',
    role: 'PRODUCT DESIGNER',
    description: 'Specializes in user-centered design approaches that create intuitive and delightful product experiences.',
    imageUrl: '/lovable-uploads/a2c46f92-8e14-4bb0-a73d-41febc39823a.png',
    colorTone: 'mid'
  },
  {
    id: '3',
    name: 'Alex Taylor',
    role: 'DESIGN LEAD',
    description: 'Leads cross-functional teams to deliver cohesive design systems and brand experiences.',
    imageUrl: '/lovable-uploads/5b77dfe0-1f0c-4e8c-9b46-5c88c3d5e041.png',
    colorTone: 'dark'
  }
];
