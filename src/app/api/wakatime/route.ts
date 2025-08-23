export async function GET() {
    try {
        const response = await fetch('https://wakatime.com/api/v1/users/current/stats', {
            headers: {
                'Authorization': `Basic waka_6fcce06d-9fc9-4445-91fc-daf702c540dd`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`WakaTime API error: ${response.status}`);
        }

        const data = await response.json();

        // Transform the data to your desired format
        const transformedData = {
            total_time: data.data.human_readable_total_including_other_language,
            top_languages: data.data.languages.slice(0, 2).map(lang => lang.name)
        };

        return Response.json(transformedData);
    } catch (error) {
        console.error('Error fetching WakaTime data:', error);
        return Response.json({ error: 'Failed to fetch WakaTime data' }, { status: 500 });
    }
  }