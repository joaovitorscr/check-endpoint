"use client";

import { useState } from "react";
import { EndpointForm } from "./_components/endpoint-form";
import { EndpointList } from "./_components/endpoint-list";
import { RequestAnalytics } from "./_components/request-analytics";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "./_components/header";
import { api } from "@/trpc/react";

type Endpoint = {
  id: string;
  method: string;
  path: string;
  description: string;
};

export default function ApiManager() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
    null,
  );
  const { toast } = useToast();

  const hello = api.example.hello.useQuery();

  const handleRegisterEndpoint = (data: Omit<Endpoint, "id">) => {
    const newEndpoint = {
      ...data,
      id: crypto.randomUUID(),
    };
    setEndpoints([...endpoints, newEndpoint]);
    toast({
      title: "Endpoint registered",
      description: `${data.method} ${data.path} has been registered successfully.`,
    });
  };

  const handleDeleteEndpoint = (id: string) => {
    setEndpoints(endpoints.filter((endpoint) => endpoint.id !== id));
    setSelectedEndpoint(null);
    toast({
      title: "Endpoint deleted",
      description: "The endpoint has been removed from the list.",
    });
  };

  const handleTestEndpoint = async (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
    toast({
      title: "Testing endpoint",
      description: `Sending ${endpoint.method} request to ${endpoint.path}...`,
    });
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="px-10"
        defaultSize={selectedEndpoint ? 60 : 100}
      >
        <Header />
        <div className="container mx-auto py-10 space-y-10">
          <div className="max-w-xl mx-auto">
            <EndpointForm onSubmit={handleRegisterEndpoint} />
          </div>
          <EndpointList
            endpoints={endpoints}
            onDelete={handleDeleteEndpoint}
            onTest={handleTestEndpoint}
          />
        </div>
      </ResizablePanel>

      {selectedEndpoint && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <div className="relative h-full border-l">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setSelectedEndpoint(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <RequestAnalytics endpoint={selectedEndpoint} />
            </div>
          </ResizablePanel>
        </>
      )}
      <Toaster />
    </ResizablePanelGroup>
  );
}
