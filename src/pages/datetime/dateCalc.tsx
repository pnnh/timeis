'use client'

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, TextField, Button, Tabs, Tab as MuiTab } from '@mui/material';
import { transKey } from '@/locales/normal';
import { Calculate } from '@mui/icons-material';

enum Tab {
    DateDiff,
    DateMath
}

export function DateCalculator({ lang }: { lang: string }) {
    const [tab, setTab] = useState<Tab>(Tab.DateDiff);

    const [diffStart, setDiffStart] = useState(() => { const d = new Date(); return d.toISOString().split('T')[0]; });
    const [diffEnd, setDiffEnd] = useState(() => { const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString().split('T')[0]; });
    const [diffResult, setDiffResult] = useState<number | null>(null);

    const [baseDate, setBaseDate] = useState(() => { const d = new Date(); return d.toISOString().split('T')[0]; });
    const [addYears, setAddYears] = useState(0);
    const [addMonths, setAddMonths] = useState(0);
    const [addWeeks, setAddWeeks] = useState(0);
    const [addDays, setAddDays] = useState(0);
    const [mathResult, setMathResult] = useState<string | null>(null);

    const handleTabChange = (_e: React.SyntheticEvent, v: number) => setTab(v);

    const handleCalculateDiff = () => {
        const start = new Date(diffStart).getTime();
        const end = new Date(diffEnd).getTime();
        if (!isNaN(start) && !isNaN(end)) setDiffResult(Math.ceil((end - start) / 86400000));
    };

    const handleCalculateMath = () => {
        const d = new Date(baseDate);
        if (!isNaN(d.getTime())) {
            d.setFullYear(d.getFullYear() + Number(addYears));
            d.setMonth(d.getMonth() + Number(addMonths));
            d.setDate(d.getDate() + Number(addWeeks) * 7 + Number(addDays));
            setMathResult(d.toISOString().split('T')[0]);
        }
    };

    return (
        <Card variant="outlined" sx={{ width: '100%', mb: 4 }}>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Calculate sx={{ mr: 1 }} color="primary" />{transKey(lang, 'datetime.calculator.title') || 'Date Calculator'}
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
                        <MuiTab label={transKey(lang, 'datetime.calculator.tab.diff') || 'Date Difference'} />
                        <MuiTab label={transKey(lang, 'datetime.calculator.tab.math') || 'Add/Subtract Dates'} />
                    </Tabs>
                </Box>
                {tab === Tab.DateDiff && (
                    <Box>
                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{ xs: 12, sm: 5 }}>
                                <TextField fullWidth type="date" label={transKey(lang, 'datetime.calculator.startDate') || 'Start Date'} value={diffStart} onChange={(e) => setDiffStart(e.target.value)} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }} sx={{ textAlign: 'center' }}><Typography variant="body1">VS</Typography></Grid>
                            <Grid size={{ xs: 12, sm: 5 }}>
                                <TextField fullWidth type="date" label={transKey(lang, 'datetime.calculator.endDate') || 'End Date'} value={diffEnd} onChange={(e) => setDiffEnd(e.target.value)} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid size={{ xs: 12 }}><Button variant="contained" fullWidth onClick={handleCalculateDiff} sx={{ mt: 1 }}>{transKey(lang, 'datetime.calculator.calculate') || 'Calculate Difference'}</Button></Grid>
                        </Grid>
                        {diffResult !== null && (
                            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h5"><Typography component="span" variant="h5" color="primary" fontWeight="bold">{Math.abs(diffResult)}</Typography> {transKey(lang, 'datetime.calculator.days') || 'Days'} {diffResult < 0 && (transKey(lang, 'datetime.calculator.before') || 'Before')}</Typography>
                            </Box>
                        )}
                    </Box>
                )}
                {tab === Tab.DateMath && (
                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}><TextField fullWidth type="date" label={transKey(lang, 'datetime.calculator.baseDate') || 'Base Date'} value={baseDate} onChange={(e) => setBaseDate(e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth type="number" label={transKey(lang, 'datetime.calculator.years') || 'Years'} value={addYears} onChange={(e) => setAddYears(Number(e.target.value))} /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth type="number" label={transKey(lang, 'datetime.calculator.months') || 'Months'} value={addMonths} onChange={(e) => setAddMonths(Number(e.target.value))} /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth type="number" label={transKey(lang, 'datetime.calculator.weeks') || 'Weeks'} value={addWeeks} onChange={(e) => setAddWeeks(Number(e.target.value))} /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth type="number" label={transKey(lang, 'datetime.calculator.days') || 'Days'} value={addDays} onChange={(e) => setAddDays(Number(e.target.value))} /></Grid>
                            <Grid size={{ xs: 12 }}><Button variant="contained" fullWidth onClick={handleCalculateMath} sx={{ mt: 1 }}>{transKey(lang, 'datetime.calculator.calculate') || 'Calculate Math'}</Button></Grid>
                        </Grid>
                        {mathResult && (
                            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h5">{transKey(lang, 'datetime.calculator.resultDate') || 'Result Date'}: <Typography component="span" variant="h5" color="primary" fontWeight="bold">{mathResult}</Typography></Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
