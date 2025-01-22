"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Play, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Endpoint = {
  id: string;
  method: string;
  path: string;
  description: string;
};

interface EndpointListProps {
  endpoints: Endpoint[];
  onDelete: (id: string) => void;
  onTest: (endpoint: Endpoint) => void;
  selectedEndpoint?: Endpoint | null;
}

const methodColors: Record<string, string> = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
  PATCH: "bg-purple-500",
};

export function EndpointList({
  endpoints,
  onDelete,
  onTest,
  selectedEndpoint,
}: EndpointListProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Method</TableHead>
              <TableHead>Path</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endpoints.map((endpoint) => (
              <TableRow
                key={endpoint.id}
                className={
                  selectedEndpoint?.id === endpoint.id ? "bg-muted/50" : ""
                }
              >
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${methodColors[endpoint.method]} text-white`}
                  >
                    {endpoint.method}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{endpoint.path}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {endpoint.description || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        selectedEndpoint?.id === endpoint.id
                          ? "secondary"
                          : "ghost"
                      }
                      size="icon"
                      onClick={() => onTest(endpoint)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(endpoint.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {endpoints.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No endpoints registered yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
