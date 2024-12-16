import { MMKV } from 'react-native-mmkv';
import { useState, useEffect } from 'react';
import { getEventsForMonth } from './QueryDBEvents';

const storage = new MMKV();
const CACHE_DURATION = 5 * 60 * 1000;
const PREFETCH_MONTHS = 1;

/*

EventsCacheManager:
- Class to handle caching of events data
- Provides methods to fetch, store, and clear cached events
- Planning to implement MMKV for efficient storage

*/


export class EventsCacheManager {
    static getMonthKey(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
    }

    static getCacheKey(monthKey) {
        return `events-${monthKey}`;
    }

    static getMetaKey(monthKey) {
        return `meta-${monthKey}`;
    }

    static async loadEvents(month, year) {
        const eventsForMonth = await getEventsForMonth(month, year);
        setEvents(eventsForMonth);
    }

    static async getEvents(monthKey) {
        const cacheKey = this.getCacheKey(monthKey);
        const metaKey = this.getMetaKey(monthKey);
        
        const cachedData = storage.getString(cacheKey);
        const metadata = JSON.parse(storage.getString(metaKey) || '{}');
        
        const now = Date.now();
        if (cachedData && metadata.lastFetched && 
            (now - metadata.lastFetched) < CACHE_DURATION) {
        return JSON.parse(cachedData);
        }

        const events = await this.fetchEventsFromAPI(monthKey);
        
        storage.set(cacheKey, JSON.stringify(events));
        storage.set(metaKey, JSON.stringify({ 
        lastFetched: now,
        version: '1.0'
        }));

        return events;
    }

    static prefetchAdjacentMonths(date) {
        const currentMonth = new Date(date);
        
        for (let i = -PREFETCH_MONTHS; i <= PREFETCH_MONTHS; i++) {
        if (i === 0) continue;
        
        const targetDate = new Date(currentMonth);
        targetDate.setMonth(currentMonth.getMonth() + i);
        const monthKey = this.getMonthKey(targetDate);
        
        this.getEvents(monthKey).catch(() => {
            console.log(`Failed to prefetch events for ${monthKey}`);
        });
        }
    }

    static clearOldCache() {
        const allKeys = storage.getAllKeys();
        const now = Date.now();
        
        allKeys.forEach(key => {
        if (key.startsWith('meta-')) {
            const metadata = JSON.parse(storage.getString(key) || '{}');
            if (now - metadata.lastFetched > 30 * 24 * 60 * 60 * 1000) {
            const monthKey = key.replace('meta-', '');
            storage.delete(key);
            storage.delete(this.getCacheKey(monthKey));
            }
        }
        });
    }
}
