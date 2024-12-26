import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/Theme_Provider";
import { Header } from "@/components/Header";

const outfit = Outfit({ subsets: ["latin"] });

const navItems = [
  {
    name: "Technology's",
    link: "/",
  },
];

export const metadata = {
  title: "CRUD Web Application",
  description:
    "Perform CRUD Operation on Next.js with Reduxtoolkit for state management",
  icons: {
    icon: ["logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header navItems={navItems} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
