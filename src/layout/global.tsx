import React, { useEffect, useMemo } from "react";
import { JotaiProvider } from "./provider";
import './global.scss'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from "./theme"; 

export function GlobalLayout({
    children
}: {
    children: React.ReactNode
}) { 
    return (
        <ThemeProvider theme={lightTheme}>
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
