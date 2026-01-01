// app/api/similar/route.ts
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")
  const page = searchParams.get("page")
  const limit = searchParams.get("limit")

  if (!type) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  const res = await fetch(
    `http://apimodapk.soon.it/v0/filter.php?type=${encodeURIComponent(type)}&page=${page}&limit=${limit}`,
    { cache: "no-store" }
  )

  const data = await res.json()
  return NextResponse.json(data)
}
