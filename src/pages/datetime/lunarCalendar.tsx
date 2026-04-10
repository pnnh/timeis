'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, TextField, Divider } from '@mui/material';
import { Brightness4, CalendarToday, Explore } from '@mui/icons-material';
import { transKey } from '@/locales/normal';
import { Solar } from 'lunar-javascript';

export function LunarCalendar({ lang }: { lang: string }) {
    const [selectedDate, setSelectedDate] = useState(() => {
        const d = new Date();
        return d.toISOString().split('T')[0];
    });

    const [lunarInfo, setLunarInfo] = useState<any>(null);

    useEffect(() => {
        try {
            const [y, m, d] = selectedDate.split('-').map(Number);
            if (y && m && d) {
                const solar = Solar.fromYmd(y, m, d);
                const lunar = solar.getLunar();

                setLunarInfo({
                    lunarYear: lunar.getYearInGanZhi() + transKey(lang, 'datetime.lunar.yearSuffix') + ' (' + lunar.getYearShengXiao() + transKey(lang, 'datetime.lunar.zodiacSuffix') + ')',
                    lunarMonth: lunar.getMonthInChinese() + transKey(lang, 'datetime.lunar.monthSuffix'),
                    lunarDay: lunar.getDayInChinese(),
                    festivals: [...lunar.getFestivals(), ...solar.getFestivals(), ...lunar.getOtherFestivals()].join(', '),
                    jieQi: lunar.getJieQi(),
                    phase: lunar.getYueXiang()
                });
            }
        } catch (e) {
            setLunarInfo(null);
        }
    }, [selectedDate, lang]);

    return (
        <Card variant="outlined" sx={{ width: '100%', mb: 4 }}>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Brightness4 sx={{ mr: 1 }} color="primary" />
                    {transKey(lang, 'datetime.lunar.title') || 'Lunar Calendar Converter'}
                </Typography>

                <Box sx={{ mb: 3, mt: 2 }}>
                    <TextField
                        fullWidth
                        type="date"
                        label={transKey(lang, 'datetime.lunar.selectDate') || 'Select Date'}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                {lunarInfo && (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
                                    {transKey(lang, 'datetime.lunar.ganzhi') || 'Lunar Year'}
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {lunarInfo.lunarYear}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Brightness4 sx={{ fontSize: 16, mr: 1 }} />
                                    {transKey(lang, 'datetime.lunar.date') || 'Lunar Date'}
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {lunarInfo.lunarMonth} {lunarInfo.lunarDay}
                                </Typography>
                            </Box>
                        </Grid>

                        {(lunarInfo.festivals || lunarInfo.jieQi) && (
                            <Grid size={{ xs: 12 }}>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 1 }}>
                                    {lunarInfo.jieQi && (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Explore sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">
                                                {transKey(lang, 'datetime.lunar.jieqi') || 'Solar Term'}: <b>{lunarInfo.jieQi}</b>
                                            </Typography>
                                        </Box>
                                    )}
                                    {lunarInfo.festivals && (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body2">
                                                {transKey(lang, 'datetime.lunar.festivals') || 'Festivals'}: <b>{lunarInfo.festivals}</b>
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
}