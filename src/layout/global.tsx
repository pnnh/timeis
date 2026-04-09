import React, { useEffect } from "react";
import { JotaiProvider } from "./provider";
import './global.scss'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from "./theme";

export function GlobalLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <JotaiProvider>
        <ThemeProvider theme={lightTheme}>
            {children}
        </ThemeProvider>
    </JotaiProvider>
}
