/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteSettingsService } from '@/integrations/supabase/services/siteSettings';
import type { Json } from '@/integrations/supabase/types';
import logger from '@/lib/logger';

interface SiteSettings {
    site_name: string;
    site_description: string;
    site_url: string;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    logo_url: string;
    favicon_url: string;
    social_facebook: string;
    social_instagram: string;
    social_linkedin: string;
    social_twitter: string;
    social_tiktok: string;
    maintenance_mode: boolean;
    [key: string]: unknown;
}

// Ensure the merged settings object remains assignable to SiteSettings.
// site_settings.value is JSONB, so it can be boolean/number/string/object/array.
type SiteSettingsMap = Record<string, Json>;

interface SiteSettingsContextType {
    settings: SiteSettings;
    loading: boolean;
    error: Error | null;
    refreshSettings: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
    site_name: 'Fernanden',
    site_description: 'Design 3-en-1 aux multiples facettes.',
    site_url: 'https://fernanden.com',
    contact_email: 'fernandenentreprises@gmail.com',
    contact_phone: '+229 01 97 51 26 36',
    contact_address: 'Cotonou, Bénin',
    logo_url: '/logo-fernanden-main.png',
    favicon_url: '/favicon.ico',
    social_facebook: 'https://www.facebook.com/share/1A4ToZPFmk/',
    social_instagram: 'https://www.instagram.com/fernanden_design',
    social_linkedin: 'https://www.linkedin.com/company/fernanden-entreprises/',
    social_twitter: '',
    social_tiktok: 'https://www.tiktok.com/@fernanden_design',
    maintenance_mode: false,
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const settingsMap = await SiteSettingsService.getAsObject() as SiteSettingsMap;

            setSettings(prev => ({
                ...prev,
                ...settingsMap
            }));
            setError(null);
        } catch (err: unknown) {
            logger.error('Error fetching site settings:', err);
            setError(err instanceof Error ? err : new Error('Unknown settings error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <SiteSettingsContext.Provider
            value={{
                settings,
                loading,
                error,
                refreshSettings: fetchSettings
            }}
        >
            {children}
        </SiteSettingsContext.Provider>
    );
}

export function useSiteSettings() {
    const context = useContext(SiteSettingsContext);
    if (context === undefined) {
        throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
    }
    return context;
}
