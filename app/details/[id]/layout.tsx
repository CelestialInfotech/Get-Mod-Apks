// app/details/[id]/layout.tsx
import type { Metadata } from "next"

type Props = {
    params: Promise<{ id: string }>

}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

    const { id } = await params
    console.log("Server Id:", id)

  const res = await fetch(
    `http://apimodapk.soon.it/v0/apkdetail.php?id=${id}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    return {
      title: "App Not Found – GetModApks",
      description: "The requested app could not be found."
    }
  }

  const json = await res.json()
  const data = json?.data

  if (!data) {
    return {
      title: "App Not Found – GetModApks",
      description: "The requested app could not be found."
    }
  }

  const title = `${data.title} MOD APK ${data.version} Download`
  const description =
    `${data.title} MOD APK ${data.version}. ${data.mod_info}. Free download (${data.size}).`
      .slice(0, 160)

  return {
    title,
    description
  }
}

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
