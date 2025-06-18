import React from 'react';
import { DatabaseTable } from '../types/database.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, View, Database } from 'lucide-react';

interface TableListProps {
  tables: DatabaseTable[];
  onTableSelect: (table: DatabaseTable) => void;
  selectedTable?: DatabaseTable | null;
}

export const TableList: React.FC<TableListProps> = ({ 
  tables, 
  onTableSelect, 
  selectedTable 
}) => {
  const getIcon = (type: 'table' | 'view') => {
    return type === 'table' ? <Table className="w-4 h-4" /> : <View className="w-4 h-4" />;
  };

  const formatRowCount = (count?: number) => {
    if (count === undefined) return 'N/A';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Tables
        </CardTitle>
        <CardDescription>
          {tables.length} {tables.length === 1 ? 'table' : 'tables'} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tables.map((table) => (
            <div
              key={`${table.schema}.${table.name}`}
              onClick={() => onTableSelect(table)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-accent ${
                selectedTable?.name === table.name && selectedTable?.schema === table.schema
                  ? 'bg-accent border-primary'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIcon(table.type)}
                  <div>
                    <div className="font-medium">{table.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {table.schema}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={table.type === 'table' ? 'default' : 'secondary'}>
                    {table.type}
                  </Badge>
                  {table.rowCount !== undefined && (
                    <Badge variant="outline">
                      {formatRowCount(table.rowCount)} rows
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};