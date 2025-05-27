'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Cloud,
  Server,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  XCircle,
  Info,
  ExternalLink
} from 'lucide-react'

interface StorageConfig {
  name: string
  configured: boolean
  features: string[]
  limits: {
    maxSize: string
    bandwidth: string
  }
}

interface StorageInfo {
  current: string
  available: string[]
  configs: Record<string, StorageConfig>
}

export function StorageProviderInfo() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStorageInfo()
  }, [])

  const fetchStorageInfo = async () => {
    try {
      const response = await fetch('/api/media/upload')
      if (response.ok) {
        const data = await response.json()
        setStorageInfo({
          current: data.provider,
          available: data.available,
          configs: {
            vercel: {
              name: 'Vercel Blob',
              configured: data.available.includes('vercel'),
              features: ['Global CDN', 'Edge Optimization', 'Zero Config'],
              limits: { maxSize: '500MB', bandwidth: 'Unlimited' }
            },
            cloudinary: {
              name: 'Cloudinary',
              configured: data.available.includes('cloudinary'),
              features: ['Image/Video Processing', 'AI Features', 'Transformations', 'CDN'],
              limits: { maxSize: '100MB', bandwidth: '25GB/month free' }
            },
            s3: {
              name: 'AWS S3',
              configured: data.available.includes('s3'),
              features: ['Scalable Storage', 'Versioning', 'Lifecycle Management'],
              limits: { maxSize: '5TB', bandwidth: 'Pay per use' }
            },
            local: {
              name: 'Local Storage',
              configured: true,
              features: ['Simple', 'No External Dependencies', 'Development Only'],
              limits: { maxSize: 'Disk Space', bandwidth: 'Server Bandwidth' }
            }
          }
        })
      }
    } catch (error) {
      console.error('Error fetching storage info:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'vercel':
        return <Zap className="h-5 w-5" />
      case 'cloudinary':
        return <Cloud className="h-5 w-5" />
      case 's3':
        return <Server className="h-5 w-5" />
      case 'local':
        return <Shield className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  const getProviderColor = (provider: string, isCurrent: boolean) => {
    if (isCurrent) return 'default'
    
    switch (provider) {
      case 'vercel':
        return 'secondary'
      case 'cloudinary':
        return 'outline'
      case 's3':
        return 'outline'
      case 'local':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  if (!storageInfo) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Unable to load storage information</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Storage Providers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Provider */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Current Provider</h3>
          <div className="flex items-center gap-2">
            {getProviderIcon(storageInfo.current)}
            <span className="font-medium">{storageInfo.configs[storageInfo.current]?.name}</span>
            <Badge variant="default">Active</Badge>
          </div>
        </div>

        {/* Available Providers */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Available Providers</h3>
          <div className="grid gap-3">
            {Object.entries(storageInfo.configs).map(([key, config]) => (
              <div
                key={key}
                className={`p-3 border rounded-lg ${
                  key === storageInfo.current ? 'border-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getProviderIcon(key)}
                    <span className="font-medium">{config.name}</span>
                    {config.configured ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <Badge variant={getProviderColor(key, key === storageInfo.current)}>
                    {key === storageInfo.current ? 'Current' : config.configured ? 'Available' : 'Not Configured'}
                  </Badge>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {config.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Limits */}
                  <div className="text-xs text-muted-foreground">
                    Max Size: {config.limits.maxSize} • Bandwidth: {config.limits.bandwidth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Setup Instructions</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {!storageInfo.configs.vercel.configured && (
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                <div>
                  <strong>Vercel Blob:</strong> Add BLOB_READ_WRITE_TOKEN to environment variables
                  <Button variant="link" size="sm" className="h-auto p-0 ml-1">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
            
            {!storageInfo.configs.cloudinary.configured && (
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                <div>
                  <strong>Cloudinary:</strong> Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
                  <Button variant="link" size="sm" className="h-auto p-0 ml-1">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
            
            {!storageInfo.configs.s3.configured && (
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                <div>
                  <strong>AWS S3:</strong> Add AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET
                  <Button variant="link" size="sm" className="h-auto p-0 ml-1">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 text-blue-600" />
            <div className="text-sm">
              <strong className="text-blue-900">Recommendation:</strong>
              <p className="text-blue-700 mt-1">
                {storageInfo.current === 'local' 
                  ? 'Configure a cloud provider for production deployment. Vercel Blob is recommended for Next.js apps.'
                  : `You're using ${storageInfo.configs[storageInfo.current]?.name}. Great choice for production!`
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
