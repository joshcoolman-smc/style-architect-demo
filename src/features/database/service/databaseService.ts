import { IDatabaseRepository } from '../repository/databaseRepository';
import { 
  DatabaseSchema, 
  TableDetails,
  DatabaseTable,
  TableRelationship 
} from '../types/database.types';

export interface IDatabaseService {
  getDatabaseSchema(): Promise<DatabaseSchema>;
  getTableDetails(schema: string, tableName: string): Promise<TableDetails>;
  getTablesWithRowCounts(): Promise<DatabaseTable[]>;
}

export class DatabaseService implements IDatabaseService {
  constructor(private repository: IDatabaseRepository) {}

  async getDatabaseSchema(): Promise<DatabaseSchema> {
    try {
      const [tables, relationships] = await Promise.all([
        this.repository.getTables(),
        this.repository.getRelationships()
      ]);

      return {
        tables,
        relationships
      };
    } catch (error) {
      console.error('Error fetching database schema:', error);
      throw error;
    }
  }

  async getTableDetails(schema: string, tableName: string): Promise<TableDetails> {
    try {
      const [table, columns, relationships, sampleData, rowCount] = await Promise.all([
        this.repository.getTables().then(tables => 
          tables.find(t => t.schema === schema && t.name === tableName)
        ),
        this.repository.getTableColumns(schema, tableName),
        this.repository.getRelationships(),
        this.repository.getTableSampleData(schema, tableName),
        this.repository.getTableRowCount(schema, tableName)
      ]);

      if (!table) {
        throw new Error(`Table ${schema}.${tableName} not found`);
      }

      // Filter relationships for this table
      const tableRelationships = {
        incoming: relationships.filter(r => 
          r.target_schema === schema && r.target_table === tableName
        ),
        outgoing: relationships.filter(r => 
          r.source_schema === schema && r.source_table === tableName
        )
      };

      return {
        table: { ...table, rowCount },
        columns,
        relationships: tableRelationships,
        sampleData
      };
    } catch (error) {
      console.error('Error fetching table details:', error);
      throw error;
    }
  }

  async getTablesWithRowCounts(): Promise<DatabaseTable[]> {
    try {
      const tables = await this.repository.getTables();
      
      // Fetch row counts in parallel
      const tablesWithCounts = await Promise.all(
        tables.map(async (table) => {
          try {
            const rowCount = await this.repository.getTableRowCount(table.schema, table.name);
            return { ...table, rowCount };
          } catch (error) {
            console.error(`Error fetching row count for ${table.name}:`, error);
            return table;
          }
        })
      );

      return tablesWithCounts;
    } catch (error) {
      console.error('Error fetching tables with row counts:', error);
      throw error;
    }
  }
}