import { useState, useEffect } from 'react';

interface DriveImage {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  createdTime: string;
  size: string;
  mimeType: string;
  type: 'image';
}

interface DriveVideo {
  id: string;
  name: string;
  embedUrl: string;
  thumbnailUrl: string;
  createdTime: string;
  size: string;
  mimeType: string;
  duration?: string;
  type: 'video';
}

interface GalleryResponse {
  category: string;
  images: DriveImage[];
  videos: DriveVideo[];
  media: (DriveImage | DriveVideo)[];
  total: number;
  lastUpdated: string;
}

interface ReelsResponse {
  category: string;
  videos: DriveVideo[];
  total: number;
  lastUpdated: string;
}

interface AllMediaItem {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  createdTime: string;
  size: string;
  mimeType: string;
  type: 'image' | 'video';
  category: string;
  embedUrl?: string;
  duration?: string;
}

interface AllMediaResponse {
  media: AllMediaItem[];
  total: number;
  lastUpdated: string;
  categories: string[];
  breakdown?: {
    images: number;
    videos: number;
  };
}

// Hook for fetching gallery images
export const useGalleryImages = (category: string) => {
  const [data, setData] = useState<GalleryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/gallery/${category}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching gallery images:', err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchImages();
    }
  }, [category]);

  return { data, loading, error, refetch: () => setLoading(true) };
};

// Hook for fetching video reels
export const useVideoReels = (category: string) => {
  const [data, setData] = useState<ReelsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/reels/${category}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching video reels:', err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchVideos();
    }
  }, [category]);

  return { data, loading, error, refetch: () => setLoading(true) };
};

// Hook for fetching all gallery categories
export const useAllGalleryImages = () => {
  const [allImages, setAllImages] = useState<DriveImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['wedding', 'pre-wedding', 'fashion', 'events'];

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const promises = categories.map(category =>
          fetch(`/api/gallery/${category}`).then(res => res.json())
        );
        
        const results = await Promise.all(promises);
        
        const combinedImages = results.flatMap(result => 
          result.images?.map((img: DriveImage) => ({
            ...img,
            category: result.category
          })) || []
        );
        
        setAllImages(combinedImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching all gallery images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  return { allImages, loading, error };
};

// Hook for fetching all media (images and videos) from all categories
export const useAllMedia = () => {
  const [data, setData] = useState<AllMediaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMedia = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/all-media');
      const result = await response.json();

      if (result.success) {
        setData(result);
      } else {
        setError(result.error || 'Failed to load media');
      }
    } catch (err) {
      console.error('Error fetching all media:', err);
      setError('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMedia();
  }, []);

  const refetch = () => {
    fetchAllMedia();
  };

  return { data, loading, error, refetch };
};
