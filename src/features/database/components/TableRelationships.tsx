import React from 'react';
import { TableRelationship } from '../types/database.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Link2 } from 'lucide-react';

interface TableRelationshipsProps {
  tableName: string;
  relationships: {
    incoming: TableRelationship[];
    outgoing: TableRelationship[];
  };
}

export const TableRelationships: React.FC<TableRelationshipsProps> = ({ 
  tableName, 
  relationships 
}) => {
  const { incoming, outgoing } = relationships;
  const hasRelationships = incoming.length > 0 || outgoing.length > 0;

  if (!hasRelationships) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Relationships
          </CardTitle>
          <CardDescription>No relationships found for this table</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="w-5 h-5" />
          Relationships
        </CardTitle>
        <CardDescription>
          {incoming.length} incoming, {outgoing.length} outgoing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {outgoing.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Foreign Keys (References)
            </h4>
            <div className="space-y-2">
              {outgoing.map((rel, index) => (
                <div
                  key={`${rel.constraint_name}-${index}`}
                  className="p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{rel.source_column}</Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {rel.target_table}.{rel.target_column}
                      </span>
                    </div>
                    <code className="text-xs text-muted-foreground">
                      {rel.constraint_name}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {incoming.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Referenced By
            </h4>
            <div className="space-y-2">
              {incoming.map((rel, index) => (
                <div
                  key={`${rel.constraint_name}-${index}`}
                  className="p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {rel.source_table}.{rel.source_column}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="outline">{rel.target_column}</Badge>
                    </div>
                    <code className="text-xs text-muted-foreground">
                      {rel.constraint_name}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};