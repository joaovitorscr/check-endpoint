/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TryPage() {
  const [response, setResponse] = useState<object | null>(null);

  const callApi = async () => {
    try {
      const res = await fetch(
        "https://check-endpoint-14ua.vercel.app/api/test",
      );
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      setResponse({ error: `${error}` });
    }
  };

  return (
    <div>
      <h1>Test API Redirection</h1>
      <Button onClick={callApi}>Call API</Button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
