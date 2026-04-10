'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { Public, AccessTime } from '@mui/icons-material';
import { transKey } from '@/locales/normal';
import { DateTime } from 'luxon';

const DEFAULT_TIMEZONES = [
    { zone: 'America/New_York', labelKey: 'datetime.worldClock.newYork' },
    { zone: 'Europe/London', labelKey: 'datetime.worldClock.london' },
    { zone: 'Asia/Dubai', labelKey: 'datetime.worldClock.dubai' },
    { zone: 'Asia/Tokyo', labelKey: 'datetime.worldClock.tokyo' },
];

export function WorldClock({ lang }: { lang: string }) {
    const [now, setNow] = useState(DateTime.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(DateTime.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card variant="outlined" sx={{ width: '100%', mb: 4 }}>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Public sx={{ mr: 1 }} color="primary" />
                    {transKey(lang, 'datetime.worldClock.title') || 'World Clock'}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {DEFAULT_TIMEZONES.map(({ zone, labelKey }) => {
                        const localTime = now.setZone(zone);
                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={zone}>
                                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {transKey(lang, labelKey) || zone}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                                        {localTime.toFormat('HH:mm:ss')}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {localTime.toFormat('yyyy-MM-dd')}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {localTime.offsetNameShort}
                                    </Typography>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
}