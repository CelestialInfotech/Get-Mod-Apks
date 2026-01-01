// app/api/similar/route.ts
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")
  const page = searchParams.get("page")
  const limit = searchParams.get("limit")

  if (!q) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  const res = await fetch(
    `http://apimodapk.soon.it/v0/search.php?q=${q}&page=${page}&limit=${limit}`,
    { cache: "no-store" }
  )

  const data = await res.json()
  return NextResponse.json(data)
}
