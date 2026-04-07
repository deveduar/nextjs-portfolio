"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from '@emailjs/browser';
import { IoClose } from "react-icons/io5";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string; 
}

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [lastSent, setLastSent] = useState<number | null>(null);
  const cooldownTime = 5 * 60 * 1000;

  const [userInput, setUserInput] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const storedLastSent = localStorage.getItem("lastSent");
    if (storedLastSent) {
      setLastSent(parseInt(storedLastSent, 10));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
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
        setUserInput({
          name: "",
          email: "",
          message: ""
        });
        const now = Date.now();
        setLastSent(now);
        localStorage.setItem("lastSent", now.toString());
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-foreground)]/50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-2xl bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-2xl animate-overlayFadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          <IoClose size={20} className="text-[var(--color-foreground)]" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-2">Let&apos;s Connect</h2>
          <p className="text-sm text-[var(--color-muted-foreground)] mb-6">
            Have a project in mind? I&apos;d love to hear about it. Send me a message!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={userInput.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] focus:ring-2 focus:ring-[var(--color-accent)] placeholder:text-[var(--color-muted-foreground)]"
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  value={userInput.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] focus:ring-2 focus:ring-[var(--color-accent)] placeholder:text-[var(--color-muted-foreground)]"
                  required
                />
              </div>
            </div>
            
            <div>
              <textarea
                name="message"
                value={userInput.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] focus:ring-2 focus:ring-[var(--color-accent)] h-32 placeholder:text-[var(--color-muted-foreground)]"
                required
              />
            </div>

            <button 
              type="submit"
              className="self-start px-6 py-3 bg-[var(--color-accent)] text-[var(--color-accent-foreground)] rounded-lg font-semibold hover:bg-[var(--color-accent-hover)] transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}