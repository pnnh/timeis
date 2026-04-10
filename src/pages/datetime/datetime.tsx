'use client'

import React from 'react'
import { css } from "@emotion/css";
import { transKey } from '@/locales/normal';
import { TimestampHelper } from './timestamp';
import { YearProgress } from './yearProgress';
import { DateCalculator } from './dateCalc';
import { WorldClock } from './worldClock';
import { LunarCalendar } from './lunarCalendar';
import { Card, CardContent, Typography, Box, Grid, Paper } from '@mui/material';
import { AccessTime, CalendarMonth } from '@mui/icons-material';

export default function DatetimeComponent({ lang }: { lang: string }) {
    const [now, setNow] = React.useState<Date | undefined>()
    const [timestamp, setTimestamp] = React.useState<number | undefined>()

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
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CalendarMonth color="primary" sx={{ mr: 1 }} />
                            <Typography variant="subtitle2" color="text.secondary">
                                {transKey(lang, "datetime.page.currentDatetime")}
                            </Typography>
                        </Box>
                        <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>
                            {now ? now.toLocaleString() : '\u00A0'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <AccessTime color="primary" sx={{ mr: 1 }} />
                            <Typography variant="subtitle2" color="text.secondary">
                                {transKey(lang, "datetime.page.currentTimestamp")}
                            </Typography>
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
