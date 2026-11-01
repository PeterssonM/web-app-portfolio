import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const to = process.env.EMAIL_TO

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body ?? {}

    if (
      typeof name !== 'string' || name.length < 1 || name.length > 100 ||
      typeof email !== 'string' || email.length > 200 || !EMAIL_REGEX.test(email) ||
      typeof message !== 'string' || message.length < 1 || message.length > 5000
    ) {
      return Response.json(
        { success: false, message: 'Invalid input' },
        { status: 400 }
      )
    }

    const safeName = name.replace(/[\r\n]+/g, ' ').trim()

    const { error } = await resend.emails.send({
      from: 'noreply@maximilianpetersson.com',
      to: to!,
      subject: `New message from ${safeName}`,
      replyTo: email,
      text: `${message}\n\n${email}`,
    })

    if (error) {
      return Response.json(
        { success: false, message: 'Failed to send email' },
        { status: 500 }
      )
    }

    return Response.json(
      { success: true, message: 'Email successfully sent' },
      { status: 200 }
    )
  } catch {
    return Response.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    )
  }
}