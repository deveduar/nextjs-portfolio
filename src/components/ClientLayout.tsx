"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return <div className={inter.className}><ThemeProvider>{children}</ThemeProvider></div>;
};

export default ClientLayout;
