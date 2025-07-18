import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const channelName = process.env.YOUTUBE_CHANNEL_NAME || 'elinorproduction'
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API key is not configured' },
        { status: 500 }
      )
    }

    // First, get the channel ID from the channel name
    const channelResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&type=channel&key=${apiKey}`
    )

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel information')
    }

    const channelData = await channelResponse.json()
    
    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json(
        { error: 'Channel not found', videos: [] },
        { status: 404 }
      )
    }

    const channelId = channelData.items[0].id.channelId

    // Now get the channel's uploads
    const videosResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`
    )

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos')
    }

    const videosData = await videosResponse.json()
    
    if (!videosData.items || videosData.items.length === 0) {
      return NextResponse.json(
        { message: 'No videos found', videos: [] },
        { status: 200 }
      )
    }

    // Get video IDs for additional details
    const videoIds = videosData.items.map((item: any) => item.id.videoId).join(',')
    
    // Get additional video details (view count, duration, etc.)
    const detailsResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${apiKey}`
    )

    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch video details')
    }

    const detailsData = await detailsResponse.json()
    
    // Map the video data with details
    const videos = videosData.items.map((item: any) => {
      const videoId = item.id.videoId
      const details = detailsData.items.find((detail: any) => detail.id === videoId) || {}
      
      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: {
          default: item.snippet.thumbnails.default?.url,
          medium: item.snippet.thumbnails.medium?.url,
          high: item.snippet.thumbnails.high?.url,
        },
        viewCount: details.statistics?.viewCount,
        duration: details.contentDetails?.duration,
      }
    })

    // Cache the response for 1 hour (3600 seconds)
    return NextResponse.json(
      { videos },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        }
      }
    )
  } catch (error) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube videos' },
      { status: 500 }
    )
  }
}
