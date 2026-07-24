import { ImageResponse } from 'next/og';
import { bits } from '@/utils/bits';
import fs from 'fs/promises';
import path from 'path';

export const alt = 'parthesh purohit | bit';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bit = bits.find((b) => b.slug === slug);
  const title = bit ? bit.title : 'bits & logs';

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
          padding: '50px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            border: '3px solid #e4e4e7',
            padding: '48px 60px',
            backgroundColor: '#27272a',
            boxShadow: '10px 10px 0px #000000',
            maxWidth: '1000px',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#a1a1aa',
              marginBottom: '20px',
              textTransform: 'lowercase',
            }}
          >
            parthesh purohit / bits
          </div>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 700,
              lineHeight: '1.25',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
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
