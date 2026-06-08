/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL!

  try {
    const update = await req.json()

    // Handle /start command
    if (update.message?.text === '/start') {
      await sendTelegramMessage(
        update.message.chat.id,
        '🎮 *Welcome to Points Game!*\n\n' +
          'Collect points and compete with friends!\n\n' +
          '🎁 Daily rewards\n' +
          '💎 Buy points with Stars (real payments!)\n' +
          '💸 Test refunds with `/refund`\n\n' +
          'Tap the button below to play!',
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[{ text: '🎮 Play Game', web_app: { url: APP_URL } }]],
          },
        }
      )
    }

    // Handle /help command
    if (update.message?.text === '/help') {
      await sendTelegramMessage(
        update.message.chat.id,
        '❓ *How to Play*\n\n' +
          '1️⃣ Open the game from the button\n' +
          '2️⃣ Claim daily points\n' +
          '3️⃣ Buy more points with Stars\n' +
          '4️⃣ Test refunds with receipt ID\n\n' +
          '*Commands:*\n' +
          '/start - Start the game\n' +
          '/help - Show this help\n' +
          '/refund RECEIPT\\_ID - Refund a payment', // Escaped underscore
        { parse_mode: 'Markdown' }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

async function sendTelegramMessage(chatId: number, text: string, extra?: any) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...extra,
    }),
  })

  const data = await response.json()

  if (!data.ok) {
    console.error('Telegram API error:', data)
  }

  return data
}
