import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Bounce, ToastContainer } from "react-toastify";
import ReduxProvider from "@/providers/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskero - Team Tasks Management",
  description:
    "Manage your team tasks efficiently with Taskero, powered by Mostafa Hamdi",

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Taskero - Team Tasks Management",
    description: "Manage your team tasks efficiently with Taskero",
    url: "https://taskero-mostafa-hamdi.vercel.app",
    siteName: "Taskero",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taskero Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Taskero - Team Tasks Management",
    description: "Manage your team tasks efficiently with Taskero",
    images: ["/og-image.png"],
    creator: "@mostafahamdi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
        <ToastContainer
          position="bottom-right"
          draggable
          autoClose={3000}
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
