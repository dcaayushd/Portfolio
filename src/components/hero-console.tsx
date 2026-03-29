'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Server, Smartphone } from 'lucide-react';
import { CountUpNumber } from '@/components/count-up-number';

type HeroConsoleMetric = {
  label: string;
  value: number;
  suffix?: string;
  note: string;
};

type HeroConsoleLane = {
  label: string;
  title: string;
  note: string;
  href: string;
};

const laneIcons = [BrainCircuit, Server, Smartphone];

export function HeroConsole({
  metrics,
  lanes,
  domain
}: {
  metrics: HeroConsoleMetric[];
  lanes: HeroConsoleLane[];
  domain: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-console" aria-label="Portfolio signal board">
      <div className="hero-console-header">
        <div>
          <div className="mini-label">Build console</div>
          <h3>Shipping AI ideas as working products, not isolated demos.</h3>
        </div>
        <div className="hero-console-status">
          <span className="hero-console-dot" />
          Live
        </div>
      </div>

      <div className="hero-console-metrics">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="hero-console-metric"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{metric.label}</span>
            <strong>
              <CountUpNumber value={metric.value} suffix={metric.suffix} />
            </strong>
            <p>{metric.note}</p>
          </motion.div>
        ))}
      </div>

      <div className="hero-console-lanes">
        {lanes.map((lane, index) => {
          const Icon = laneIcons[index] || ArrowUpRight;

          return (
            <motion.a
              key={lane.title}
              href={lane.href}
              className="hero-console-lane"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-console-lane-icon">
                <Icon size={16} />
              </div>
              <div>
                <span>{lane.label}</span>
                <strong>{lane.title}</strong>
                <p>{lane.note}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      <div className="hero-console-footer">
        <span>GitHub-synced work</span>
        <span>{domain}</span>
      </div>
    </div>
  );
}
