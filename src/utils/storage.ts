import { atom } from 'jotai';

export const themeAtom = atom<'light' | 'dark' | 'auto'>('auto');

export function setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
        try {
            return JSON.parse(value)
        } catch (e) {
            return null
        }
    }
    return null
}

export function removeStorage(key: string) {
    localStorage.removeItem(key)
}

export function clearStorage() {
    localStorage.clear()
}
