'use client'

import React, { useState } from 'react'
import { css } from "@emotion/css";
import { transKey } from '@/locales/normal';
import { TimestampHelper, CopyButton } from './timestamp';
import { YearProgress } from './yearProgress';
import { DateCalculator } from './dateCalc';
import { WorldClock } from './worldClock';
import { LunarCalendar } from './lunarCalendar';
import { Card, CardContent, Typography, Box, Grid, Paper, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import { AccessTime, CalendarMonth, ArrowDropDown } from '@mui/icons-material';

type DateFormat = 'locale' | 'iso' | 'rfc3339' | 'utc' | 'date' | 'time';

const formatOptions: { value: DateFormat; labelKey: string; formatter: (date: Date) => string }[] = [
    { value: 'locale', labelKey: 'datetime.format.locale', formatter: (d) => d.toLocaleString() },
    { value: 'iso', labelKey: 'datetime.format.iso', formatter: (d) => d.toISOString() },
    { value: 'rfc3339', labelKey: 'datetime.format.rfc3339', formatter: (d) => d.toISOString().replace('Z', '+00:00') },
    { value: 'utc', labelKey: 'datetime.format.utc', formatter: (d) => d.toUTCString() },
    { value: 'date', labelKey: 'datetime.format.date', formatter: (d) => d.toLocaleDateString() },
    { value: 'time', labelKey: 'datetime.format.time', formatter: (d) => d.toLocaleTimeString() },
];

export default function DatetimeComponent({ lang }: { lang: string }) {
    const [now, setNow] = React.useState<Date | undefined>()
    const [timestamp, setTimestamp] = React.useState<number | undefined>()
    const [dateFormat, setDateFormat] = useState<DateFormat>('locale')
    const [formatMenuAnchor, setFormatMenuAnchor] = useState<null | HTMLElement>(null)

    React.useEffect(() => {
        // Initialize immediately
        const updateTime = () => {
            const currentDate = new Date()
            setNow(currentDate)
            setTimestamp(Math.floor(currentDate.getTime() / 1000))
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return <div className={datetimeStyles.datetimeComponent}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', margin: '1rem' }}>
            {transKey(lang, "datetime.page.title")}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4, width: '100%' }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarMonth color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    {transKey(lang, "datetime.page.currentDatetime")}
                                </Typography>
                            </Box>
                            {now && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography 
                                        variant="caption" 
                                        color="primary"
                                        sx={{ mr: 0.5, fontWeight: 'medium' }}
                                    >
                                        {transKey(lang, formatOptions.find(o => o.value === dateFormat)?.labelKey || '')}
                                    </Typography>
                                    <Tooltip title={transKey(lang, "datetime.format.select") || "Select format"}>
                                        <IconButton 
                                            size="small" 
                                            onClick={(e) => setFormatMenuAnchor(e.currentTarget)}
                                            sx={{ mr: 0.5 }}
                                        >
                                            <ArrowDropDown fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={formatMenuAnchor}
                                        open={Boolean(formatMenuAnchor)}
                                        onClose={() => setFormatMenuAnchor(null)}
                                    >
                                        {formatOptions.map((opt) => (
                                            <MenuItem 
                                                key={opt.value} 
                                                selected={dateFormat === opt.value}
                                                onClick={() => {
                                                    setDateFormat(opt.value);
                                                    setFormatMenuAnchor(null);
                                                }}
                                            >
                                                {transKey(lang, opt.labelKey) || opt.value}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    <CopyButton 
                                        text={formatOptions.find(o => o.value === dateFormat)?.formatter(now) || now.toLocaleString()} 
                                        lang={lang} 
                                    />
                                </Box>
                            )}
                        </Box>
                        <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>
                            {now ? (formatOptions.find(o => o.value === dateFormat)?.formatter(now) || now.toLocaleString()) : '\u00A0'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTime color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    {transKey(lang, "datetime.page.currentTimestamp")}
                                </Typography>
                            </Box>
                            {timestamp && <CopyButton text={timestamp.toString()} lang={lang} />}
                        </Box>
                        <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>
                            {timestamp ? timestamp : '\u00A0'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <WorldClock lang={lang} />
        <YearProgress lang={lang} />
        <DateCalculator lang={lang} />
        <LunarCalendar lang={lang} />
        <TimestampHelper lang={lang} />
    </div>
}

const datetimeStyles = {
    datetimeComponent: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 0 auto;
        min-height: 100vh;
        color: #333;
        width: 100%;

        @media (min-width: 64em) {
            width: 56rem !important;
        }
    `,
    pageTitle: css`
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 1rem;
    `,
    timestampTable: css`
        width: 100%;
        margin: 0 1rem 1rem 1rem;
        padding: 0;
        display: table;
        border-top: 0.25px solid #f0f0f0;
        border-left: 0.25px solid #f0f0f0;
    `,
    tableRow: css`
        padding: 0;
        text-align: left;
        display: table-row;
    `,
    rowLabel: css`
        font-size: 1.1rem;
        font-weight: bolder;
        width: 10rem;
        display: table-cell;
        align-items: center;
        padding: 0.5rem;
        border-right: 0.25px solid #f0f0f0;
        border-bottom: 0.25px solid #f0f0f0;
    `,
    tableCell: css`
        padding: 0.5rem;
        display: table-cell;
        border-right: 0.25px solid #f0f0f0;
        border-bottom: 0.25px solid #f0f0f0;
        vertical-align: middle;
    `
}
