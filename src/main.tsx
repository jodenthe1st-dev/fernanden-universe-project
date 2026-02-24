import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { validateClientEnv } from "./env";
import logger from "./lib/logger";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

validateClientEnv();

// Gestion sécurisée des rejets de promesse non gérés
window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const isDev = import.meta.env.DEV;
    
    // Ne supprimer QUE les erreurs d'abort connues de Supabase en développement
    const isKnownSupabaseAbortError = 
        reason?.name === 'AbortError' && 
        (reason?.message?.includes('locks.ts') || 
         reason?.stack?.includes('@supabase'));
    
    if (isDev && isKnownSupabaseAbortError) {
        event.preventDefault();
        logger.warn('[Supabase] Known abort error suppressed:', reason.message);
        return;
    }
    
    // Journaliser toutes les autres erreurs sans les supprimer
    logger.error('[Unhandled Promise Rejection]', {
        message: reason?.message,
        name: reason?.name,
        stack: reason?.stack?.split('\n').slice(0, 3).join('\n')
    });
    
    // Les erreurs inconnues se propagent normalement pour être capturées par les Error Boundaries
});

createRoot(rootElement).render(<App />);
