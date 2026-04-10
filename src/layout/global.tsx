import React, { useEffect, useMemo } from "react";
import { JotaiProvider } from "./provider";
import './global.scss'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from "./theme";
import { useAtom } from "jotai";
import { themeAtom } from "@/utils/storage";
import { useMediaQuery } from "@mui/material";

export function GlobalLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [themeType] = useAtom(themeAtom);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(() => {
        if (themeType === 'auto') {
            return prefersDarkMode ? darkTheme : lightTheme;
        }
        return themeType === 'dark' ? darkTheme : lightTheme;
    }, [themeType, prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export function GlobalLayoutWithProvider({
    children
}: {
    children: React.ReactNode
}) {
    return <JotaiProvider>
        <GlobalLayout>
            {children}
        </GlobalLayout>
    </JotaiProvider>
}
