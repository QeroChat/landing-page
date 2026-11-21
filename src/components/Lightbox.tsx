import { useEffect, useRef } from 'react';

export interface LightboxImage {
    src: string;
    alt: string;
    title?: string;
}

interface Props {
    images: LightboxImage[];
    index: number | null;
    onClose: () => void;
    onChange: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onChange }: Props) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const open = index !== null;

    useEffect(() => {
        if (!open) return;
        const previousFocus = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus();
        };
    }, [open]);

    useEffect(() => {
        if (index === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
            else if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
            else if (e.key === 'Tab') {
                // Fokus zůstává uvnitř náhledu
                const items = document.querySelectorAll<HTMLElement>('.lightbox button');
                if (items.length === 0) return;
                const first = items[0], last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [index, images.length, onClose, onChange]);

    if (index === null) return null;
    const img = images[index];
    const many = images.length > 1;

    return (
        <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={img.title ?? img.alt}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Zavřít náhled">✕</button>

            {many && (
                <button type="button" className="lightbox-nav prev" onClick={() => onChange((index - 1 + images.length) % images.length)} aria-label="Předchozí fotka">‹</button>
            )}

            <figure className="lightbox-figure">
                <img src={img.src} alt={img.alt} />
                {(img.title || many) && (
                    <figcaption>
                        {img.title && <b>{img.title}</b>}
                        {many && <span>{index + 1} / {images.length}</span>}
                    </figcaption>
                )}
            </figure>

            {many && (
                <button type="button" className="lightbox-nav next" onClick={() => onChange((index + 1) % images.length)} aria-label="Další fotka">›</button>
            )}
        </div>
    );
}
