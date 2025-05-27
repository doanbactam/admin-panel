import { handleFacebookError } from './facebook'

// Facebook Insights API interfaces
export interface PageInsights {
  pageId: string
  pageName: string
  followers: number
  likes: number
  reach: number
  impressions: number
  engagement: number
  engagementRate: number
  period: string
  endTime: string
}

export interface PostInsights {
  postId: string
  fbPostId: string
  title: string
  content: string
  publishedAt: string
  reach: number
  impressions: number
  likes: number
  comments: number
  shares: number
  clicks: number
  engagement: number
  engagementRate: number
}

export interface AudienceInsights {
  pageId: string
  demographics: {
    ageGender: Array<{
      ageRange: string
      male: number
      female: number
    }>
    countries: Array<{
      country: string
      percentage: number
    }>
    cities: Array<{
      city: string
      percentage: number
    }>
  }
  period: string
}

export interface InsightsTimeRange {
  since: string // YYYY-MM-DD
  until: string // YYYY-MM-DD
}

// Get page insights from Facebook API
export async function getPageInsights(
  pageId: string,
  accessToken: string,
  timeRange: InsightsTimeRange
): Promise<{ success: boolean; data: PageInsights | null; error: any }> {
  try {
    const metrics = [
      'page_fans',
      'page_fan_adds',
      'page_impressions',
      'page_reach',
      'page_engaged_users',
      'page_post_engagements'
    ].join(',')

    const url = `https://graph.facebook.com/v18.0/${pageId}/insights`
    const params = new URLSearchParams({
      metric: metrics,
      period: 'day',
      since: timeRange.since,
      until: timeRange.until,
      access_token: accessToken
    })

    const response = await fetch(`${url}?${params}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error?.message || 'Failed to fetch page insights')
    }

    // Get page info
    const pageInfoResponse = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}?fields=name,fan_count,likes&access_token=${accessToken}`
    )
    const pageInfo = await pageInfoResponse.json()

    // Process insights data
    const insights = result.data || []
    const processedData: PageInsights = {
      pageId,
      pageName: pageInfo.name || 'Unknown Page',
      followers: pageInfo.fan_count || 0,
      likes: pageInfo.likes || 0,
      reach: getMetricValue(insights, 'page_reach'),
      impressions: getMetricValue(insights, 'page_impressions'),
      engagement: getMetricValue(insights, 'page_post_engagements'),
      engagementRate: 0, // Will calculate later
      period: `${timeRange.since} to ${timeRange.until}`,
      endTime: timeRange.until
    }

    // Calculate engagement rate
    if (processedData.reach > 0) {
      processedData.engagementRate = (processedData.engagement / processedData.reach) * 100
    }

    return {
      success: true,
      data: processedData,
      error: null
    }

  } catch (error) {
    return {
      success: false,
      data: null,
      error: handleFacebookError(error)
    }
  }
}

// Get post insights from Facebook API
export async function getPostInsights(
  fbPostId: string,
  accessToken: string
): Promise<{ success: boolean; data: PostInsights | null; error: any }> {
  try {
    const metrics = [
      'post_impressions',
      'post_reach',
      'post_engaged_users',
      'post_clicks',
      'post_reactions_like_total',
      'post_comments',
      'post_shares'
    ].join(',')

    const url = `https://graph.facebook.com/v18.0/${fbPostId}/insights`
    const params = new URLSearchParams({
      metric: metrics,
      access_token: accessToken
    })

    const response = await fetch(`${url}?${params}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error?.message || 'Failed to fetch post insights')
    }

    // Get post info
    const postInfoResponse = await fetch(
      `https://graph.facebook.com/v18.0/${fbPostId}?fields=message,created_time&access_token=${accessToken}`
    )
    const postInfo = await postInfoResponse.json()

    // Process insights data
    const insights = result.data || []
    const reach = getMetricValue(insights, 'post_reach')
    const engagement = getMetricValue(insights, 'post_engaged_users')

    const processedData: PostInsights = {
      postId: '', // Will be filled by caller
      fbPostId,
      title: postInfo.message?.substring(0, 50) + '...' || 'No title',
      content: postInfo.message || '',
      publishedAt: postInfo.created_time || '',
      reach,
      impressions: getMetricValue(insights, 'post_impressions'),
      likes: getMetricValue(insights, 'post_reactions_like_total'),
      comments: getMetricValue(insights, 'post_comments'),
      shares: getMetricValue(insights, 'post_shares'),
      clicks: getMetricValue(insights, 'post_clicks'),
      engagement,
      engagementRate: reach > 0 ? (engagement / reach) * 100 : 0
    }

    return {
      success: true,
      data: processedData,
      error: null
    }

  } catch (error) {
    return {
      success: false,
      data: null,
      error: handleFacebookError(error)
    }
  }
}

// Get audience insights from Facebook API
export async function getAudienceInsights(
  pageId: string,
  accessToken: string,
  timeRange: InsightsTimeRange
): Promise<{ success: boolean; data: AudienceInsights | null; error: any }> {
  try {
    // Get demographic insights
    const demographicsUrl = `https://graph.facebook.com/v18.0/${pageId}/insights`
    const demographicsParams = new URLSearchParams({
      metric: 'page_fans_gender_age,page_fans_country,page_fans_city',
      period: 'lifetime',
      access_token: accessToken
    })

    const response = await fetch(`${demographicsUrl}?${demographicsParams}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error?.message || 'Failed to fetch audience insights')
    }

    const insights = result.data || []
    
    const processedData: AudienceInsights = {
      pageId,
      demographics: {
        ageGender: processAgeGenderData(insights),
        countries: processCountryData(insights),
        cities: processCityData(insights)
      },
      period: `${timeRange.since} to ${timeRange.until}`
    }

    return {
      success: true,
      data: processedData,
      error: null
    }

  } catch (error) {
    return {
      success: false,
      data: null,
      error: handleFacebookError(error)
    }
  }
}

// Helper function to extract metric value from insights
function getMetricValue(insights: any[], metricName: string): number {
  const metric = insights.find(item => item.name === metricName)
  if (!metric || !metric.values || metric.values.length === 0) {
    return 0
  }
  
  // Get the latest value
  const latestValue = metric.values[metric.values.length - 1]
  return latestValue.value || 0
}

// Process age/gender demographic data
function processAgeGenderData(insights: any[]): Array<{ ageRange: string; male: number; female: number }> {
  const ageGenderMetric = insights.find(item => item.name === 'page_fans_gender_age')
  if (!ageGenderMetric || !ageGenderMetric.values || ageGenderMetric.values.length === 0) {
    return []
  }

  const data = ageGenderMetric.values[ageGenderMetric.values.length - 1].value || {}
  const processed: Array<{ ageRange: string; male: number; female: number }> = []

  // Group by age ranges
  const ageRanges = ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
  
  ageRanges.forEach(ageRange => {
    const male = data[`M.${ageRange}`] || 0
    const female = data[`F.${ageRange}`] || 0
    
    if (male > 0 || female > 0) {
      processed.push({ ageRange, male, female })
    }
  })

  return processed
}

// Process country demographic data
function processCountryData(insights: any[]): Array<{ country: string; percentage: number }> {
  const countryMetric = insights.find(item => item.name === 'page_fans_country')
  if (!countryMetric || !countryMetric.values || countryMetric.values.length === 0) {
    return []
  }

  const data = countryMetric.values[countryMetric.values.length - 1].value || {}
  const total = Object.values(data).reduce((sum: number, count: any) => sum + (count || 0), 0)
  
  return Object.entries(data)
    .map(([country, count]: [string, any]) => ({
      country,
      percentage: total > 0 ? ((count || 0) / total) * 100 : 0
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10) // Top 10 countries
}

// Process city demographic data
function processCityData(insights: any[]): Array<{ city: string; percentage: number }> {
  const cityMetric = insights.find(item => item.name === 'page_fans_city')
  if (!cityMetric || !cityMetric.values || cityMetric.values.length === 0) {
    return []
  }

  const data = cityMetric.values[cityMetric.values.length - 1].value || {}
  const total = Object.values(data).reduce((sum: number, count: any) => sum + (count || 0), 0)
  
  return Object.entries(data)
    .map(([city, count]: [string, any]) => ({
      city,
      percentage: total > 0 ? ((count || 0) / total) * 100 : 0
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10) // Top 10 cities
}
