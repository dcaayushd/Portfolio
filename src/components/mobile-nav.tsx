'use client';

import { Download, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

type MobileNavLink = {
  href: string;
  label: string;
};

export function MobileNav({ links, resumePath }: { links: MobileNavLink[]; resumePath: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);

  const closeMenu = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onResize = () => {
      if (window.innerWidth > 1080) {
        closeMenu(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      const focusable = panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

      if (!focusable.length) {
        event.preventDefault();
        panel?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (!panel?.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus();
    }, 0);

    window.addEventListener('resize', onResize);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeMenu, open]);

  useEffect(() => {
    if (open || !restoreFocusRef.current) return;

    restoreFocusRef.current = false;
    const frame = window.requestAnimationFrame(() => toggleRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const toggleMenu = () => {
    if (open) {
      closeMenu();
      return;
    }

    restoreFocusRef.current = false;
    setOpen(true);
  };

  return (
    <div className={`mobile-nav${open ? ' is-open' : ''}`}>
      <button
        className="icon-button mobile-nav-toggle"
        type="button"
        ref={toggleRef}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={toggleMenu}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <>
          <button className="mobile-nav-backdrop" type="button" aria-label="Close navigation menu" onClick={() => closeMenu()} />

          <div
            className="mobile-nav-panel"
            id={menuId}
            ref={panelRef}
            role="dialog"
            aria-label="Site navigation"
            aria-modal="true"
            tabIndex={-1}
          >
            <nav className="mobile-nav-links" aria-label="Mobile section navigation">
              {links.map((link) => (
                <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mobile-nav-actions">
              <a className="button button-secondary" href={resumePath} download onClick={() => setOpen(false)}>
                <Download size={16} />
                Resume
              </a>
              <ThemeToggle />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
