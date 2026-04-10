import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard } from './clipboard';

describe('clipboard utils', () => {
    let originalClipboard: any;
    let originalContext: any;
    let originalExecCommand: any;

    beforeEach(() => {
        originalClipboard = navigator.clipboard;
        originalContext = window.isSecureContext;
        originalExecCommand = document.execCommand;
        
        // ensure clean body
        document.body.innerHTML = '';
    });

    afterEach(() => {
        Object.defineProperty(navigator, 'clipboard', { value: originalClipboard, configurable: true });
        Object.defineProperty(window, 'isSecureContext', { value: originalContext, configurable: true });
        document.execCommand = originalExecCommand;
    });

    it('should copy text successfully using clipboard API', async () => {
        const mockWriteText = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: mockWriteText },
            configurable: true
        });
        Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });

        await expect(copyToClipboard('test string')).resolves.toBeUndefined();
        expect(mockWriteText).toHaveBeenCalledWith('test string');
    });

    it('should fallback to document.execCommand if clipboard API is unavailable', async () => {
        Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
        Object.defineProperty(window, 'isSecureContext', { value: false, configurable: true });

        // Mock document.execCommand
        const mockExecCommand = vi.fn().mockReturnValue(true);
        document.execCommand = mockExecCommand;
        
        await expect(copyToClipboard('fallback string')).resolves.toBeUndefined();
        expect(mockExecCommand).toHaveBeenCalledWith('copy');
    });
});