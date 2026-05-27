import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') || 'en'
  const file = lang === 'cs' ? 'deck.html' : 'deck-en.html'
  const html = readFileSync(join(process.cwd(), file), 'utf-8')
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
