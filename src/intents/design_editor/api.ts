// src/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function fetchVerse(bibleId: number, usfm: string) {
  const res = await fetch(
    `${BASE_URL}/api/verse?bibleId=${bibleId}&usfm=${encodeURIComponent(usfm)}`,
  );
  if (!res.ok) throw new Error("Failed to fetch verse");
  return res.json() as Promise<{
    content: string;
    copyright: string;
    usfm: string;
    bibleId: number;
  }>;
}

// export async function fetchBibles() {
//   const res = await fetch(`${BASE_URL}/api/bibles`)
//   if (!res.ok) throw new Error("Failed to fetch Bible versions")
//   return res.json() as Promise<{ versions: Array<{ id: number; local_title: string }> }>
// }
