export function SignalMarquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items];

  return (
    <div className="signal-marquee" aria-label="Core strengths">
      <div className="signal-marquee-track">
        {repeated.map((item, index) => (
          <span className="signal-marquee-item" key={`${item}-${index}`}>
            <span className="signal-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
