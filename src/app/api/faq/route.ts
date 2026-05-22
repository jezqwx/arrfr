import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://fingramota.kz/ru/faq", {
      next: { revalidate: 3600 },
    });
    const html = await res.text();
    return NextResponse.json({ faqs: [], html: html.slice(0, 500) });
  } catch {
    return NextResponse.json({ faqs: [], error: "Сайт недоступен" });
  }
}