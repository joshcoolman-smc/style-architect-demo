# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (Vite) on port 8080
- `npm run build` - Production build
- `npm run build:dev` - Development build 
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Package Management
This project uses npm with package-lock.json. A pnpm-lock.yaml exists but npm is the primary package manager.

## Architecture Overview

This is a **Design System Explorer** built with React + TypeScript + Vite, using a sophisticated **feature-based architecture** with clean separation of concerns.

### Core Architecture Pattern
The codebase follows a **feature module pattern** where each domain is completely self-contained:

```
src/features/[domain]/
├── components/     # Feature-specific UI components
├── hooks/         # Custom React hooks for the feature
├── service/       # Business logic layer (interfaces + implementations)
├── repository/    # Data access layer (interfaces + implementations)  
├── utils/         # Feature-specific utilities
└── types/         # TypeScript type definitions
```

### Key Features
- **colors/**: Color palette generation from images, algorithmic palettes, color management
- **typography/**: Font combinations, type scales, typography systems
- **elements/**: UI component demonstrations (cards, layouts)
- **fonts/**: Font selection and management

### State Management
- **Zustand** with persistence for global state (see `src/stores/colorStore.ts`)
- Local state managed through custom hooks within features
- Repository pattern abstracts data access from business logic

### Styling System
- **Tailwind CSS** with extensive custom configuration
- **shadcn/ui** components in `src/components/ui/`
- Custom font system with CSS variables for dynamic typography
- Dynamic type scale system using CSS custom properties
- Comprehensive spacing system based on 8px units

### Component Architecture
- **Compound components** for complex UI patterns
- **Composition over inheritance** throughout
- **Feature components** remain within their domain boundaries
- **Shared components** in `src/components/` for cross-feature use

### Navigation & Routing
React Router with these main routes:
- `/` - Landing page
- `/colors` - Color palette tools
- `/typography` - Typography exploration  
- `/elements` - UI component showcase
- `/readme` - Built-in documentation viewer

### Development Philosophy
- **Repository + Service pattern** for clean architecture
- **Interface-based design** for testability and flexibility
- **Feature isolation** - each domain is completely self-contained
- **TypeScript strict mode** with comprehensive type coverage
- **Persistent state** using Zustand middleware for user preferences

## Important Technical Details

### Image Processing
The color feature includes advanced image analysis for palette extraction. Files are converted to base64 for persistence.

### Font Management
Typography system uses CSS custom properties for dynamic font switching with predefined font combinations.

### State Persistence
User selections (colors, fonts, etc.) persist across sessions using Zustand's persist middleware.

### Asset Handling
Images are stored in `public/lovable-uploads/` and referenced statically.