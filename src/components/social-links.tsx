import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
};

export function SocialLinks({
  links,
  variant = 'compact',
  className
}: {
  links: SocialLink[];
  variant?: 'compact' | 'button';
  className?: string;
}) {
  return (
    <div className={cn('social-links', `social-links-${variant}`, className)}>
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            className={cn(variant === 'button' ? 'button button-secondary social-button' : 'social-link')}
            aria-label={link.label}
          >
            <Icon size={16} />
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
