import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nanteyu",
  description: "multi translation App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={inter.className}>
          <Header />
          <main className="mx-auto flex min-h-screen max-w-3xl flex-col place-content-center justify-between md:p-12">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
