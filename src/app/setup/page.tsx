'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react'

interface DiagnosticData {
  status: string
  timestamp: string
  environment: Record<string, boolean>
  values: Record<string, string>
  issues: string[]
  recommendations: string[]
  nextSteps: string[]
}

export default function SetupPage() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDiagnostics = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/diagnose')
      const data = await response.json()
      setDiagnostics(data)
    } catch (err) {
      setError('Failed to fetch diagnostics')
      console.error('Error fetching diagnostics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDiagnostics()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'NEEDS_ATTENTION':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      default:
        return <XCircle className="h-6 w-6 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return 'text-green-500'
      case 'NEEDS_ATTENTION':
        return 'text-yellow-500'
      default:
        return 'text-red-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Checking system status...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-red-500/10 border-red-500/20 max-w-md">
          <CardContent className="p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={fetchDiagnostics} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">System Setup & Diagnostics</h1>
          <p className="text-gray-400">Check your Google Drive API configuration and system status</p>
        </div>

        {diagnostics && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  {getStatusIcon(diagnostics.status)}
                  <span className={getStatusColor(diagnostics.status)}>
                    System Status: {diagnostics.status.replace('_', ' ')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">
                  Last checked: {new Date(diagnostics.timestamp).toLocaleString()}
                </p>
                <Button 
                  onClick={fetchDiagnostics} 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardContent>
            </Card>

            {/* Environment Variables */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Environment Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(diagnostics.environment).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <span className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      {value ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Issues */}
            {diagnostics.issues.length > 0 && (
              <Card className="bg-red-500/10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400">Issues Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {diagnostics.issues.map((issue, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-red-300">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {diagnostics.recommendations.length > 0 && (
              <Card className="bg-yellow-500/10 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {diagnostics.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-yellow-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {diagnostics.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-blue-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('/api/test-drive', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test Google Drive Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('/api/diagnose', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Raw Diagnostics
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('https://console.cloud.google.com/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Google Cloud Console
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('/gallery', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test Gallery Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
