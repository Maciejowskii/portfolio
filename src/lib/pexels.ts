interface PexelsPhoto {
  id: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
  };
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
}

export interface BlogImage {
  url: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  pexelsUrl: string;
}

export async function searchPexelsImage(query: string): Promise<BlogImage | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
      { headers: { Authorization: apiKey } }
    );

    if (!res.ok) return null;

    const data: PexelsResponse = await res.json();
    if (!data.photos || data.photos.length === 0) return null;

    const photo = data.photos[Math.floor(Math.random() * Math.min(data.photos.length, 3))];

    return {
      url: photo.src.large,
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      pexelsUrl: photo.url,
    };
  } catch {
    return null;
  }
}

export async function searchMultipleImages(queries: string[]): Promise<BlogImage[]> {
  const results = await Promise.all(queries.map(searchPexelsImage));
  return results.filter((r): r is BlogImage => r !== null);
}
