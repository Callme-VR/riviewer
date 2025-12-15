import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Check if we're in a static generation context
    let reqHeaders;
    try {
      reqHeaders = await headers();
    } catch (error) {
      // If headers() fails during static generation, return empty session
      return NextResponse.json(null);
    }
    
    const session = await auth.api.getSession({
      headers: reqHeaders
    })
    return NextResponse.json(session)
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    )
  }
}