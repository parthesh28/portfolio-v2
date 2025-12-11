import { NextResponse } from 'next/server';

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
                'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`WakaTime API error: ${response.status}`);
        }

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