# Database Visualizer Feature

## Purpose
The Database Visualizer feature provides a comprehensive interface for exploring and understanding database schemas, table structures, and relationships. It enables developers and stakeholders to visually inspect the database structure without requiring direct database access or SQL knowledge.

## Functionality
This feature provides:

- **Table Discovery**: Automatically detects and lists all database tables with row counts
- **Schema Visualization**: Displays detailed column information including data types and constraints
- **Relationship Mapping**: Shows foreign key relationships between tables with visual connections
- **Sample Data Preview**: Provides sample records from each table for data exploration
- **Real-time Updates**: Includes refresh functionality to reflect current database state

### User Experience
Users can browse tables in a sidebar, click on any table to view its detailed schema, see relationships with other tables, and preview actual data - all within a clean, responsive interface that works in both light and dark modes.

## Architecture

### Data Flow
1. **Repository Layer** (`databaseRepository.ts`) - Direct database access via Supabase client
2. **Service Layer** (`databaseService.ts`) - Business logic for data processing and aggregation  
3. **Hook Layer** (`useDatabase.ts`) - React state management and API coordination
4. **Component Layer** - UI presentation with real-time data binding

### State Management
- Local React state via custom `useDatabase` hook
- Persistent Supabase client configuration via environment variables
- Real-time data fetching with loading and error states

### Database Integration
- **Supabase Client**: Type-safe database queries using `@supabase/supabase-js`
- **Environment Configuration**: Secure credential management via `.env.local`
- **Fallback Handling**: Graceful degradation when database is unavailable

## Key Components

### `DatabaseVisualizer`
Main orchestrator component that:
- Manages overall layout and user interactions
- Coordinates data fetching and state updates
- Handles configuration validation and error states
- Provides refresh functionality

### `TableList` 
Sidebar component that:
- Displays searchable list of database tables
- Shows row counts for each table
- Handles table selection with visual feedback
- Responsive design for mobile and desktop

### `TableSchema`
Schema display component that:
- Renders column information in a clean table format
- Uses appropriate icons for different data types (Hash for numbers, Type for text, Calendar for dates, etc.)
- Shows primary key indicators with Key icons
- Formats data types with precision information

### `TableRelationships`
Relationship visualization component that:
- Maps foreign key connections between tables
- Separates incoming vs. outgoing relationships
- Provides clear visual hierarchy of data connections
- Links directly to related tables for navigation

### `useDatabase` Hook
Central state management that:
- Encapsulates all database operations
- Provides loading states and error handling
- Implements configuration validation
- Exposes clean API for components

## Integration Points

### Application-Level Integration
- **Routing**: Accessible via `/dbtest` route in main application router
- **Layout**: Integrates with shared `Layout` and `AnimatedPage` components
- **Theming**: Fully compatible with application's light/dark mode system
- **Error Boundaries**: Wrapped in application-level error handling

### External Dependencies
- **Supabase**: Primary database connection and querying
- **Tailwind CSS**: All styling via utility classes for consistency
- **Lucide React**: Icons for data type indicators and UI elements
- **Radix UI**: Accessible primitives via shadcn/ui components (Table, Card, Badge, etc.)

### Environment Requirements
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Data Models

### Core Types
```typescript
interface DatabaseTable {
  schema: string;
  name: string;
  type: 'table' | 'view';
  rowCount?: number;
}

interface TableColumn {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  // Additional metadata fields...
}

interface TableRelationship {
  source_schema: string;
  source_table: string;
  source_column: string;
  target_schema: string;
  target_table: string;
  target_column: string;
  constraint_name: string;
}
```

## Testing Considerations

### Current Implementation
- **Hardcoded Table Data**: Uses static table definitions for reliability
- **Error Handling**: Comprehensive error states for connection issues
- **Loading States**: Proper loading indicators for all async operations

### Recommended Testing
- **Unit Tests**: Repository and service layer methods
- **Integration Tests**: Database connection and query functionality  
- **Component Tests**: UI interactions and state management
- **E2E Tests**: Full user workflows from table selection to data viewing

## Future Improvements

### Planned Enhancements
- **Dynamic Schema Discovery**: Real-time detection of new tables and schema changes
- **Advanced Filtering**: Search and filter capabilities for large databases
- **Export Functionality**: Generate schema documentation and ER diagrams
- **Query Builder**: Visual interface for building and executing custom queries
- **Performance Metrics**: Table size, index information, and query performance data

### Technical Debt
- **Information Schema Access**: Currently uses hardcoded table definitions due to Supabase client limitations
- **Column Metadata**: Limited column detail display due to RPC function requirements
- **Real-time Updates**: Manual refresh required for schema changes

### Scalability Considerations
- **Large Databases**: Pagination for tables with many columns/relationships
- **Performance**: Caching strategies for frequently accessed schema data
- **Multi-tenant**: Support for multiple database connections and schemas