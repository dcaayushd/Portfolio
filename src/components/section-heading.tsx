import { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div className="section-copy">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="section-title">{title}</h2>
        {description ? (
          <p className="section-description muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}
