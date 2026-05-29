import KoinXLogo from "./KoinXLogo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-border bg-harvest-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <KoinXLogo />
        <ThemeToggle />
      </div>
    </header>
  );
}
