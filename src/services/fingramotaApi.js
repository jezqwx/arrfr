const fallbackNews = [
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-1.svg",
  },
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-2.svg",
  },
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-3.svg",
  },
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-1.svg",
  },
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-2.svg",
  },
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-3.svg",
  },
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-1.svg",
  },
  {
    title: "Банкротство физических лиц в Казахстане: как работает и кому это нужно",
    date: "09.04.2026",
    image: "/news/news-2.svg",
  },
];


const fallbackPodcasts = [
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
];

export async function getHomeContent() {
  try {
    const response = await fetch("/api/home-content");

    if (!response.ok) {
      throw new Error("API is not available");
    }

    const data = await response.json();

    return {
      news: data.news?.length ? data.news : fallbackNews,
      podcasts: data.podcasts?.length ? data.podcasts : fallbackPodcasts,
    };
  } catch {
    return {
      news: fallbackNews,
      podcasts: fallbackPodcasts,
    };
  }
}