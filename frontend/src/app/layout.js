"use client";
import { Inter } from "next/font/google";
import "@fontsource/protest-riot";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster
            position="bottom-right-corner"
            reverseOrder={false}
            toastOptions={{ style: { background: "#183B56", color: "white" } }}
          />
        </body>
      </html>
    </QueryClientProvider>
  );
}
