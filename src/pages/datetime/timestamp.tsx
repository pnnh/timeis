'use client'

import { transKey } from "@/locales/normal";
import { css } from "@emotion/css";
import React, { useState, useEffect } from "react"; 
import { 
    Tabs, Tab as MuiTab, Box, TextField, 
    Typography, IconButton, 
    Tooltip, Paper 
} from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material";
import { copyToClipboard } from "@/utils/clipboard";

enum Tab {
    GenTimestamp,
    TimestampToDatetime,
    DatetimeToTimestamp,
}

export function TimestampHelper({lang}: { lang: string }) {
    const [tab, setTab] = React.useState<Tab>(Tab.GenTimestamp)
    
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return <div className={timestampStyles.timestampHelper}>
        <div className={timestampStyles.helperContainer}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tab} onChange={handleTabChange} aria-label="timestamp tabs" variant="fullWidth">
                    <MuiTab label={transKey(lang, 'timestamp.tab.genTimestamp')} value={Tab.GenTimestamp} />
                    <MuiTab label={transKey(lang, "timestamp.tab.timestampToDatetime")} value={Tab.TimestampToDatetime} />
                    <MuiTab label={transKey(lang, "timestamp.tab.datetimeToTimestamp")} value={Tab.DatetimeToTimestamp} />
                </Tabs>
            </Box>
            <div className={timestampStyles.bodyContainer}>
                {
                    tab === Tab.GenTimestamp && <Box sx={{ mb: 4 }} />
                }
                {
                    tab === Tab.TimestampToDatetime && <TimestampToDatetimeConverter lang={lang}/>
                }
                {
                    tab === Tab.DatetimeToTimestamp && <DatetimeToTimestampConverter lang={lang}/>
                }
                
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        {tab === Tab.GenTimestamp ? "How to get current timestamp" : "Programming Reference"}
                    </Typography>
                    {tab === Tab.GenTimestamp && <GenTimestampCode />}
                    {tab === Tab.TimestampToDatetime && <TimestampToDatetimeCode />}
                    {tab === Tab.DatetimeToTimestamp && <DatetimeToTimestampCode />}
                </Box>
            </div>
        </div>
    </div>
}

function CopyButton({ text, lang }: { text: string, lang: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        copyToClipboard(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Tooltip title={copied ? transKey(lang, "common.copied") : transKey(lang, "common.copy")}>
            <IconButton onClick={handleCopy} size="small">
                {copied ? <Check fontSize="small" color="success" /> : <ContentCopy fontSize="small" />}
            </IconButton>
        </Tooltip>
    );
}

function TimestampToDatetimeConverter({ lang }: { lang: string }) {
    const [input, setInput] = useState(Math.floor(Date.now() / 1000).toString());
    const [result, setResult] = useState({ local: '', utc: '' });

    useEffect(() => {
        try {
            const val = parseInt(input);
            if (isNaN(val)) return;
            
            const date = input.length > 11 ? new Date(val) : new Date(val * 1000);
            
            if (!isNaN(date.getTime())) {
                setResult({
                    local: date.toLocaleString(),
                    utc: date.toUTCString()
                });
            }
        } catch (e) {
            // ignore
        }
    }, [input]);

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label={transKey(lang, "timestamp.input.label")}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    helperText={input.length > 11 ? transKey(lang, "timestamp.unit.milliseconds") : transKey(lang, "timestamp.unit.seconds")}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">{transKey(lang, "timestamp.result.local")}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{result.local}</Typography>
                    </Box>
                    <CopyButton text={result.local} lang={lang} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">{transKey(lang, "timestamp.result.utc")}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{result.utc}</Typography>
                    </Box>
                    <CopyButton text={result.utc} lang={lang} />
                </Box>
            </Box>
        </Paper>
    );
}

function DatetimeToTimestampConverter({ lang }: { lang: string }) {
    const [input, setInput] = useState(new Date().toLocaleString().replace(/\//g, '-'));
    const [result, setResult] = useState({ s: '', ms: '' });

    useEffect(() => {
        try {
            const date = new Date(input);
            if (!isNaN(date.getTime())) {
                setResult({
                    s: Math.floor(date.getTime() / 1000).toString(),
                    ms: date.getTime().toString()
                });
            }
        } catch (e) {
            // ignore
        }
    }, [input]);

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label={transKey(lang, "datetime.input.label")}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="YYYY-MM-DD HH:mm:ss"
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">{transKey(lang, "timestamp.unit.seconds")}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{result.s}</Typography>
                    </Box>
                    <CopyButton text={result.s} lang={lang} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">{transKey(lang, "timestamp.unit.milliseconds")}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}>{result.ms}</Typography>
                    </Box>
                    <CopyButton text={result.ms} lang={lang} />
                </Box>
            </Box>
        </Paper>
    );
}

function GenTimestampCode() {
    return <div className={timestampStyles.helpTable}>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>Java</div>
            <div className={timestampStyles.tableCell}>System.currentTimeMillis() / 1000</div>
        </div>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>JavaScript</div>
            <div className={timestampStyles.tableCell}><code>Math.round(new Date().getTime()/1000)</code></div>
        </div>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>Python</div>
            <div className={timestampStyles.tableCell}>import time; time.time()</div>
        </div>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>Go</div>
            <div className={timestampStyles.tableCell}>import "time"; time.Now().Unix()</div>
        </div>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>MySQL</div>
            <div className={timestampStyles.tableCell}>SELECT unix_timestamp(now())</div>
        </div>
    </div>
}

function TimestampToDatetimeCode() {
    return <div className={timestampStyles.helpTable}>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>Java</div>
            <div className={timestampStyles.tableCell}><code>new java.util.Date(timestamp * 1000)</code></div>
        </div>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>JavaScript</div>
            <div className={timestampStyles.tableCell}><code>new Date(timestamp * 1000).toLocaleString()</code></div>
        </div>
    </div>
}

function DatetimeToTimestampCode() {
    return <div className={timestampStyles.helpTable}>
        <div className={timestampStyles.tableRow}>
            <div className={timestampStyles.tableLabel}>JavaScript</div>
            <div className={timestampStyles.tableCell}><code>Math.round(new Date('2022-01-01').getTime() / 1000)</code></div>
        </div>
    </div>
}

const timestampStyles = {
    timestampHelper: css`
        width: 100%;
    `,
    helperContainer: css`
        width: 100%;
        margin-bottom: 2rem;
    `,
    bodyContainer: css``,
    helpTable: css`
        width: 100%;
        display: table;
        border: 1px solid var(--divider-color, #f0f0f0);
    `,
    tableRow: css`
        display: table-row;
    `,
    tableLabel: css`
        font-weight: bold;
        font-size: 0.85rem;
        display: table-cell;
        width: 8rem;
        background-color: var(--action-hover, #fafafa);
        border-bottom: 1px solid var(--divider-color, #f0f0f0);
        border-right: 1px solid var(--divider-color, #f0f0f0);
        padding: 0.75rem;
    `,
    tableCell: css`
        padding: 0.75rem;
        display: table-cell;
        border-bottom: 1px solid var(--divider-color, #f0f0f0);
        font-size: 0.85rem;
        font-family: monospace;
    `
}