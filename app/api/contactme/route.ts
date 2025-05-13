import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const to = process.env.EMAIL_TO

export async function POST(req: Request) {

  const body = await req.json()
  const { name, email, message } = body

  try {
    const data = await resend.emails.send({
      from: 'noreply@maximilianpetersson.com',
      to: to!,
      subject: `New message from ${name}`,
      replyTo: email,
      text: message + "\n" + email,
    })

    return Response.json(
      {
        success: true,
        message: 'Email successfully sent'
      },
      { 
        status: 200
      }
    )

  } catch (error) {
      return Response.json(
        { 
          success: false, 
          message: 'Failed to send email' 
        },
        { 
          status: 500 
        }
      )
  }
}
