// src/app/api/draft-mode/disable/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirectTo') || '/'
  redirect(redirectTo)
}
