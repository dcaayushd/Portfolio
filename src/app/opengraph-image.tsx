import { ImageResponse } from 'next/og';

export const alt = 'Aayush D. C. Dangi — AI/ML Engineer, Python Backend Developer, and Flutter Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 70px',
          background: '#1e1b1a',
          color: '#f6f0e8',
          fontFamily: 'Arial, sans-serif',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 24, letterSpacing: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, border: '2px solid #f6f0e8', borderRadius: 10, fontFamily: 'Georgia, serif', letterSpacing: -2 }}>AD</div>
          AAYUSH D C DANGI
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 850 }}>
          <div style={{ color: '#e6bd5d', fontSize: 20, letterSpacing: 3 }}>AI/ML ENGINEER · PYTHON BACKEND · FLUTTER</div>
          <div style={{ marginTop: 20, fontFamily: 'Georgia, serif', fontSize: 82, lineHeight: 0.98, letterSpacing: -5 }}>
            AI systems, built for use.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#d7ccc0', fontSize: 24 }}>
          <span>Computer vision</span><span style={{ color: '#e6bd5d' }}>•</span><span>RAG</span><span style={{ color: '#e6bd5d' }}>•</span><span>FastAPI</span><span style={{ color: '#e6bd5d' }}>•</span><span>Flutter</span>
        </div>

        <div style={{ position: 'absolute', width: 420, height: 420, right: -130, top: -120, border: '2px solid rgba(230, 189, 93, 0.52)', borderRadius: 210 }} />
        <div style={{ position: 'absolute', width: 300, height: 300, right: -45, top: -60, border: '2px solid rgba(229, 170, 160, 0.5)', borderRadius: 150 }} />
      </div>
    ),
    size
  );
}
