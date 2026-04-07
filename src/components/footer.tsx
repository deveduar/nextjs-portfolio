import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative z-30 mt-auto flex items-end justify-center bg-background">
      <div className="w-full border-t border-border/70 bg-background/70 px-2 backdrop-blur-sm md:px-12 lg:px-50 xl:px-60">
        <div className="flex justify-between items-center py-3">
          <p className="text-sm text-muted">
            Personal portfolio developed by <Link href="/" className="font-bold text-foreground">deveduar</Link> - 2026.
          </p>

          <div className="flex space-x-3">
            <Link href="http://www.linkedin.com/in/deveduar" target="_blank" className="size-8 inline-flex justify-center items-center rounded-lg border-transparent">
              <FaLinkedin className="h-4 w-4 text-muted transition-all duration-300 hover:scale-125 hover:text-accent" />
            </Link>
            <Link href="https://x.com/deveduar" target="_blank" className="size-8 inline-flex justify-center items-center rounded-lg border-transparent">
              <FaTwitter className="h-4 w-4 text-muted transition-all duration-300 hover:scale-125 hover:text-accent-alt" />
            </Link>
            <Link href="https://github.com/deveduar" target="_blank" className="size-8 inline-flex justify-center items-center rounded-lg border-transparent">
              <FaGithub className="h-4 w-4 text-muted transition-all duration-300 hover:scale-125 hover:text-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
