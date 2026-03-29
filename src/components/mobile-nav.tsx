'use client';

import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

type MobileNavLink = {
  href: string;
  label: string;
};

export function MobileNav({ links, resumePath }: { links: MobileNavLink[]; resumePath: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const onResize = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <div className={`mobile-nav${open ? ' is-open' : ''}`}>
      <button
        className="icon-button mobile-nav-toggle"
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open ? (
        <>
          <button className="mobile-nav-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)} />

          <div className="mobile-nav-panel">
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
