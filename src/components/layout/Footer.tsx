import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[#2E2E2E] bg-[#0E0E0E] py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111] rounded"
            aria-label="Stellarix – Home"
          >
            <Image
              src="/stellarix-logo.png"
              alt="Stellarix"
              width={120}
              height={28}
              className="h-7 w-auto"
              style={{ filter: "invert(1) brightness(2)" }}
              loading="lazy"
              unoptimized
            />
          </Link>
          <ul className="flex gap-6 text-sm text-[#666666]" role="list">
            <li>
              <Link href="#elaris-series" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111] rounded">
                Elaris Series
              </Link>
            </li>
            <li>
              <Link href="#technology" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111] rounded">
                Technology
              </Link>
            </li>
            <li>
              <Link href="#about" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111] rounded">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111] rounded">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <p
          className="mt-8 text-center text-sm text-[#555555]"
          suppressHydrationWarning
        >
          &copy; {new Date().getFullYear()} Stellarix &mdash; Elaris Precision Optics.
        </p>
      </Container>
    </footer>
  );
}
