import { ImageResponse } from 'next/og';
import fs from 'fs/promises';
import path from 'path';

export const alt = 'bits & logs | parthesh purohit';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const fontData = await fs.readFile(
    path.join(process.cwd(), 'public/fonts/GeistPixel-Square.ttf')
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
          backgroundColor: '#d4d4d4',
          color: '#0a0a0a',
          fontFamily: 'GeistPixelSquare',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #171717',
            padding: '48px 72px',
            backgroundColor: '#e5e5e5',
            boxShadow: '12px 12px 0px #0a0a0a',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            bits & logs
          </div>
          <div style={{ fontSize: '26px', color: '#525252', fontWeight: 700 }}>
            parthesh purohit
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'GeistPixelSquare',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
