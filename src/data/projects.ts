
export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  colorTone: 'light' | 'mid';
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Architectural Studio',
    location: 'COPENHAGEN, DENMARK',
    description: 'Contemporary workspace design featuring clean lines, natural materials, and abundant natural light creating an inspiring environment for creative collaboration.',
    imageUrl: '/lovable-uploads/209e88c5-2e6e-43dd-ac8b-37e45fd7e358.png',
    colorTone: 'light'
  },
  {
    id: '2',
    title: 'Creative Workspace',
    location: 'BROOKLYN, NEW YORK',
    description: 'Industrial-meets-modern interior design blending exposed beams with contemporary fixtures and warm wood tones for a dynamic creative environment.',
    imageUrl: '/lovable-uploads/c7882e27-4b93-4093-b2f0-b30adaf793ce.png',
    colorTone: 'mid'
  }
];
