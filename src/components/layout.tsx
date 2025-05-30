import { Navbar } from "@/components/navbar";
import { ModeToggle } from "@/components/mode-toggle";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b border-border bg-header-background">
        <Navbar />
        <ModeToggle />
      </header>
      <main className="flex flex-col items-left justify-center min-h-[calc(100vh-80px)] space-y-8">
        {children}
      </main>
    </div>
  );
}
