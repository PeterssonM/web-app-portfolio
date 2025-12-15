import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="maxpet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />

          <main className="flex-1">
            {children}
          </main>

        <Footer />
      </body>
    </html>
  );
}
