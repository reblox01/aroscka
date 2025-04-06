import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return new Response('Invalid signature', { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }

      const session = event.data.object as Stripe.Checkout.Session

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }

      const billingAddress = session.customer_details!.address
      const shippingAddress = session.shipping_details!.address

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
        },
        include: {
          shippingAddress: true,
        },
      })

      if (resend && updatedOrder.shippingAddress) {
        await resend.emails.send({
          from: 'Aroscka <mirocairo15@gmail.com>',
          to: session.customer_details!.email!,
          subject: 'Your order has been received',
          react: OrderReceivedEmail({
            shippingAddress: updatedOrder.shippingAddress,
            orderId: updatedOrder.id,
            orderDate: updatedOrder.createdAt.toLocaleDateString(),
          }),
        })
      }
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json(
      { message: 'Webhook error: ' + (err instanceof Error ? err.message : 'Unknown error'), ok: false },
      { status: 400 }
    )
  }
}
