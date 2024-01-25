import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";
import "./globals.css";
import Header from "../components/layout/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nanteyu",
  description: "multi translation App",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body>
          <Header />
          <main className="mx-auto flex min-h-screen max-w-3xl flex-col place-content-center justify-between md:p-12">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
