'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { css } from '@emotion/css';
import { transKey } from '@/locales/normal';
import { CalendarToday, TrendingUp, DateRange } from '@mui/icons-material';

function getISOWeekNumber(d: Date) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function getDayOfYear(d: Date) {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = (d.getTime() - start.getTime()) + ((start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

export function YearProgress({ lang }: { lang: string }) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000 * 60); // Update every minute is enough
        return () => clearInterval(interval);
    }, []);

    const dayOfYear = getDayOfYear(now);
    const weekNumber = getISOWeekNumber(now);
    const totalDays = isLeapYear(now.getFullYear()) ? 366 : 365;
    const progressPercent = ((dayOfYear / totalDays) * 100).toFixed(1);

    return (
        <Card variant="outlined" sx={{ width: '100%', mb: 4 }}>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ mr: 1 }} color="primary" />
                    {transKey(lang, 'datetime.yearProgress.title') || 'Year Progress'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {now.getFullYear()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        {progressPercent}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={parseFloat(progressPercent)}
                    sx={{ height: 10, borderRadius: 5, mb: 3 }}
                />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                        <Typography variant="body1">
                            {transKey(lang, 'datetime.yearProgress.dayOfYear') || 'Day of Year'}: <b>{dayOfYear}</b> / {totalDays}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DateRange sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
                        <Typography variant="body1">
                            {transKey(lang, 'datetime.yearProgress.weekNumber') || 'Week Number'}: <b>{weekNumber}</b>
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
