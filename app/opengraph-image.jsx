import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { COLLEGE_NAME } from '@/lib/site';

export const alt = 'INFINITUS — Mathematics Club of Rajalakshmi Institute of Technology';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'public/brand/infinitus-og.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 90px',
          gap: 64,
          color: '#EAF1FF',
          backgroundColor: '#04091A',
          backgroundImage: 'radial-gradient(circle at 85% 0%, rgba(77,184,232,0.35), rgba(4,9,26,0) 60%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={300} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, color: '#4DB8E8', letterSpacing: 6, textTransform: 'uppercase' }}>
            Mathematics Club
          </div>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>INFINITUS</div>
          <div style={{ fontSize: 40, marginTop: 18 }}>Where logic meets innovation</div>
          <div style={{ fontSize: 26, marginTop: 28, color: '#94A3C4' }}>{`${COLLEGE_NAME}, Chennai`}</div>
        </div>
      </div>
    ),
    size
  );
}
