import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="container flex h-14 max-w-screen-2xl justify-between items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link
            href="#"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Licensing
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Contact
          </Link>
        </nav>
        <p className="mt-8 text-xs text-gray-400 leading-5">
          &copy; {new Date().getUTCFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
