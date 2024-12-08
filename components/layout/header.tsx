import Link from 'next/link';

export function Header() {
  return (
    <header className="h-16 border-b">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          QuizMaster
        </Link>
        <nav>
          <Link href="/dashboard" className="mr-4">
            Dashboard
          </Link>
          {/* Add more navigation items as needed */}
        </nav>
      </div>
    </header>
  );
}