import { ImageResponse } from 'next/og';
import fs from 'fs/promises';
import path from 'path';

export const alt = 'parthesh purohit';
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
          backgroundColor: '#1d1d1d',
          color: '#e4e4e7',
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
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            parthesh purohit
          </div>
          <div style={{ fontSize: '26px', color: '#a1a1aa' }}>
            just a human
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
