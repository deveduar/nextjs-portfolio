"use client";
import { useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import profile from "@/data/profile";

interface FormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactSection() {
  const [lastSent, setLastSent] = useState<number | null>(null);
  const cooldownTime = 5 * 60 * 1000;

  const [userInput, setUserInput] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lastSent && Date.now() - lastSent < cooldownTime) {
      toast.error("You must wait before sending another message.");
      return;
    }

    if (!serviceID || !templateID || !userID) {
      toast.error("Error: Missing EmailJS configuration!");
      return;
    }

    try {
      const emailParams: FormData = {
        name: userInput.name,
        email: userInput.email,
        message: userInput.message
      };

      const res = await emailjs.send(serviceID, templateID, emailParams, userID);

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setUserInput({ name: "", email: "", message: "" });
        const now = Date.now();
        setLastSent(now);
        localStorage.setItem("lastSent", now.toString());
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <section
      className="flex min-h-screen flex-col justify-center px-4 py-8"
      style={{
        backgroundImage: "linear-gradient(180deg, rgb(var(--color-background)) 0%, rgb(var(--color-surfaceMuted) / 0.78) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
          Let&apos;s Connect
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto w-full">
          {/* Contact Form */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted">
              Have a project in mind? I&apos;d love to hear about it. Send me a message!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={userInput.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="theme-input bg-surface/85"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={userInput.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="theme-input bg-surface/85"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={userInput.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="theme-input h-28 resize-none bg-surface/85"
                  required
                />
              </div>
              <button 
                type="submit"
                className="self-start rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Send Message
              </button>
            </form>
            <ToastContainer />
          </div>

          {/* Social Links */}
          <div className="flex flex-col justify-center items-center md:items-start gap-4">
            <p className="text-center text-muted md:text-left">
              Connect with me on social media or check out my work on GitHub.
            </p>
            <div className="flex gap-3">
              <Link 
                href={profile.socialLinks.linkedin}
                target="_blank" 
                className="flex items-center justify-center rounded-lg border border-border/70 bg-surface p-3 transition-colors hover:bg-surface-alt"
              >
                <FaLinkedin className="h-6 w-6 text-foreground" />
              </Link>
              <Link 
                href={profile.socialLinks.twitter}
                target="_blank" 
                className="flex items-center justify-center rounded-lg border border-border/70 bg-surface p-3 transition-colors hover:bg-surface-alt"
              >
                <FaTwitter className="h-6 w-6 text-foreground" />
              </Link>
              <Link 
                href={profile.socialLinks.github}
                target="_blank" 
                className="flex items-center justify-center rounded-lg border border-border/70 bg-surface p-3 transition-colors hover:bg-surface-alt"
              >
                <FaGithub className="h-6 w-6 text-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
