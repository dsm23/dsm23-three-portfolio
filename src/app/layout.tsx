import type { FunctionComponent, PropsWithChildren } from "react";
import { cn } from "~/utils/classNames";

import "~/styles/tailwind.css";

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={cn("min-h-dvh bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
