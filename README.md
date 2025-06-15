
# Design System Explorer

A modern web application for experimenting with and demonstrating design system fundamentals including color palettes, typography, and UI elements.

## What is this app for?

This tool is designed for designers, developers, and design enthusiasts who want to:

- **Experiment with color palettes**: Generate harmonious color schemes from uploaded images or explore curated sample palettes
- **Explore typography combinations**: Test different font pairings and type scales to find the perfect typographic hierarchy
- **Visualize design elements**: See how colors and typography work together in real UI components like cards, buttons, and layouts
- **Create style guides**: Develop and iterate on design systems with immediate visual feedback

Perfect for design exploration, client presentations, or building the foundation of your next project's visual identity.

## Features

- **🎨 Smart Color Palette Generation**: Upload any image to extract a 9-color palette, or cycle through curated sample images
- **📝 Typography System**: Experiment with different font combinations and type scales
- **🧩 Component Showcase**: See your design choices applied to real UI elements (cards, buttons, layouts)
- **💾 Persistent State**: Your design choices persist as you navigate between different sections
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

This project is built with modern web technologies:

- **React 18** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, accessible UI component library
- **Zustand** - Lightweight state management with persistence
- **React Router** - Client-side routing for navigation
- **Lucide React** - Beautiful, customizable icons

## How it was created

This application was built using [Lovable](https://lovable.dev), an AI-powered web development platform that enables rapid prototyping and development of React applications. The design system approach focuses on modularity, accessibility, and real-time visual feedback.

## Project Structure

```
src/
├── features/           # Feature-based organization
│   ├── colors/        # Color palette generation and management
│   ├── typography/    # Font systems and type scales
│   ├── elements/      # UI component demonstrations
│   └── fonts/         # Font selection and management
├── stores/            # Zustand state management
├── components/        # Shared UI components
└── pages/            # Route-based page components
```

## Getting Started

### Prerequisites

- Node.js (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or your preferred package manager

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local development URL shown in your terminal.

## Usage

1. **Colors**: Start by uploading an image or selecting a sample to generate a color palette
2. **Typography**: Experiment with different font combinations and see them applied to various text elements
3. **Elements**: View how your color and typography choices work together in real UI components

Your design choices will persist as you navigate between sections, allowing you to build and refine your design system iteratively.

## Deployment

Deploy your customized version using [Lovable's deployment feature](https://docs.lovable.dev) or any static hosting service that supports React applications.

## Contributing

This project serves as both a functional tool and a learning resource. Feel free to fork, modify, and adapt it for your own design system needs.

## License

Open source - feel free to use this project as a foundation for your own design system tools.
