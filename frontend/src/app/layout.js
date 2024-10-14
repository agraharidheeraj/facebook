import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AuthWrapper from "./auth-wrapper";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Facebook",
  description: "Making clone of Facebook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster/>
        <ThemeProvider attribute="class">
          <AuthWrapper>
          {children}
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
