const isProd = typeof import.meta !== 'undefined' ? (import.meta.env && import.meta.env.PROD) : process.env.NODE_ENV === 'production';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeLog(fn: (...args: any[]) => void) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (!isProd) fn(...args);
  };
}

export const debug = safeLog(console.debug ? console.debug.bind(console) : console.log.bind(console));
export const info = safeLog(console.info.bind(console));
export const warn = safeLog(console.warn.bind(console));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const error = (...args: any[]) => { console.error(...args); };

export default { debug, info, warn, error };
