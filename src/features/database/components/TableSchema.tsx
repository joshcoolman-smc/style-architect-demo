import React from 'react';
import { TableColumn } from '../types/database.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Key, Hash, Type, Calendar, ToggleLeft, FileText } from 'lucide-react';

interface TableSchemaProps {
  tableName: string;
  columns: TableColumn[];
}

export const TableSchema: React.FC<TableSchemaProps> = ({ tableName, columns }) => {
  const getDataTypeIcon = (dataType: string) => {
    const type = dataType.toLowerCase();
    if (type.includes('int') || type.includes('numeric') || type.includes('decimal')) {
      return <Hash className="w-4 h-4" />;
    }
    if (type.includes('varchar') || type.includes('text') || type.includes('char')) {
      return <Type className="w-4 h-4" />;
    }
    if (type.includes('date') || type.includes('time')) {
      return <Calendar className="w-4 h-4" />;
    }
    if (type.includes('bool')) {
      return <ToggleLeft className="w-4 h-4" />;
    }
    if (type.includes('json')) {
      return <FileText className="w-4 h-4" />;
    }
    return <Type className="w-4 h-4" />;
  };

  const formatDataType = (column: TableColumn) => {
    let type = column.data_type;
    if (column.character_maximum_length) {
      type += `(${column.character_maximum_length})`;
    } else if (column.numeric_precision && column.numeric_scale) {
      type += `(${column.numeric_precision},${column.numeric_scale})`;
    }
    return type;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Table Schema: {tableName}</CardTitle>
        <CardDescription>
          {columns.length} {columns.length === 1 ? 'column' : 'columns'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Column</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {columns.map((column) => (
              <TableRow key={column.column_name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {column.column_name === 'id' && <Key className="w-4 h-4 text-primary" />}
                    {column.column_name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getDataTypeIcon(column.data_type)}
                    <code className="text-sm">{formatDataType(column)}</code>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};