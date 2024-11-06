"use client";

import type { FunctionComponent } from "react";
import { ThemeProvider as NextThemesProvider } from "~/components/next-themes";
import type { ThemeProviderProps } from "~/components/next-themes/types";

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  ...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>;
