import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative z-30 mt-auto flex items-end justify-center bg-background">
      <div className="w-full border-t border-border/70 bg-background/95 backdrop-blur-md px-2 md:px-12 lg:px-50 xl:px-60">
        <div className="flex justify-between items-center py-4">
          <p className="text-sm text-muted">
            Personal portfolio developed by <Link href="/" className="font-bold text-foreground">deveduar</Link> - 2026.
          </p>

          <div className="flex space-x-3">
            <Link href="http://www.linkedin.com/in/deveduar" target="_blank" className="rounded-lg p-2 transition-colors hover:bg-surface">
              <FaLinkedin className="h-4 w-4 text-muted hover:text-accent transition-colors duration-300" />
            </Link>
            <Link href="https://x.com/deveduar" target="_blank" className="rounded-lg p-2 transition-colors hover:bg-surface">
              <FaTwitter className="h-4 w-4 text-muted hover:text-accent-alt transition-colors duration-300" />
            </Link>
            <Link href="https://github.com/deveduar" target="_blank" className="rounded-lg p-2 transition-colors hover:bg-surface">
              <FaGithub className="h-4 w-4 text-muted hover:text-foreground transition-colors duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
