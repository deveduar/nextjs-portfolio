"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope, FaUser, FaComment } from "react-icons/fa";
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string; 
}

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  
export default function ContactForm() {
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
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400" />
                Your Name
              </div>
            </label>
            <input
              type="text"
              name="name"
              value={userInput.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                Your Email
              </div>
            </label>
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <div className="flex items-center gap-2">
              <FaComment className="text-gray-400" />
              Your Message
            </div>
          </label>
          <textarea
            name="message"
            value={userInput.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 h-32"
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
  );
}