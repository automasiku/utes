'use server';

// YouTube Transcript Service URL
const YOUTUBE_SERVICE_URL = process.env.YOUTUBE_SERVICE_URL || 'http://localhost:3001';

export interface YouTubeMetadata {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export interface YouTubeTranscript {
  text: string;
  segments: Array<{
    text: string;
    start: number;
    duration: number;
  }>;
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export async function getYouTubeMetadata(url: string): Promise<YouTubeMetadata | null> {
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Call microservice
    const response = await fetch(`${YOUTUBE_SERVICE_URL}/api/metadata?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch metadata');
    }

    const data = await response.json();

    return {
      videoId: data.videoId,
      title: data.title,
      channel: data.channel,
      thumbnail: data.thumbnail,
      duration: formatDuration(data.duration),
      description: data.description,
    };
  } catch (error: any) {
    console.error('[YouTube] Error fetching metadata:', error.message);
    return null;
  }
}

export async function getYouTubeTranscript(url: string): Promise<YouTubeTranscript | null> {
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Call microservice
    const response = await fetch(`${YOUTUBE_SERVICE_URL}/api/transcript?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch transcript');
    }

    const data = await response.json();

    return {
      text: data.text,
      segments: data.segments,
    };
  } catch (error: any) {
    console.error('[YouTube] Error fetching transcript:', error.message);
    return null;
  }
}
