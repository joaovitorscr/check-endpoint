"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Timer,
  ArrowRight,
  Server,
  HeadingIcon as Headers,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RequestAnalyticsProps {
  endpoint: {
    method: string;
    path: string;
  };
}

interface AnalyticsData {
  status: number;
  duration: number;
  timestamp: string;
  headers: Record<string, string>;
  size: string;
}

export function RequestAnalytics({ endpoint }: RequestAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API request and analytics gathering
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAnalytics({
        status: 200,
        duration: 245, // milliseconds
        timestamp: new Date().toISOString(),
        headers: {
          "content-type": "application/json",
          "x-powered-by": "Next.js",
          "cache-control": "public, max-age=3600",
        },
        size: "1.2 KB",
      });
      setLoading(false);
    };

    void fetchData();
  }, [endpoint]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="outline">{endpoint.method}</Badge>
        <ArrowRight className="h-4 w-4" />
        <span className="font-mono">{endpoint.path}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7" />
            ) : (
              <div className="text-2xl font-bold">{analytics?.duration}ms</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7" />
            ) : (
              <div className="text-2xl font-bold">
                <Badge
                  variant={
                    analytics?.status === 200 ? "default" : "destructive"
                  }
                >
                  {analytics?.status}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Size</CardTitle>
            <Headers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7" />
            ) : (
              <div className="text-2xl font-bold">{analytics?.size}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Response Headers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] rounded-md border">
            {loading ? (
              <div className="space-y-2 p-4">
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
              </div>
            ) : (
              <pre className="p-4 text-sm">
                {JSON.stringify(analytics?.headers, null, 2)}
              </pre>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
