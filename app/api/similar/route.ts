// app/api/similar/route.ts
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  const res = await fetch(
    `http://apimodapk.soon.it/v0/similar.php?id=${encodeURIComponent(id)}`,
    { cache: "no-store" }
  )

  const data = await res.json()
  return NextResponse.json(data)
}
