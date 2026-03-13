import { NextResponse } from 'next/server';

interface WakaTimeResponse {
    data: {
        human_readable_total_including_other_language: string;
        languages: { name: string }[];
    };
}

export async function GET() {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    try {
        const response = await fetch('https://wakatime.com/api/v1/users/current/stats', {
            headers: { Authorization: `Basic ${btoa(apiKey)}` },
            next: { revalidate: 3600 }
        });

        if (!response.ok) throw new Error(`WakaTime API error: ${response.status}`);

        const { data } = (await response.json()) as WakaTimeResponse;

        return NextResponse.json({
            total_time: data.human_readable_total_including_other_language,
            top_languages: data.languages.slice(0, 2).map(lang => lang.name)
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch WakaTime data' }, { status: 500 });
    }
}