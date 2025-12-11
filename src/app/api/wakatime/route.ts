import { NextResponse } from 'next/server';

// 1. Define the shape of the WakaTime API response
interface WakaTimeLanguage {
    name: string;
    percent: number;
}

interface WakaTimeResponse {
    data: {
        human_readable_total_including_other_language: string;
        languages: WakaTimeLanguage[];
    };
}

export async function GET() {
    // Safety: Handle missing API Key gracefully
    const apiKey = process.env.WAKATIME_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: 'WakaTime API Key is not defined in environment variables' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch('https://wakatime.com/api/v1/users/current/stats', {
            headers: {
                // WakaTime expects the API key to be Base64 encoded for Basic Auth
                'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            // Optional: Caching logic (Next.js defaults to 'force-cache' for fetch)
            // next: { revalidate: 3600 } 
        });

        if (!response.ok) {
            throw new Error(`WakaTime API error: ${response.status}`);
        }

        // 2. Cast the JSON response to your Interface
        const data = (await response.json()) as WakaTimeResponse;

        const transformedData = {
            total_time: data.data.human_readable_total_including_other_language,
            top_languages: data.data.languages.slice(0, 2).map((lang) => lang.name)
        };

        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('Error fetching WakaTime data:', error);
        return NextResponse.json({ error: 'Failed to fetch WakaTime data' }, { status: 500 });
    }
}