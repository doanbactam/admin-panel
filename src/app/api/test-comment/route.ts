import { NextRequest, NextResponse } from 'next/server'
import { createFacebookComment } from '@/lib/facebook'

// POST /api/test-comment - Test comment creation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, pageAccessToken, message } = body

    if (!postId || !pageAccessToken || !message) {
      return NextResponse.json({ 
        error: 'Missing required fields: postId, pageAccessToken, message' 
      }, { status: 400 })
    }

    console.log('Testing comment creation:', {
      postId,
      hasToken: !!pageAccessToken,
      messageLength: message.length
    })

    const result = await createFacebookComment(postId, pageAccessToken, message)

    return NextResponse.json({
      success: result.success,
      data: result.data,
      error: result.error
    })

  } catch (error) {
    console.error('Error testing comment creation:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
