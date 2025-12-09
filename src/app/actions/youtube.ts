'use server';

import { Innertube } from 'youtubei.js/web';

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

async function getVideoInfo(url: string) {
  const videoId = extractVideoId(url);
  if (!videoId) throw new Error('Invalid YouTube URL');
  
  const youtube = await Innertube.create();
  return youtube.getInfo(videoId);
}

export async function getYouTubeMetadata(url: string): Promise<YouTubeMetadata | null> {
  try {
    const info = await getVideoInfo(url);
    const videoId = extractVideoId(url)!;
    const durationSeconds = info.basic_info.duration || 0;

    return {
      videoId,
      title: info.basic_info.title || 'Unknown Title',
      channel: info.basic_info.author || 'Unknown Channel',
      thumbnail: info.basic_info.thumbnail?.[0]?.url || '',
      duration: formatDuration(durationSeconds),
      description: info.basic_info.short_description || '',
    };
  } catch (error) {
    console.error('Error fetching YouTube metadata:', error);
    return null;
  }
}

export async function getYouTubeTranscript(url: string): Promise<YouTubeTranscript | null> {
  try {
    const info = await getVideoInfo(url);
    
    const transcriptData = await info.getTranscript();
    
    if (!transcriptData) {
      return null;
    }

    const segments = transcriptData.transcript?.content?.body?.initial_segments?.map((segment: any) => ({
      text: segment.snippet?.text || '',
      start: segment.start_ms / 1000,
      duration: segment.end_ms / 1000 - segment.start_ms / 1000,
    })) || [];

    const fullText = segments.map((s: any) => s.text).join(' ');

    return {
      text: fullText,
      segments,
    };
  } catch (error) {
    console.error('Error fetching YouTube transcript:', error);
    return null;
  }
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
