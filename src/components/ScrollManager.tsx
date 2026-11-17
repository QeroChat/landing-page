import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const id = window.setTimeout(() => {
            const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
            if (el) el.scrollIntoView({ behavior: 'instant' });
            else window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
        return () => window.clearTimeout(id);
    }, [pathname, hash]);

    return null;
}
