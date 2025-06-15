
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  colorTone: 'light' | 'mid' | 'dark';
}

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  colorTone: 'light' | 'mid';
}
