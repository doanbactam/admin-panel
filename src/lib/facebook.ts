// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Facebook SDK doesn't have proper TypeScript declarations
import { FacebookAdsApi, User, Page } from 'facebook-nodejs-business-sdk'

// TypeScript interfaces for Facebook API
interface FacebookError {
  code: string | number
  message: string
  type: string
  fbtrace_id?: string
}

interface FacebookPostData {
  message?: string
  link?: string
  picture?: string
  name?: string
  caption?: string
  description?: string
  scheduled_publish_time?: number
  published?: boolean
}

interface FacebookMediaPostData {
  message?: string
  mediaUrl: string
  mediaType: 'photo' | 'video' | 'reel'
  scheduled_publish_time?: number
  published?: boolean
  isReel?: boolean
}

interface FacebookApiResponse {
  success: boolean
  data: {
    id: string
    created_time?: string
    permalink_url?: string
  } | null
  error: FacebookError | null
}

interface BatchPostResult {
  pageId: string
  success: boolean
  data: {
    id: string
    created_time?: string
    permalink_url?: string
  } | null
  error: FacebookError | null
}

interface FacebookRequestBody {
  access_token: string
  message?: string
  link?: string
  url?: string
  scheduled_publish_time?: string
  published?: string
}

// Initialize Facebook API
export const initializeFacebookAPI = (accessToken?: string) => {
  const api = FacebookAdsApi.init(accessToken || '')
  api.setDebug(process.env.NODE_ENV === 'development')
  return api
}

// Facebook OAuth URLs
export const getFacebookAuthUrl = (state?: string) => {
  const baseUrl = 'https://www.facebook.com/v21.0/dialog/oauth'
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID!,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
    scope: [
      'pages_manage_posts',
      'pages_read_engagement',
      'pages_show_list',
      'business_management',
      'pages_manage_metadata',
      'pages_read_user_content'
    ].join(','),
    response_type: 'code',
    ...(state && { state })
  })

  return `${baseUrl}?${params.toString()}`
}

// Exchange code for access token
export const exchangeCodeForToken = async (code: string) => {
  const tokenUrl = 'https://graph.facebook.com/v21.0/oauth/access_token'
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID!,
    client_secret: process.env.FACEBOOK_APP_SECRET!,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
    code
  })

  const response = await fetch(`${tokenUrl}?${params.toString()}`)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to exchange code for token: ${error}`)
  }

  return response.json()
}

// Get long-lived access token
export const getLongLivedToken = async (shortLivedToken: string) => {
  const tokenUrl = 'https://graph.facebook.com/v21.0/oauth/access_token'
  const params = new URLSearchParams({
    grant_type: 'fb_exchange_token',
    client_id: process.env.FACEBOOK_APP_ID!,
    client_secret: process.env.FACEBOOK_APP_SECRET!,
    fb_exchange_token: shortLivedToken
  })

  const response = await fetch(`${tokenUrl}?${params.toString()}`)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get long-lived token: ${error}`)
  }

  return response.json()
}

// Get user info
export const getFacebookUser = async (accessToken: string) => {
  initializeFacebookAPI(accessToken)

  const user = new User('me')
  const userData = await user.read(['id', 'name', 'email', 'picture'])

  return userData
}

// Get user's pages
export const getUserPages = async (accessToken: string) => {
  initializeFacebookAPI(accessToken)

  const user = new User('me')
  const pages = await user.getAccounts([
    'id',
    'name',
    'category',
    'about',
    'picture',
    'access_token',
    'tasks'
  ])

  return pages
}

// Get page info
export const getPageInfo = async (pageId: string, pageAccessToken: string) => {
  initializeFacebookAPI(pageAccessToken)

  const page = new Page(pageId)
  const pageData = await page.read([
    'id',
    'name',
    'category',
    'about',
    'picture',
    'fan_count',
    'followers_count',
    'website',
    'phone'
  ])

  return pageData
}

// Post to page using Graph API directly (more reliable than SDK)
export const postToPage = async (
  pageId: string,
  pageAccessToken: string,
  postData: FacebookPostData
): Promise<FacebookApiResponse> => {
  try {
    console.log(`Posting to page ${pageId} with Graph API`)

    // Use Graph API directly for better reliability
    const url = `https://graph.facebook.com/v21.0/${pageId}/feed`

    const body: FacebookRequestBody = {
      access_token: pageAccessToken
    }

    // Add message if provided
    if (postData.message) {
      body.message = postData.message
    }

    // Add link if provided
    if (postData.link) {
      body.link = postData.link
    }

    // Add scheduling if provided
    if (postData.scheduled_publish_time) {
      body.scheduled_publish_time = postData.scheduled_publish_time.toString()
      body.published = 'false'
    } else {
      body.published = postData.published !== false ? 'true' : 'false' // Default to true
    }

    console.log('Posting with data:', {
      pageId,
      hasMessage: !!body.message,
      hasLink: !!body.link,
      published: body.published,
      scheduled: !!body.scheduled_publish_time
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    console.log('Facebook API response:', {
      status: response.status,
      ok: response.ok,
      result
    })

    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status}: ${JSON.stringify(result)}`)
    }

    // Validate response has post ID
    if (!result.id) {
      throw new Error('Facebook API did not return a post ID')
    }

    return {
      success: true,
      data: {
        id: result.id,
        created_time: new Date().toISOString(),
        permalink_url: `https://www.facebook.com/${result.id}`
      },
      error: null
    }
  } catch (error: unknown) {
    console.error(`Error posting to page ${pageId}:`, error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to post to Facebook'
    const errorCode = error instanceof Error && 'code' in error ? String(error.code) : 'POST_ERROR'

    return {
      success: false,
      data: null,
      error: {
        code: errorCode,
        message: errorMessage,
        type: 'PostException'
      }
    }
  }
}

// Post Reels using Graph API
export const postReel = async (
  pageId: string,
  pageAccessToken: string,
  postData: FacebookMediaPostData
): Promise<FacebookApiResponse> => {
  try {
    console.log(`Posting Reel to page ${pageId}`)

    // Step 1: Initialize video upload
    const initUrl = `https://graph.facebook.com/v21.0/${pageId}/video_reels`

    const initBody: Record<string, string> = {
      access_token: pageAccessToken,
      upload_phase: 'start',
      video_url: postData.mediaUrl
    }

    if (postData.message) {
      initBody.description = postData.message
    }

    const initResponse = await fetch(initUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initBody)
    })

    const initResult = await initResponse.json()

    if (!initResponse.ok) {
      console.error('Reel initialization failed:', initResult)
      return {
        success: false,
        error: initResult.error?.message || 'Failed to initialize Reel upload',
        data: null
      }
    }

    console.log('Reel upload initialized:', initResult)

    // Step 2: Finish upload and publish
    const finishBody: Record<string, string> = {
      access_token: pageAccessToken,
      upload_phase: 'finish',
      video_id: initResult.video_id
    }

    if (postData.scheduled_publish_time) {
      finishBody.scheduled_publish_time = postData.scheduled_publish_time.toString()
      finishBody.published = 'false'
    } else {
      finishBody.published = postData.published !== false ? 'true' : 'false'
    }

    const finishResponse = await fetch(initUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finishBody)
    })

    const finishResult = await finishResponse.json()

    if (!finishResponse.ok) {
      console.error('Reel finish failed:', finishResult)
      return {
        success: false,
        error: finishResult.error?.message || 'Failed to finish Reel upload',
        data: null
      }
    }

    console.log('Reel posted successfully:', finishResult)

    return {
      success: true,
      data: {
        id: finishResult.id || initResult.video_id,
        created_time: new Date().toISOString(),
        permalink_url: `https://www.facebook.com/reel/${finishResult.id || initResult.video_id}`
      },
      error: null
    }

  } catch (error) {
    console.error('Error posting Reel:', error)
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error posting Reel',
        type: 'OAuthException',
        code: 500
      },
      data: null
    }
  }
}

// Post with media using Graph API directly
export const postWithMedia = async (
  pageId: string,
  pageAccessToken: string,
  postData: FacebookMediaPostData
): Promise<FacebookApiResponse> => {
  try {
    // Handle Reels separately
    if (postData.isReel || postData.mediaType === 'reel') {
      return await postReel(pageId, pageAccessToken, postData)
    }

    console.log(`Posting ${postData.mediaType} to page ${pageId}`)

    const baseUrl = `https://graph.facebook.com/v21.0/${pageId}`
    const endpoint = postData.mediaType === 'photo' ? 'photos' : 'videos'

    const body: Record<string, string> = {
      access_token: pageAccessToken,
      url: postData.mediaUrl
    }

    if (postData.message) {
      body.message = postData.message
    }

    if (postData.scheduled_publish_time) {
      body.scheduled_publish_time = postData.scheduled_publish_time.toString()
      body.published = 'false'
    } else {
      body.published = postData.published !== false ? 'true' : 'false'
    }

    console.log('Posting media with data:', {
      pageId,
      mediaType: postData.mediaType,
      mediaUrl: postData.mediaUrl,
      hasMessage: !!body.message,
      published: body.published
    })

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    console.log('Facebook media API response:', {
      status: response.status,
      ok: response.ok,
      result
    })

    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status}: ${JSON.stringify(result)}`)
    }

    if (!result.id) {
      throw new Error('Facebook API did not return a post ID for media')
    }

    return {
      success: true,
      data: {
        id: result.id,
        created_time: new Date().toISOString(),
        permalink_url: `https://www.facebook.com/${result.id}`
      },
      error: null
    }
  } catch (error: unknown) {
    console.error(`Error posting media to page ${pageId}:`, error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to post media'

    return {
      success: false,
      data: null,
      error: {
        code: 'MEDIA_POST_ERROR',
        message: errorMessage,
        type: 'MediaPostException'
      }
    }
  }
}

// Post multiple media (carousel/album)
export const postMultipleMedia = async (
  pageId: string,
  pageAccessToken: string,
  postData: {
    message?: string
    mediaUrls: string[]
    mediaType: 'photo' | 'video'
    scheduled_publish_time?: number
    published?: boolean
  }
): Promise<FacebookApiResponse> => {
  try {
    console.log(`Posting multiple ${postData.mediaType}s to page ${pageId}`)

    // For multiple photos, use album/carousel approach
    if (postData.mediaType === 'photo' && postData.mediaUrls.length > 1) {
      // Step 1: Create unpublished photo posts
      const photoIds: string[] = []

      for (const mediaUrl of postData.mediaUrls) {
        const photoResponse = await fetch(`https://graph.facebook.com/v21.0/${pageId}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_token: pageAccessToken,
            url: mediaUrl,
            published: false // Don't publish individual photos
          })
        })

        const photoResult = await photoResponse.json()

        if (photoResponse.ok && photoResult.id) {
          photoIds.push(photoResult.id)
        } else {
          console.error('Failed to upload photo:', photoResult)
        }
      }

      if (photoIds.length === 0) {
        return {
          success: false,
          error: {
            message: 'Failed to upload any photos',
            type: 'OAuthException',
            code: 400
          },
          data: null
        }
      }

      // Step 2: Create album post with all photos
      const albumBody: Record<string, any> = {
        access_token: pageAccessToken,
        attached_media: photoIds.map(id => ({ media_fbid: id }))
      }

      if (postData.message) {
        albumBody.message = postData.message
      }

      if (postData.scheduled_publish_time) {
        albumBody.scheduled_publish_time = postData.scheduled_publish_time.toString()
        albumBody.published = false
      } else {
        albumBody.published = postData.published !== false
      }

      const albumResponse = await fetch(`https://graph.facebook.com/v21.0/${pageId}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(albumBody)
      })

      const albumResult = await albumResponse.json()

      if (!albumResponse.ok) {
        console.error('Album creation failed:', albumResult)
        return {
          success: false,
          error: albumResult.error || {
            message: 'Failed to create album post',
            type: 'OAuthException',
            code: albumResponse.status
          },
          data: null
        }
      }

      console.log('Album posted successfully:', albumResult)

      return {
        success: true,
        data: {
          id: albumResult.id,
          created_time: new Date().toISOString(),
          permalink_url: `https://www.facebook.com/${albumResult.id}`
        },
        error: null
      }
    } else {
      // For videos or single media, fall back to regular posting
      return await postWithMedia(pageId, pageAccessToken, {
        message: postData.message,
        mediaUrl: postData.mediaUrls[0],
        mediaType: postData.mediaType,
        scheduled_publish_time: postData.scheduled_publish_time,
        published: postData.published
      })
    }

  } catch (error) {
    console.error('Error posting multiple media:', error)
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error posting multiple media',
        type: 'OAuthException',
        code: 500
      },
      data: null
    }
  }
}

// Batch post to multiple pages
export const batchPostToPages = async (
  pages: Array<{
    pageId: string
    pageAccessToken: string
    postPageId?: string
  }>,
  postData: {
    message?: string
    link?: string
    mediaUrls?: string[]
    mediaType?: 'photo' | 'video'
    postType?: string
    scheduled_publish_time?: number
    published?: boolean
  },
  onProgress?: (pageId: string, result: BatchPostResult) => void
): Promise<BatchPostResult[]> => {
  console.log('Starting batch post to pages:', {
    pagesCount: pages.length,
    postData: {
      hasMessage: !!postData.message,
      hasMedia: !!(postData.mediaUrls && postData.mediaUrls.length > 0),
      mediaType: postData.mediaType
    }
  })

  const results: BatchPostResult[] = []

  for (const page of pages) {
    console.log(`Publishing to page: ${page.pageId}`)

    try {
      // Validate access token
      if (!page.pageAccessToken) {
        throw new Error('Page access token is missing')
      }

      let result

      if (postData.mediaUrls && postData.mediaUrls.length > 0) {
        console.log('Posting with media...')

        // Handle different post types
        if (postData.postType === 'reel') {
          // Post as Reel
          result = await postWithMedia(page.pageId, page.pageAccessToken, {
            message: postData.message,
            mediaUrl: postData.mediaUrls[0],
            mediaType: 'reel',
            isReel: true,
            scheduled_publish_time: postData.scheduled_publish_time,
            published: postData.published
          })
        } else if (postData.mediaUrls.length > 1) {
          // Multiple media - use album/carousel
          result = await postMultipleMedia(page.pageId, page.pageAccessToken, {
            message: postData.message,
            mediaUrls: postData.mediaUrls,
            mediaType: postData.mediaType || 'photo',
            scheduled_publish_time: postData.scheduled_publish_time,
            published: postData.published
          })
        } else {
          // Single media post
          result = await postWithMedia(page.pageId, page.pageAccessToken, {
            message: postData.message,
            mediaUrl: postData.mediaUrls[0],
            mediaType: postData.mediaType || 'photo',
            scheduled_publish_time: postData.scheduled_publish_time,
            published: postData.published
          })
        }
      } else {
        console.log('Posting text-only...')
        // Text-only post
        result = await postToPage(page.pageId, page.pageAccessToken, {
          message: postData.message,
          link: postData.link,
          scheduled_publish_time: postData.scheduled_publish_time,
          published: postData.published
        })
      }

      console.log(`Post result for page ${page.pageId}:`, {
        success: result.success,
        hasData: !!result.data,
        error: result.error?.message
      })

      const pageResult = {
        pageId: page.pageId,
        success: result.success,
        data: result.data,
        error: result.error
      }

      results.push(pageResult)

      // Call progress callback
      if (onProgress) {
        onProgress(page.pageId, pageResult)
      }

      // Add delay between posts to avoid rate limiting
      if (pages.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

    } catch (error) {
      console.error(`Error posting to page ${page.pageId}:`, error)

      const pageResult = {
        pageId: page.pageId,
        success: false,
        data: null,
        error: handleFacebookError(error)
      }

      results.push(pageResult)

      if (onProgress) {
        onProgress(page.pageId, pageResult)
      }
    }
  }

  console.log('Batch posting completed:', {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  })

  return results
}

// Get page posts
export const getPagePosts = async (
  pageId: string,
  pageAccessToken: string,
  limit: number = 25
) => {
  initializeFacebookAPI(pageAccessToken)

  const page = new Page(pageId)
  const posts = await page.getPosts([
    'id',
    'message',
    'story',
    'created_time',
    'updated_time',
    'type',
    'status_type',
    'permalink_url',
    'picture',
    'full_picture'
  ], { limit })

  return posts
}

// Get post insights
export const getPostInsights = async (
  postId: string,
  pageAccessToken: string
) => {
  try {
    console.log(`Getting insights for post ${postId}`)

    // Use only basic metrics that are available for most posts
    const metrics = [
      'post_impressions',
      'post_impressions_unique',
      'post_engaged_users',
      'post_clicks'
    ].join(',')

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${postId}/insights?metric=${metrics}&access_token=${pageAccessToken}`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to get post insights')
    }

    const data = await response.json()

    // Transform insights data to a more usable format
    const insights: Record<string, number> = {}

    if (data.data) {
      data.data.forEach((metric: any) => {
        const value = metric.values?.[0]?.value || 0
        insights[metric.name] = typeof value === 'object' ?
          Object.values(value).reduce((sum: number, val: any) => sum + (val || 0), 0) :
          value
      })
    }

    return {
      success: true,
      insights,
      raw: data
    }
  } catch (error) {
    console.error('Error getting post insights:', error)
    return {
      success: false,
      insights: {},
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Get page insights (disabled for now due to API limitations)
export const getPageInsights = async (
  pageId: string,
  pageAccessToken: string,
  period: 'day' | 'week' | 'days_28' = 'days_28'
) => {
  try {
    console.log(`Getting insights for page ${pageId} (disabled)`)

    // Return mock data for now
    return {
      success: true,
      insights: {
        page_impressions: 0,
        page_impressions_unique: 0,
        page_engaged_users: 0,
        page_fans: 0
      },
      raw: { data: [] }
    }
  } catch (error) {
    console.error('Error getting page insights:', error)
    return {
      success: false,
      insights: {},
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Validate access token
export const validateAccessToken = async (accessToken: string) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/me?access_token=${accessToken}`
    )

    return response.ok
  } catch {
    return false
  }
}

// Edit Facebook post
export const editFacebookPost = async (
  postId: string,
  pageAccessToken: string,
  newMessage: string
): Promise<FacebookApiResponse> => {
  try {
    console.log(`Editing Facebook post ${postId}`)

    const url = `https://graph.facebook.com/v21.0/${postId}`

    const body = {
      message: newMessage,
      access_token: pageAccessToken
    }

    console.log('Editing post with data:', {
      postId,
      hasMessage: !!body.message
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    console.log('Facebook edit API response:', {
      status: response.status,
      ok: response.ok,
      result
    })

    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status}: ${JSON.stringify(result)}`)
    }

    // Facebook returns { success: true } for successful edits
    if (!result.success) {
      throw new Error('Facebook API did not confirm successful edit')
    }

    return {
      success: true,
      data: {
        id: postId,
        created_time: new Date().toISOString(),
        permalink_url: `https://www.facebook.com/${postId}`
      },
      error: null
    }
  } catch (error: unknown) {
    console.error(`Error editing Facebook post ${postId}:`, error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to edit post on Facebook'

    return {
      success: false,
      data: null,
      error: {
        code: 'EDIT_ERROR',
        message: errorMessage,
        type: 'EditException'
      }
    }
  }
}

// Delete Facebook post
export const deleteFacebookPost = async (
  postId: string,
  pageAccessToken: string
): Promise<FacebookApiResponse> => {
  try {
    console.log(`Deleting Facebook post ${postId}`)

    const url = `https://graph.facebook.com/v21.0/${postId}`

    const body = {
      access_token: pageAccessToken
    }

    console.log('Deleting post:', { postId })

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    console.log('Facebook delete API response:', {
      status: response.status,
      ok: response.ok,
      result
    })

    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status}: ${JSON.stringify(result)}`)
    }

    // Facebook returns { success: true } for successful deletes
    if (!result.success) {
      throw new Error('Facebook API did not confirm successful deletion')
    }

    return {
      success: true,
      data: {
        id: postId,
        created_time: new Date().toISOString(),
        permalink_url: `https://www.facebook.com/${postId}`
      },
      error: null
    }
  } catch (error: unknown) {
    console.error(`Error deleting Facebook post ${postId}:`, error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to delete post on Facebook'

    return {
      success: false,
      data: null,
      error: {
        code: 'DELETE_ERROR',
        message: errorMessage,
        type: 'DeleteException'
      }
    }
  }
}

// Create comment on Facebook post
export const createFacebookComment = async (
  postId: string,
  pageAccessToken: string,
  message: string
): Promise<FacebookApiResponse> => {
  try {
    console.log(`Creating comment on Facebook post ${postId}`)

    const url = `https://graph.facebook.com/v21.0/${postId}/comments`

    const body = {
      message: message,
      access_token: pageAccessToken
    }

    console.log('Creating comment with data:', {
      postId,
      hasMessage: !!body.message,
      messageLength: message.length
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    console.log('Facebook comment API response:', {
      status: response.status,
      ok: response.ok,
      result
    })

    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status}: ${JSON.stringify(result)}`)
    }

    if (!result.id) {
      throw new Error('Facebook API did not return a comment ID')
    }

    return {
      success: true,
      data: {
        id: result.id,
        created_time: new Date().toISOString()
      },
      error: null
    }

  } catch (error) {
    console.error('Error creating Facebook comment:', error)
    return {
      success: false,
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error creating comment',
        code: 'COMMENT_CREATE_ERROR',
        type: 'OAuthException'
      }
    }
  }
}

// Batch create comments on multiple Facebook posts
export const batchCreateFacebookComments = async (
  posts: Array<{
    postId: string
    pageAccessToken: string
    pageId: string
  }>,
  message: string,
  onProgress?: (postId: string, result: FacebookApiResponse) => void
): Promise<FacebookApiResponse[]> => {
  console.log(`Creating comments on ${posts.length} Facebook posts`)

  const results: FacebookApiResponse[] = []

  for (const post of posts) {
    try {
      console.log(`Creating comment on post ${post.postId} for page ${post.pageId}`)

      const result = await createFacebookComment(
        post.postId,
        post.pageAccessToken,
        message
      )

      results.push(result)

      // Call progress callback if provided
      if (onProgress) {
        onProgress(post.postId, result)
      }

      // Add small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))

    } catch (error) {
      console.error(`Error creating comment on post ${post.postId}:`, error)

      const errorResult: FacebookApiResponse = {
        success: false,
        data: null,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
          code: 'COMMENT_CREATE_ERROR',
          type: 'OAuthException'
        }
      }

      results.push(errorResult)

      if (onProgress) {
        onProgress(post.postId, errorResult)
      }
    }
  }

  console.log('Batch comment creation completed:', {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  })

  return results
}

// Get Facebook post details
export const getFacebookPost = async (
  postId: string,
  pageAccessToken: string
): Promise<FacebookApiResponse & { post?: any }> => {
  try {
    console.log(`Getting Facebook post ${postId}`)

    const url = `https://graph.facebook.com/v21.0/${postId}?fields=message,created_time,updated_time,permalink_url&access_token=${pageAccessToken}`

    const response = await fetch(url)
    const result = await response.json()

    console.log('Facebook get post API response:', {
      status: response.status,
      ok: response.ok,
      result
    })

    if (!response.ok) {
      throw new Error(result.error?.message || `HTTP ${response.status}: ${JSON.stringify(result)}`)
    }

    if (!result.id) {
      throw new Error('Facebook API did not return post data')
    }

    return {
      success: true,
      data: {
        id: result.id,
        created_time: result.created_time,
        permalink_url: result.permalink_url
      },
      post: result,
      error: null
    }
  } catch (error: unknown) {
    console.error(`Error getting Facebook post ${postId}:`, error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to get post from Facebook'

    return {
      success: false,
      data: null,
      post: null,
      error: {
        code: 'GET_POST_ERROR',
        message: errorMessage,
        type: 'GetPostException'
      }
    }
  }
}

// Batch edit posts on multiple pages
export const batchEditFacebookPosts = async (
  posts: Array<{
    postId: string
    pageAccessToken: string
    pageId: string
  }>,
  newMessage: string,
  onProgress?: (postId: string, result: BatchPostResult) => void
): Promise<BatchPostResult[]> => {
  console.log('Starting batch edit of Facebook posts:', {
    postsCount: posts.length,
    newMessage: newMessage.substring(0, 50) + '...'
  })

  const results: BatchPostResult[] = []

  for (const post of posts) {
    console.log(`Editing Facebook post: ${post.postId}`)

    try {
      const result = await editFacebookPost(post.postId, post.pageAccessToken, newMessage)

      console.log(`Edit result for post ${post.postId}:`, {
        success: result.success,
        error: result.error?.message
      })

      const postResult = {
        pageId: post.pageId,
        success: result.success,
        data: result.data,
        error: result.error
      }

      results.push(postResult)

      if (onProgress) {
        onProgress(post.postId, postResult)
      }

      // Add delay between edits to avoid rate limiting
      if (posts.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

    } catch (error) {
      console.error(`Error editing Facebook post ${post.postId}:`, error)

      const postResult = {
        pageId: post.pageId,
        success: false,
        data: null,
        error: handleFacebookError(error)
      }

      results.push(postResult)

      if (onProgress) {
        onProgress(post.postId, postResult)
      }
    }
  }

  console.log('Batch edit completed:', {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  })

  return results
}

// Single post publishing function for queue system
export const publishPostToFacebook = async ({
  pageId,
  accessToken,
  content,
  mediaUrls = [],
  firstComment
}: {
  pageId: string
  accessToken: string
  content: string
  mediaUrls?: string[]
  firstComment?: string
}): Promise<FacebookApiResponse> => {
  try {
    console.log(`Publishing post to Facebook page ${pageId}`)

    let result: FacebookApiResponse

    // Determine if we have media
    if (mediaUrls && mediaUrls.length > 0) {
      // Post with media
      result = await postWithMedia(pageId, accessToken, {
        message: content,
        mediaUrl: mediaUrls[0], // Use first media
        mediaType: 'photo', // Default to photo, could be enhanced
        published: true
      })
    } else {
      // Text-only post
      result = await postToPage(pageId, accessToken, {
        message: content,
        published: true
      })
    }

    // Add first comment if provided and post was successful
    if (result.success && result.data?.id && firstComment) {
      try {
        await createFacebookComment(result.data.id, accessToken, firstComment)
      } catch (commentError) {
        console.error('Error adding first comment:', commentError)
        // Don't fail the whole post for comment error
      }
    }

    return result
  } catch (error) {
    console.error(`Error publishing post to Facebook page ${pageId}:`, error)
    return {
      success: false,
      data: null,
      error: handleFacebookError(error)
    }
  }
}

// Batch delete posts on multiple pages
export const batchDeleteFacebookPosts = async (
  posts: Array<{
    postId: string
    pageAccessToken: string
    pageId: string
  }>,
  onProgress?: (postId: string, result: BatchPostResult) => void
): Promise<BatchPostResult[]> => {
  console.log('Starting batch delete of Facebook posts:', {
    postsCount: posts.length
  })

  const results: BatchPostResult[] = []

  for (const post of posts) {
    console.log(`Deleting Facebook post: ${post.postId}`)

    try {
      const result = await deleteFacebookPost(post.postId, post.pageAccessToken)

      console.log(`Delete result for post ${post.postId}:`, {
        success: result.success,
        error: result.error?.message
      })

      const postResult = {
        pageId: post.pageId,
        success: result.success,
        data: result.data,
        error: result.error
      }

      results.push(postResult)

      if (onProgress) {
        onProgress(post.postId, postResult)
      }

      // Add delay between deletes to avoid rate limiting
      if (posts.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

    } catch (error) {
      console.error(`Error deleting Facebook post ${post.postId}:`, error)

      const postResult = {
        pageId: post.pageId,
        success: false,
        data: null,
        error: handleFacebookError(error)
      }

      results.push(postResult)

      if (onProgress) {
        onProgress(post.postId, postResult)
      }
    }
  }

  console.log('Batch delete completed:', {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length
  })

  return results
}

// Facebook API Error Handler
export const handleFacebookError = (error: unknown): FacebookError => {
  // Handle Facebook API errors with response structure
  if (error && typeof error === 'object' && 'response' in error) {
    const response = error.response as { data?: { error?: FacebookError } }
    if (response.data?.error) {
      const fbError = response.data.error
      return {
        code: fbError.code,
        message: fbError.message,
        type: fbError.type,
        fbtrace_id: fbError.fbtrace_id
      }
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      type: 'OAuthException'
    }
  }

  // Handle unknown error types
  return {
    code: 'UNKNOWN_ERROR',
    message: 'Unknown Facebook API error',
    type: 'OAuthException'
  }
}
