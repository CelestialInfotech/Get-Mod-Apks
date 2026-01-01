// app/api/similar/route.ts
import { NextResponse } from "next/server"

export async function GET(req: Request) {


  const res = await fetch(
    `http://apimodapk.soon.it/v0/banner.php`,
    { cache: "no-store" }
  )

  const data = await res.json()
  return NextResponse.json(data)
}
