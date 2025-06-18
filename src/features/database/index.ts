// Components
export { DatabaseVisualizer } from './components/DatabaseVisualizer';
export { TableList } from './components/TableList';
export { TableSchema } from './components/TableSchema';
export { TableRelationships } from './components/TableRelationships';

// Hooks
export { useDatabase } from './hooks/useDatabase';

// Types
export type {
  DatabaseTable,
  TableColumn,
  TableRelationship,
  DatabaseSchema,
  TableDetails
} from './types/database.types';

// Utils
export { supabase, isSupabaseConfigured } from './utils/supabaseClient';