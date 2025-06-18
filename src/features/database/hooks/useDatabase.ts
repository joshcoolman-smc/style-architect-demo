import { useState, useEffect, useCallback } from 'react';
import { DatabaseRepository } from '../repository/databaseRepository';
import { DatabaseService } from '../service/databaseService';
import { DatabaseSchema, TableDetails, DatabaseTable } from '../types/database.types';
import { isSupabaseConfigured } from '../utils/supabaseClient';

// Create singleton instances
const repository = new DatabaseRepository();
const service = new DatabaseService(repository);

export const useDatabase = () => {
  const [schema, setSchema] = useState<DatabaseSchema | null>(null);
  const [tables, setTables] = useState<DatabaseTable[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    setIsConfigured(isSupabaseConfigured());
  }, []);

  const fetchDatabaseSchema = useCallback(async () => {
    if (!isConfigured) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const databaseSchema = await service.getDatabaseSchema();
      setSchema(databaseSchema);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch database schema');
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  const fetchTablesWithCounts = useCallback(async () => {
    if (!isConfigured) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const tablesData = await service.getTablesWithRowCounts();
      setTables(tablesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tables');
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  const fetchTableDetails = useCallback(async (schema: string, tableName: string): Promise<TableDetails | null> => {
    if (!isConfigured) {
      setError('Supabase is not configured');
      return null;
    }

    try {
      return await service.getTableDetails(schema, tableName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table details');
      return null;
    }
  }, [isConfigured]);

  return {
    schema,
    tables,
    loading,
    error,
    isConfigured,
    fetchDatabaseSchema,
    fetchTablesWithCounts,
    fetchTableDetails
  };
};