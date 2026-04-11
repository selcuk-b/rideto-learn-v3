import Link from "next/link";
import { Bike } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#434343]" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.25)" }}>
      <div className="mx-auto max-w-[800px] px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 bg-[#2CCEAC]/15 rounded-md flex items-center justify-center">
            <Bike size={16} strokeWidth={1.75} className="text-[#2CCEAC]" />
          </div>
          <span className="text-white font-bold tracking-tight text-base">
            Ride<span className="text-[#2CCEAC]">To</span> Learn
          </span>
        </Link>

        <span className="text-xs text-gray-400 font-medium hidden sm:block">
          CBT Preparation Course
        </span>
      </div>
    </header>
  );
}
