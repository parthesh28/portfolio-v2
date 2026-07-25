import { ImageResponse } from 'next/og';
import fs from 'fs/promises';
import path from 'path';

export const alt = 'proof of work | parthesh purohit';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const fontData = await fs.readFile(
    path.join(process.cwd(), 'public/fonts/PublicPixel.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1d1d1d',
          color: '#e4e4e7',
          fontFamily: 'PublicPixel',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #e4e4e7',
            padding: '48px 72px',
            backgroundColor: '#27272a',
            boxShadow: '10px 10px 0px #000000',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            proof of work
          </div>
          <div style={{ fontSize: '26px', color: '#a1a1aa' }}>
            parthesh purohit
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'PublicPixel',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
