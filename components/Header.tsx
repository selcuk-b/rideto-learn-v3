import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#161617]" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.25)" }}>
      <div className="mx-auto max-w-[800px] px-4 h-14 flex items-center">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <Image
            src="/rideto-logo.svg"
            alt="RideTo Learn"
            width={120}
            height={46}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
