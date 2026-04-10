import styles from './navbar.module.scss'
import { PSLanguageSelector } from "@/layout/language.tsx";
import { transKey } from "@/locales/normal.ts";
import { css } from "@emotion/css";
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7, BrightnessAuto } from '@mui/icons-material';
import { useAtom } from 'jotai';
import { themeAtom } from '@/utils/storage';

const pageStyles = {
    toolLink: css`
        text-decoration: none;
        color: var(--text-color);
        font-size: 14px;
        margin-right: 16px;
        display: inline-block;
        border-radius: 4px;
        &:hover {
            background-color: var(--background-color);
        } 
    `,
    toolLinkActive: {
        color: 'var(--primary-color)',
    }
}

export function ContentPublicNavbar({ lang }: { lang: string }) {
    const [themeType, setThemeType] = useAtom(themeAtom);

    const toggleTheme = () => {
        if (themeType === 'light') setThemeType('dark');
        else if (themeType === 'dark') setThemeType('auto');
        else setThemeType('light');
    };

    const getThemeIcon = () => {
        if (themeType === 'light') return <Brightness7 />;
        if (themeType === 'dark') return <Brightness4 />;
        return <BrightnessAuto />;
    };

    const getThemeLabel = () => {
        if (themeType === 'light') return transKey(lang, "LightTheme");
        if (themeType === 'dark') return transKey(lang, "DarkTheme");
        return transKey(lang, "AutoTheme");
    };

    const isLinkActive = (toolKey: string) => {
        const currentPath = window.location.pathname;
        if (currentPath.indexOf(toolKey) !== -1) {
            return true;
        }
        return toolKey === 'sha512' && currentPath.length <= 6;
    }
    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <a className={styles.brandLink} href={`/`}>
                <img src='/logo48.png' alt='logo' />
            </a>
        </div>
        <div>
            <a className={pageStyles.toolLink} style={isLinkActive('sha512') ? pageStyles.toolLinkActive : {}}
                href={`/${lang}/sha512`}>
                {transKey(lang, "datetime.page.title")}</a>
        </div>
        <div className={styles.rightNav}>
            <Tooltip title={getThemeLabel()}>
                <IconButton onClick={toggleTheme} color="inherit">
                    {getThemeIcon()}
                </IconButton>
            </Tooltip>
            <PSLanguageSelector lang={lang} />
        </div>
    </div>
}


