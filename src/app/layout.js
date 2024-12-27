import 'globalthis/auto';
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { App as CapacitorApp } from '@capacitor/app';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Services",
  description: "Online Services in India",
};

export default function RootLayout({ children }) {
  CapacitorApp.addListener('backButton', ({canGoBack}) => {
      if(!canGoBack){
          CapacitorApp.exitApp();
      } else {
          window.history.back();
      }
    });

    if (typeof globalThis === 'undefined') {
      Object.defineProperty(Object.prototype, 'globalThis', {
        get: function () {
          return this;
        },
        configurable: true,
      });
    }

  return (
    <html lang="en">
    <head>
    </head>
      <body className={inter.className}>{children}</body> 
      
    </html>
  );
}
