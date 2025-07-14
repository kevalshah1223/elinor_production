'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Folder, Image, Video, Star } from 'lucide-react'

const FolderSummaryPage = () => {
  const folders = [
    {
      name: '📸 Wedding Photography',
      id: '15HevvU2I7sy-q1HS3rpesgjRsC7F6yym',
      description: 'Wedding ceremony and reception photos',
      icon: <Image className="h-6 w-6" />,
      subfolders: [
        { name: '🎭 Ceremony', id: '1GEOoPfLfjyEFgSD-N8NjylQVKAUgya9x' },
        { name: '🎉 Reception', id: '1Ny2ojSDknpbvuVXviQrkcMvH3Kwc5OEB' },
        { name: '👰 Bridal Portraits', id: '1GC0yqQIvx55EZf0ACYVxm-e7GTv1UfQq' },
        { name: '🤵 Groom Portraits', id: '14DPHspzqdLkjPQ0PuUgt9-hxxSTInlPk' },
        { name: '👨‍👩‍👧‍👦 Family Photos', id: '1_2YkER2BEGUCOIPJaXMWiuAgah7ZphwP' },
        { name: '💑 Couple Shots', id: '1QViN7qaWcF9CkzCOgcmJ1MsXC3T2bh07' }
      ]
    },
    {
      name: '💕 Pre-Wedding Photography',
      id: '18FWYFtzXkBWYV-srcgxYYrZXiPGlAhi8',
      description: 'Engagement and pre-wedding photo sessions',
      icon: <Image className="h-6 w-6" />,
      subfolders: [
        { name: '💍 Engagement Session', id: '1nBD05pbvC-Jg0KPdLMEty2IJkWGdfb2h' },
        { name: '🌅 Outdoor Shoots', id: '1EgLryr1LtGJS8ppzbSXRk9iM96BghljS' },
        { name: '🏠 Indoor Sessions', id: '1bibj9SYaXPndOyQjyMplG1g45becSUlr' },
        { name: '🎨 Creative Concepts', id: '1TKNs0hbCQby8kSfpVKxHCGv7AeXmWz2p' },
        { name: '📱 Social Media Ready', id: '1ivIGNlEk86SBJtFkVUmynvkb_P1-i8fd' }
      ]
    },
    {
      name: '👗 Fashion Photography',
      id: '16mIELmYcVRCK8kd3PZm5nc-zwrPQ3duY',
      description: 'Fashion shoots and model portfolios',
      icon: <Image className="h-6 w-6" />,
      subfolders: [
        { name: '📸 Studio Sessions', id: '1CrwCHg7LHRHh70VBCtJ1ckBGPpqjRuWE' },
        { name: '🌆 Urban Fashion', id: '1RcxvbOF2zbivOdbu6OruZ2nbUpWmLrV7' },
        { name: '🌿 Nature Fashion', id: '1jviOhxXH14jDHMwVOZu5TAMadi0piQEO' },
        { name: '👔 Men\'s Fashion', id: '16hFwa8R8eACm2g6Cg-y4Diw-p_0JuZ6l' },
        { name: '👗 Women\'s Fashion', id: '1HttJbY_0EAgkufYrZGZFM31XrjqTCENI' },
        { name: '👶 Kids Fashion', id: '1cTeofMgk0sAE01qdUGRpgqH1DOkwpQ1G' }
      ]
    },
    {
      name: '🎊 Event Photography',
      id: '1MaeZwq8qx_laUzMNfDWCZRX5W-q2ALFj',
      description: 'Corporate events, parties, and celebrations',
      icon: <Image className="h-6 w-6" />,
      subfolders: [
        { name: '🏢 Corporate Events', id: '1_ekPtywcxOZqNV1SudQfTC9wsXTryg-S' },
        { name: '🎂 Birthday Parties', id: '133hxiEUZ--856vlKZXLIxuInQi8-UxwJ' },
        { name: '🎓 Graduations', id: '1a4lug_MQeIshIu3Qpm5Z6qTjybQ3RVtG' },
        { name: '🎪 Cultural Events', id: '1iW_-yzN6CiKpPB6YT_gmV7zMI4YZXgSh' },
        { name: '🏆 Award Ceremonies', id: '1n6yLc7sFQAKzg19YpZDDBDryrGCi8Heh' },
        { name: '🎈 Private Parties', id: '1QJ9AMjT9bFM8728p7zyt8gKhsXr_lcqm' }
      ]
    },
    {
      name: '🎬 Video Content',
      id: '1qwDN6HtYu5lO0FwHUflSQWTVpLpTzap6',
      description: 'Wedding films, reels, and video content',
      icon: <Video className="h-6 w-6" />,
      subfolders: [
        { name: '💒 Wedding Films', id: '1bIYxneRme4IhtMLco3jJwV8VMF5uh8zt' },
        { name: '💕 Pre-Wedding Videos', id: '1gLTEU1zyzChnNAG3a0JICwkEpmQAxpg2' },
        { name: '📱 Instagram Reels', id: '1ldIsezBnrNnmOo-Iz4n2kYo6LznjaEzx' },
        { name: '🎥 Behind the Scenes', id: '15JwPJ_0DjC9BqSFlo86a5CJ_e8cwcXNo' },
        { name: '📺 YouTube Content', id: '10dVUqvbix-SCEsvxu9wyjC4OQayFFJ38' },
        { name: '🎞️ Raw Footage', id: '1lF2ZQ9SNImXIds9kckB6C7xeYx3Y3OwW' }
      ]
    },
    {
      name: '🌟 Featured Content',
      id: '1svtYEn4CMCBpK75F2dpNLB7BGTl6-oyW',
      description: 'Best photos and videos for website showcase',
      icon: <Star className="h-6 w-6" />,
      subfolders: [
        { name: '🏆 Portfolio Highlights', id: '192ncnbD3F-l13tc8Ngbt-R_mMSkJXG0e' },
        { name: '📱 Social Media Posts', id: '1sc3UxghRFqPw563oxVpJrTAAhw5kF-Zk' },
        { name: '🖼️ Website Gallery', id: '1fAiLYmILC5r7OPr1iMD4awMbMTK8h19v' },
        { name: '📰 Press & Media', id: '17E5uyU776jpf8Do2xibtW92NkH-fizw3' },
        { name: '🎯 Client Testimonials', id: '13EuReOwr1I_Ai49RakBubFWduD3Y5Hgh' }
      ]
    }
  ]

  const openFolder = (folderId: string) => {
    window.open(`https://drive.google.com/drive/folders/${folderId}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins mb-4">
            📁 Google Drive Folder Structure
          </h1>
          <p className="text-gray-400 text-lg">
            Your organized content structure for Elinor Production
          </p>
          <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <p className="text-green-400 font-semibold">
              ✅ Successfully created 6 main folders with 34 subfolders!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {folders.map((folder, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {folder.icon}
                    <span className="text-lg">{folder.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openFolder(folder.id)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open
                  </Button>
                </CardTitle>
                <p className="text-gray-400 text-sm">{folder.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400 mb-3">Subfolders:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {folder.subfolders.map((subfolder, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center justify-between p-2 bg-gray-700/30 rounded hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <Folder className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{subfolder.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openFolder(subfolder.id)}
                          className="text-gray-400 hover:text-white h-6 w-6 p-0"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center space-y-6">
          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                📸 How to Upload Content
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-white mb-2">For Photos:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Wedding photos → 📸 Wedding Photography</li>
                    <li>• Pre-wedding photos → 💕 Pre-Wedding Photography</li>
                    <li>• Fashion photos → 👗 Fashion Photography</li>
                    <li>• Event photos → 🎊 Event Photography</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">For Videos:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Wedding films → 🎬 Video Content → 💒 Wedding Films</li>
                    <li>• Instagram reels → 🎬 Video Content → 📱 Instagram Reels</li>
                    <li>• Behind scenes → 🎬 Video Content → 🎥 Behind the Scenes</li>
                    <li>• Best content → 🌟 Featured Content</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <a href="/gallery">View Gallery</a>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <a href="/test-drive">Test Connection</a>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FolderSummaryPage
