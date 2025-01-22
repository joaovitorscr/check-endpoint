import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.example.hello();

  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <p>{hello.greeting}</p>
    </main>
  );
}
