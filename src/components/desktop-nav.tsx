"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
}

export function DesktopNav({ navItems }: { navItems: NavItem[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const directPageLink = navItems.find((item) => item.href === pathname)?.href || null;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      let active = directPageLink;

      for (const item of navItems) {
        if (!item.href.startsWith('#')) continue;

        const section = document.getElementById(item.href.slice(1));
        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top - 150 && scrollPosition < bottom - 150) {
          active = item.href;
        }
      }

      setActiveSection(active);
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [navItems, pathname]);

  return (
    <nav className="nav-links" aria-label="Section navigation">
      {navItems.map((item) => (
        <a href={item.href} key={item.href} className={activeSection === item.href ? "active" : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
