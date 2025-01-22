import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="container mx-auto flex justify-start py-4">
      <UserButton />
    </header>
  );
}
