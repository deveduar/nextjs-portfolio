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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-2xl bg-gray-100 dark:bg-gray-950 rounded-xl border border-gray-200/50 dark:border-gray-800 shadow-2xl animate-overlayFadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <IoClose size={20} className="text-gray-700 dark:text-gray-300" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Let&apos;s Connect</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
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
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
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
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
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
                className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 h-32 placeholder:text-gray-400"
                required
              />
            </div>

            <button 
              type="submit"
              className="self-start px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
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
