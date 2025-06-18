import React, { useEffect, useState } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { DatabaseTable, TableDetails } from '../types/database.types';
import { TableList } from './TableList';
import { TableSchema } from './TableSchema';
import { TableRelationships } from './TableRelationships';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Database, RefreshCw, Table as TableIcon } from 'lucide-react';

export const DatabaseVisualizer: React.FC = () => {
  const {
    tables,
    loading,
    error,
    isConfigured,
    fetchTablesWithCounts,
    fetchTableDetails
  } = useDatabase();

  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null);
  const [tableDetails, setTableDetails] = useState<TableDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    if (isConfigured) {
      fetchTablesWithCounts();
    }
  }, [isConfigured, fetchTablesWithCounts]);

  const handleTableSelect = async (table: DatabaseTable) => {
    setSelectedTable(table);
    setDetailsLoading(true);
    
    const details = await fetchTableDetails(table.schema, table.name);
    setTableDetails(details);
    setDetailsLoading(false);
  };

  const handleRefresh = () => {
    fetchTablesWithCounts();
    if (selectedTable) {
      handleTableSelect(selectedTable);
    }
  };

  if (!isConfigured) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Configuration Required</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Supabase is not configured. Please add the following environment variables to your <code className="font-mono text-sm bg-muted px-1 rounded">.env.local</code> file:
            </p>
            <pre className="bg-muted p-3 rounded-md text-sm">
{`VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
            </pre>
            <p className="mt-2 text-sm text-muted-foreground">
              After adding the environment variables, restart your development server.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Database className="w-8 h-8" />
            Database Visualizer
          </h1>
          <p className="text-muted-foreground mt-1">
            Explore your database schema, tables, and relationships
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {loading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <TableList
              tables={tables}
              onTableSelect={handleTableSelect}
              selectedTable={selectedTable}
            />
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {selectedTable && tableDetails ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TableIcon className="w-5 h-5" />
                    {tableDetails.table.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="outline">{tableDetails.table.schema}</Badge>
                    <Badge variant="secondary">{tableDetails.table.type}</Badge>
                    {tableDetails.table.rowCount !== undefined && (
                      <Badge>{tableDetails.table.rowCount} rows</Badge>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>

              {detailsLoading ? (
                <>
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-64 w-full" />
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <TableSchema
                    tableName={tableDetails.table.name}
                    columns={tableDetails.columns}
                  />
                  
                  <TableRelationships
                    tableName={tableDetails.table.name}
                    relationships={tableDetails.relationships}
                  />

                  {tableDetails.sampleData && tableDetails.sampleData.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Sample Data</CardTitle>
                        <CardDescription>
                          First {tableDetails.sampleData.length} rows
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                            {JSON.stringify(tableDetails.sampleData, null, 2)}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Database className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Select a table from the list to view its details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};