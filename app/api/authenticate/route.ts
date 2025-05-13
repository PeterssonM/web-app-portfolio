import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const springResponse = await fetch(process.env.SPRING_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })

    const data = await springResponse.json()

    if (!springResponse.ok) {
        return NextResponse.json(
        { 
          success: false,
          message: 'Authentication failed'
        },
        {
          status: springResponse.status
        }
      )
    }
    
    const setCookie = springResponse.headers.get('set-cookie')

    const responseToForward = NextResponse.json(
      {
        success: false,
        message: 'Authentication succeeded'
      }, 
      { 
        status: 200 
      }
    )

    if (setCookie) {
      responseToForward.headers.set('Set-Cookie', setCookie)
    }

    return responseToForward
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { 
        status: 500 
      }
    )
  }
}
