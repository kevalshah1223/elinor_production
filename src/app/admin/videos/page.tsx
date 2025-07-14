'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Plus, Youtube, Instagram, Trash2 } from 'lucide-react'
// Note: This admin panel is for demonstration purposes
// In production, you would connect this to your actual data source

const VideoAdmin = () => {
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    thumbnail: '',
    embedUrl: '',
    platform: 'youtube' as 'youtube' | 'instagram',
    category: 'wedding' as any,
    duration: '',
    featured: false
  })

  const [generatedCode, setGeneratedCode] = useState('')

  // Sample videos data for demonstration
  const [videosData] = useState([
    {
      id: 'sample-wedding-1',
      title: 'Beautiful Wedding Ceremony',
      description: 'A stunning wedding ceremony captured in cinematic style',
      thumbnail: '/placeholder-image.svg',
      embedUrl: 'https://www.youtube.com/embed/sample',
      platform: 'youtube' as const,
      category: 'wedding',
      duration: '3:45',
      featured: true,
      publishedAt: '2024-01-15T10:00:00Z'
    }
  ])

  const categories = [
    { value: 'wedding', label: 'Wedding Films' },
    { value: 'pre-wedding', label: 'Pre-Wedding' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'events', label: 'Events' },
    { value: 'instagram-reel', label: 'Instagram Reels' },
    { value: 'behind-scenes', label: 'Behind the Scenes' }
  ]

  const generateVideoCode = () => {
    const id = `${newVideo.category}-${Date.now()}`
    const publishedAt = new Date().toISOString()
    
    const videoObject = {
      id,
      title: newVideo.title,
      description: newVideo.description,
      thumbnail: newVideo.thumbnail,
      embedUrl: newVideo.embedUrl,
      platform: newVideo.platform,
      category: newVideo.category,
      publishedAt,
      ...(newVideo.duration && { duration: newVideo.duration }),
      ...(newVideo.featured && { featured: true })
    }

    const code = `  {
    id: '${videoObject.id}',
    title: '${videoObject.title}',
    description: '${videoObject.description}',
    thumbnail: '${videoObject.thumbnail}',
    embedUrl: '${videoObject.embedUrl}',
    platform: '${videoObject.platform}',
    category: '${videoObject.category}',
    publishedAt: '${videoObject.publishedAt}'${videoObject.duration ? `,
    duration: '${videoObject.duration}'` : ''}${videoObject.featured ? `,
    featured: true` : ''}
  },`

    setGeneratedCode(code)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('Code copied to clipboard!')
  }

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : ''
  }

  const handleYouTubeUrlChange = (url: string) => {
    const videoId = extractYouTubeId(url)
    if (videoId) {
      setNewVideo(prev => ({
        ...prev,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      }))
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Video Management</h1>
          <p className="text-gray-400">Add and manage your video content without API tokens</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Video Form */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Video
              </CardTitle>
              <CardDescription>
                Fill in the details and generate code to add to your videos.ts file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={newVideo.title}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Beautiful Wedding Ceremony - Sarah & John"
                  className="bg-gray-800 border-gray-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newVideo.description}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="A stunning wedding ceremony captured with cinematic excellence..."
                  className="bg-gray-800 border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Platform</label>
                  <Select value={newVideo.platform} onValueChange={(value: 'youtube' | 'instagram') => setNewVideo(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-500" />
                          YouTube
                        </div>
                      </SelectItem>
                      <SelectItem value="instagram">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-500" />
                          Instagram
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={newVideo.category} onValueChange={(value) => setNewVideo(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newVideo.platform === 'youtube' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">YouTube URL</label>
                  <Input
                    onChange={(e) => handleYouTubeUrlChange(e.target.value)}
                    placeholder="https://youtube.com/watch?v=VIDEO_ID"
                    className="bg-gray-800 border-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste YouTube URL and embed URL + thumbnail will be auto-generated
                  </p>
                </div>
              )}

              {newVideo.platform === 'instagram' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Instagram Post URL</label>
                  <Input
                    value={newVideo.embedUrl}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, embedUrl: e.target.value }))}
                    placeholder="https://www.instagram.com/p/POST_ID/"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Thumbnail URL</label>
                <Input
                  value={newVideo.thumbnail}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, thumbnail: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="bg-gray-800 border-gray-600"
                />
              </div>

              {newVideo.platform === 'youtube' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration (optional)</label>
                  <Input
                    value={newVideo.duration}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="3:45"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newVideo.featured}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm">Featured video</label>
              </div>

              <Button onClick={generateVideoCode} className="w-full">
                Generate Code
              </Button>
            </CardContent>
          </Card>

          {/* Generated Code */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle>Generated Code</CardTitle>
              <CardDescription>
                Copy this code and add it to src/data/videos.ts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedCode ? (
                <div className="space-y-4">
                  <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                    <code>{generatedCode}</code>
                  </pre>
                  <Button onClick={copyToClipboard} className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                  <div className="text-sm text-gray-400">
                    <p className="font-medium mb-2">Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Copy the generated code above</li>
                      <li>Open src/data/videos.ts</li>
                      <li>Integrate with your video management system</li>
                      <li>Update your database or CMS</li>
                      <li>Deploy changes to see the new video</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Fill in the form and click "Generate Code" to see the code here
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Current Videos */}
        <Card className="bg-gray-900 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle>Current Videos ({videosData.length})</CardTitle>
            <CardDescription>
              Videos currently configured in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videosData.map((video) => (
                <div key={video.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {video.platform === 'youtube' ? (
                      <Youtube className="h-4 w-4 text-red-500" />
                    ) : (
                      <Instagram className="h-4 w-4 text-pink-500" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {video.category}
                    </Badge>
                    {video.featured && (
                      <Badge className="text-xs bg-yellow-600">Featured</Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{video.description}</p>
                  {video.duration && (
                    <p className="text-xs text-gray-500 mt-2">{video.duration}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VideoAdmin
