import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { YearProgress } from './yearProgress';

describe('YearProgress Component', () => {
    beforeEach(() => {
        // mock system time to a fixed date for stable snapshot
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('matches the snapshot for English locale', () => {
        const { container } = render(<YearProgress lang="en" />);
        expect(container).toMatchSnapshot();
    });

    it('matches the snapshot for Chinese locale', () => {
        const { container } = render(<YearProgress lang="zh" />);
        expect(container).toMatchSnapshot();
    });

    it('renders the correct progress details', () => {
        render(<YearProgress lang="en" />);

        // 2024 is a leap year (366 days). June 15 is the 167th day.
        // 167 / 366 ≈ 45.6%
        expect(screen.getByText('45.6%')).toBeInTheDocument();
        expect(screen.getByText('2024')).toBeInTheDocument();
    });
});