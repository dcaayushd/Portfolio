'use client';

import { GooeyText } from '@/components/ui/gooey-text-morphing';

interface GooeyTextRoleProps {
  roles?: string[];
}

export function GooeyTextRole({
  roles = ["AI/ML Engineer", "Flutter Developer"]
}: GooeyTextRoleProps) {
  return (
    <div className="mb-6">
      <GooeyText
        texts={roles}
        morphTime={0.8}
        cooldownTime={0.4}
        className="font-bold"
        textClassName="text-2xl md:text-3xl"
      />
    </div>
  );
}
