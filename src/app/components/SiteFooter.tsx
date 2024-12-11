import Link from "next/link";
import { Mail, Linkedin, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted w-full">
      <div className="w-full py-8 md:py-12 px-2">
        {/* Top Section: Logo, Contact, About */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo and Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">TRAI</h3>
            <p className="text-sm text-muted-foreground">
              TRavel Intelligence - Your smart companion for journey planning and insights.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <Link
                  href="mailto:kenan@trai.com"
                  className="text-muted-foreground hover:underline"
                >
                  kenan@trai.com
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Linkedin className="h-4 w-4" />
                <Link
                  href="https://www.linkedin.com/in/kenangain"
                  className="text-muted-foreground hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="h-4 w-4" />
                <Link
                  href="https://github.com/kenangain"
                  className="text-muted-foreground hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* About the Creator */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">About the Creator</h3>
            <p className="text-sm text-muted-foreground">
              TRAI was created by Kenan Gain, a passionate developer dedicated to revolutionizing travel planning through intelligent solutions.
            </p>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom Section: Copyright and Social Icons */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} TRAI (TRavel Intelligence). All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            {/* Email Button */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:kenan@trai.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>

            {/* LinkedIn Button */}
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://www.linkedin.com/in/kenangain"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>

            {/* GitHub Button */}
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/kenangain"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
