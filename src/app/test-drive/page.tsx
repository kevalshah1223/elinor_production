'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

interface DriveTestResult {
  success: boolean
  message: string
  folderInfo: {
    folderId: string
    totalFiles: number
    serviceEmail: string
    projectId: string
  }
  files: any[]
  sampleUrls: any[]
  error?: string
  details?: string
}

const TestDrivePage = () => {
  const [result, setResult] = useState<DriveTestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-drive')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to test connection',
        error: error instanceof Error ? error.message : 'Unknown error',
        folderInfo: { folderId: '', totalFiles: 0, serviceEmail: '', projectId: '' },
        files: [],
        sampleUrls: []
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-poppins mb-4">
            Google Drive Integration Test
          </h1>
          <p className="text-gray-400">
            Testing connection to Google Drive API for Elinor Production
          </p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Connection Status</h2>
              <Button
                onClick={testConnection}
                disabled={loading}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Test Connection
              </Button>
            </div>

            {loading && (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-400" />
                <p className="text-gray-400">Testing Google Drive connection...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center space-x-3">
                  {result.success ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-400" />
                  )}
                  <span className={`text-lg font-medium ${
                    result.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.message}
                  </span>
                </div>

                {/* Folder Info */}
                {result.success && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2 text-blue-400">Folder Information</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Folder ID:</span>
                          <span className="ml-2 font-mono text-green-400">
                            {result.folderInfo.folderId}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Files:</span>
                          <span className="ml-2 text-white">
                            {result.folderInfo.totalFiles}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h3 className="font-semibold mb-2 text-blue-400">Service Account</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Email:</span>
                          <span className="ml-2 font-mono text-green-400 break-all">
                            {result.folderInfo.serviceEmail}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Project:</span>
                          <span className="ml-2 text-white">
                            {result.folderInfo.projectId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Files Preview */}
                {result.files && result.files.length > 0 && (
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-4 text-blue-400">Sample Files</h3>
                    <div className="space-y-2">
                      {result.files.map((file, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-white">{file.name}</span>
                          <span className="text-gray-400">{file.mimeType}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Error Details */}
                {!result.success && result.details && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-red-400">Error Details</h3>
                    <p className="text-red-300 text-sm">{result.details}</p>
                  </div>
                )}

                {/* Next Steps */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-blue-400">Next Steps</h3>
                  <ul className="text-sm text-blue-300 space-y-1">
                    <li>1. Share your Google Drive folder with the service account</li>
                    <li>2. Add some test images to the folder</li>
                    <li>3. Create sub-folders: Wedding, Pre-Wedding, Fashion, Events</li>
                    <li>4. Test the gallery page: <a href="/gallery" className="underline">Visit Gallery</a></li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild className="bg-white text-black hover:bg-gray-200">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TestDrivePage
