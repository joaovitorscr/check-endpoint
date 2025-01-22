"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

type EndpointData = {
  method: (typeof HTTP_METHODS)[number];
  path: string;
  description: string;
};

interface EndpointFormProps {
  onSubmit: (data: EndpointData) => void;
}

export function EndpointForm({ onSubmit }: EndpointFormProps) {
  const [method, setMethod] = useState<(typeof HTTP_METHODS)[number]>("GET");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ method, path, description });
    setPath("");
    setDescription("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Endpoint</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="method">HTTP Method</Label>
            <Select
              value={method}
              onValueChange={(value: (typeof HTTP_METHODS)[number]) =>
                setMethod(value)
              }
            >
              <SelectTrigger id="method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {HTTP_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="path">Path</Label>
            <Input
              id="path"
              placeholder="/api/resource"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe what this endpoint does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Register Endpoint
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
