const isProd = typeof import.meta !== 'undefined' ? (import.meta.env && import.meta.env.PROD) : process.env.NODE_ENV === 'production';

function safeLog(fn: (...args: any[]) => void) {
  return (...args: any[]) => {
    if (!isProd) fn(...args);
  };
}

export const debug = safeLog(console.debug ? console.debug.bind(console) : console.log.bind(console));
export const info = safeLog(console.info.bind(console));
export const warn = safeLog(console.warn.bind(console));
export const error = (...args: any[]) => { console.error(...args); };

export default { debug, info, warn, error };
