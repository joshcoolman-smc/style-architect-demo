export interface DatabaseTable {
  schema: string;
  name: string;
  type: 'table' | 'view';
  rowCount?: number;
}

export interface TableColumn {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  character_maximum_length: number | null;
  numeric_precision: number | null;
  numeric_scale: number | null;
  is_identity: string;
  identity_generation: string | null;
}

export interface TableRelationship {
  source_schema: string;
  source_table: string;
  source_column: string;
  target_schema: string;
  target_table: string;
  target_column: string;
  constraint_name: string;
}

export interface DatabaseSchema {
  tables: DatabaseTable[];
  relationships: TableRelationship[];
}

export interface TableDetails {
  table: DatabaseTable;
  columns: TableColumn[];
  relationships: {
    incoming: TableRelationship[];
    outgoing: TableRelationship[];
  };
  sampleData?: Record<string, any>[];
}