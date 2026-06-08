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
        '🛡️ *Welcome to Root VPN!*\n\n' +
          'Secure your internet connection, bypass restrictions, and browse anonymously.\n\n' +
          '🌍 Global server access\n' +
          '⚡ Blazing fast speeds\n' +
          '🔒 Strict no-logs policy\n' +
          '💳 Pay securely with Telegram Stars\n\n' +
          'Tap the button below to view our plans and get connected!',
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[{ text: '🛒 Open Store', web_app: { url: APP_URL } }]],
          },
        }
      )
    }

    // Handle /help command
    if (update.message?.text === '/help') {
      await sendTelegramMessage(
        update.message.chat.id,
        '❓ *Root VPN Help*\n\n' +
          '*How to get started:*\n' +
          '1️⃣ Open the store via the main menu\n' +
          '2️⃣ Choose a subscription plan\n' +
          '3️⃣ Receive your VPN configuration keys\n' +
          '4️⃣ Connect and browse securely!\n\n' +
          '*Commands:*\n' +
          '/start - Open the main menu\n' +
          '/help - Show this help message\n' +
          '/refund RECEIPT\\_ID - Request a refund for a recent purchase',
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
