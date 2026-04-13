import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function Header() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 bg-[#161616] border-b border-[#2A2A2A]"
      style={{ borderBottomWidth: "0.5px" }}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main">
          <Link
            href="/"
            className="flex items-center transition-opacity duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111]"
            aria-label="Stellarix – Home"
          >
            <Image
              src="/stellarix-logo.png"
              alt="Stellarix"
              width={140}
              height={32}
              className="h-8 w-auto"
              style={{ filter: "invert(1) brightness(2)" }}
              priority
              unoptimized
            />
          </Link>
          <ul className="flex gap-8 text-[0.8rem] font-body tracking-[0.2em] text-[#666666]">
            <li>
              <Link href="#elaris-series" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 rounded">
                Elaris Series
              </Link>
            </li>
            {/* <li>
              <Link href="#optical" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 rounded">
                Optical
              </Link>
            </li> */}
            <li>
              <Link href="#technology" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 rounded">
                Technology
              </Link>
            </li>
            {/* <li>
              <Link href="#try-on" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 rounded">
                Try On
              </Link>
            </li> */}
            <li>
              <Link href="#about" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 rounded">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="transition-colors duration-300 hover:text-[#E8E8E8] focus:outline-none focus:text-[#E8E8E8] focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 rounded">
                Contact
              </Link>
            </li>
          </ul>
          {/* <Link
            href="#contact"
            className="rounded-[6px] border border-[#E8E8E8] px-5 py-2.5 text-[0.8rem] font-medium tracking-[0.18em] text-[#E8E8E8] transition-colors duration-300 hover:bg-[#E8E8E8] hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E8E8E8] focus:ring-offset-2 focus:ring-offset-[#111111]"
          >
            Book a visit
          </Link> */}
        </nav>
      </Container>
    </header>
  );
}
