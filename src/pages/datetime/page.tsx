import React, {useEffect} from 'react'
import {css} from "@emotion/css"; 
import {ToolsLayout} from "@/layout/layout.tsx";
import {useParams} from "react-router";
import {transKey} from "@/locales/normal.ts";
import {defaultLanguage, getTargetLang, isSupportedLanguage} from "@/locales/language.tsx";
import {NotFoundPage} from "@/pages/notFound.tsx";
import DatetimeComponent from './datetime';

export default function DatetimePage( ) {
    let { lang } = useParams();
    if (!lang) {
        lang = getTargetLang(navigator.language, defaultLanguage)
    } else if (!isSupportedLanguage(lang)) {
        return <NotFoundPage/>
    }
    return <ToolsLayout lang={lang}>
        <div className={pageStyles.md5Page}> 
            <DatetimeComponent lang={lang}/>
        </div>
    </ToolsLayout>
}

const pageStyles = {
    md5Page: css`
        width: 960px;
        margin: 0 auto;
    `,
    productTitle: css`
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
    `,
    commentsClient: css`
        margin-top: 2rem;
    `
}