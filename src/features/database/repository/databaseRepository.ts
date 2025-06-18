import { supabase } from '../utils/supabaseClient';
import { 
  DatabaseTable, 
  TableColumn, 
  TableRelationship,
  DatabaseSchema,
  TableDetails 
} from '../types/database.types';

export interface IDatabaseRepository {
  getTables(): Promise<DatabaseTable[]>;
  getTableColumns(schema: string, tableName: string): Promise<TableColumn[]>;
  getRelationships(): Promise<TableRelationship[]>;
  getTableSampleData(schema: string, tableName: string, limit?: number): Promise<Record<string, any>[]>;
  getTableRowCount(schema: string, tableName: string): Promise<number>;
}

export class DatabaseRepository implements IDatabaseRepository {
  async getTables(): Promise<DatabaseTable[]> {
    // Get the list of tables we know exist
    const tables: DatabaseTable[] = [
      { schema: 'public', name: 'instructors', type: 'table' },
      { schema: 'public', name: 'crossfit_classes', type: 'table' },
      { schema: 'public', name: 'schedule', type: 'table' }
    ];
    
    return tables;
  }

  async getTableColumns(schema: string, tableName: string): Promise<TableColumn[]> {
    // Define the column structure for each table based on the Supabase list_tables data
    const tableColumns: Record<string, TableColumn[]> = {
      instructors: [
        { column_name: 'id', data_type: 'uuid', is_nullable: 'NO', column_default: 'gen_random_uuid()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'name', data_type: 'text', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'email', data_type: 'text', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'bio', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'specialties', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'certifications', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'years_experience', data_type: 'integer', is_nullable: 'YES', column_default: '0', character_maximum_length: null, numeric_precision: 32, numeric_scale: 0, is_identity: 'NO', identity_generation: null },
        { column_name: 'active', data_type: 'boolean', is_nullable: 'YES', column_default: 'true', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'YES', column_default: 'now()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'YES', column_default: 'now()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'profile_image_url', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'profile_image_path', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null }
      ],
      crossfit_classes: [
        { column_name: 'id', data_type: 'uuid', is_nullable: 'NO', column_default: 'gen_random_uuid()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'name', data_type: 'text', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'description', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'level', data_type: 'fitness_level', is_nullable: 'YES', column_default: "'all_levels'::fitness_level", character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'max_capacity', data_type: 'integer', is_nullable: 'YES', column_default: '15', character_maximum_length: null, numeric_precision: 32, numeric_scale: 0, is_identity: 'NO', identity_generation: null },
        { column_name: 'duration_minutes', data_type: 'integer', is_nullable: 'YES', column_default: '60', character_maximum_length: null, numeric_precision: 32, numeric_scale: 0, is_identity: 'NO', identity_generation: null },
        { column_name: 'class_type', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'YES', column_default: 'now()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'YES', column_default: 'now()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null }
      ],
      schedule: [
        { column_name: 'id', data_type: 'uuid', is_nullable: 'NO', column_default: 'gen_random_uuid()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'class_id', data_type: 'uuid', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'instructor_id', data_type: 'uuid', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'scheduled_date', data_type: 'date', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'start_time', data_type: 'time without time zone', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'end_time', data_type: 'time without time zone', is_nullable: 'NO', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'current_enrollment', data_type: 'integer', is_nullable: 'YES', column_default: '0', character_maximum_length: null, numeric_precision: 32, numeric_scale: 0, is_identity: 'NO', identity_generation: null },
        { column_name: 'status', data_type: 'class_status', is_nullable: 'YES', column_default: "'scheduled'::class_status", character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'notes', data_type: 'text', is_nullable: 'YES', column_default: null, character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'YES', column_default: 'now()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null },
        { column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'YES', column_default: 'now()', character_maximum_length: null, numeric_precision: null, numeric_scale: null, is_identity: 'NO', identity_generation: null }
      ]
    };

    return tableColumns[tableName] || [];
  }

  async getRelationships(): Promise<TableRelationship[]> {
    // Return the known relationships from your database
    const relationships: TableRelationship[] = [
      {
        source_schema: 'public',
        source_table: 'schedule',
        source_column: 'instructor_id',
        target_schema: 'public',
        target_table: 'instructors',
        target_column: 'id',
        constraint_name: 'schedule_instructor_id_fkey'
      },
      {
        source_schema: 'public',
        source_table: 'schedule',
        source_column: 'class_id',
        target_schema: 'public',
        target_table: 'crossfit_classes',
        target_column: 'id',
        constraint_name: 'schedule_class_id_fkey'
      }
    ];

    return relationships;
  }

  async getTableSampleData(schema: string, tableName: string, limit: number = 5): Promise<Record<string, any>[]> {
    // Use a safe table reference by constructing the from clause
    const tableRef = `${schema}.${tableName}`;
    
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(limit);

      if (error) {
        console.error('Error fetching sample data:', error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching sample data:', err);
      return [];
    }
  }

  async getTableRowCount(schema: string, tableName: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching row count:', error);
        return 0;
      }

      return count || 0;
    } catch (err) {
      console.error('Error fetching row count:', err);
      return 0;
    }
  }
}