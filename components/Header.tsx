import Link from "next/link";
import { Bike } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#434343] shadow-md">
      <div className="mx-auto max-w-[800px] px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-[#2CCEAC] text-xl font-bold tracking-tight hover:opacity-90 transition-opacity">
          RideTo Learn
        </Link>
        <Bike className="text-[#2CCEAC]" size={26} strokeWidth={1.75} aria-label="Motorcycle" />
      </div>
    </header>
  );
}
