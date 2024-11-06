import type { FunctionComponent, PropsWithChildren } from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/utils/classNames";

import "~/styles/tailwind.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
