import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://otakudesu.best';
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
};

async function fetchHtml(url: string): Promise<cheerio.CheerioAPI> {
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      timeout: 10000,
    });
    return cheerio.load(response.data as string);
  } catch {
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

function extractSlug(url: string): string {
  const matches = url.match(/\/(?:anime|episode)\/([^/]+)\/?/);
  return matches ? matches[1] : '';
}

function extractGenreSlug(url: string): string {
  const matches = url.match(/\/genres\/([^/]+)\/?/);
  return matches ? matches[1] : '';
}

function parsePagination(
  $: cheerio.CheerioAPI,
  itemsPerPage: number = 50,
) {
  const paginationEl = $('.pagenavix, .pagination');
  const currentPageEl = paginationEl.find('.page-numbers.current');
  const currentPage = parseInt(currentPageEl.text()) || 1;

  const allPages = paginationEl
    .find('.page-numbers:not(.prev):not(.next)')
    .map((_, el) => parseInt($(el).text()) || 0)
    .get()
    .filter((n: number) => n > 0);

  const totalPages = allPages.length > 0 ? Math.max(...allPages) : 1;
  const totalItems = totalPages > 0 ? totalPages * itemsPerPage : null;

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };
}

export async function getHome() {
  const $ = await fetchHtml(BASE_URL);

  const ongoing: any[] = [];
  const complete: any[] = [];

  $('.venz ul')
    .first()
    .find('li')
    .each((_, el) => {
      const $el = $(el);
      const title = $el.find('.jdlflm').text().trim();
      const link = $el.find('.thumb a').attr('href') || '';
      const poster = $el.find('.thumbz img').attr('src') || '';
      const episode = $el.find('.epz').text().replace('Episode', '').trim();
      const releaseDay = $el.find('.epztipe').text().trim();
      const releaseDate = $el.find('.newnime').text().trim();

      if (title && link) {
        ongoing.push({
          title,
          slug: extractSlug(link),
          poster,
          episode,
          releaseDay,
          releaseDate,
        });
      }
    });

  $('.venz ul')
    .last()
    .find('li')
    .each((_, el) => {
      const $el = $(el);
      const title = $el.find('.jdlflm').text().trim();
      const link = $el.find('.thumb a').attr('href') || '';
      const poster = $el.find('.thumbz img').attr('src') || '';
      const totalEpisode = $el.find('.epz').text().trim();
      const rating = $el.find('.epztipe').text().trim();
      const releaseDate = $el.find('.newnime').text().trim();

      if (title && link) {
        complete.push({
          title,
          slug: extractSlug(link),
          poster,
          totalEpisode,
          rating,
          releaseDate,
        });
      }
    });

  return { ongoing, complete };
}

export async function getOngoing(page: number = 1) {
  const url =
    page === 1
      ? `${BASE_URL}/ongoing-anime/`
      : `${BASE_URL}/ongoing-anime/page/${page}/`;
  const $ = await fetchHtml(url);

  const anime: any[] = [];

  $('.venz ul li, .rapi .detpost').each((_, el) => {
    const $el = $(el);
    const title = $el.find('.jdlflm, .judul-anime').text().trim();
    const link = $el.find('.thumb a, a').first().attr('href') || '';
    const poster =
      $el.find('.thumbz img, img').first().attr('src') ||
      $el.find('.thumbz img, img').first().attr('data-src') ||
      '';
    const episode = $el.find('.epz').text().replace('Episode', '').trim();
    const releaseDay = $el.find('.epztipe').text().trim();
    const releaseDate = $el.find('.newnime').text().trim();

    if (title && link && link.includes('/anime/')) {
      anime.push({
        title,
        slug: extractSlug(link),
        poster,
        episode,
        releaseDay,
        releaseDate,
      });
    }
  });

  const pagination = parsePagination($);

  return { anime, pagination };
}

export async function getComplete(page: number = 1) {
  const url =
    page === 1
      ? `${BASE_URL}/complete-anime/`
      : `${BASE_URL}/complete-anime/page/${page}/`;
  const $ = await fetchHtml(url);

  const anime: any[] = [];

  $('.venz ul li, .rapi .detpost').each((_, el) => {
    const $el = $(el);
    const title = $el.find('.jdlflm, .judul-anime').text().trim();
    const link = $el.find('.thumb a, a').first().attr('href') || '';
    const poster =
      $el.find('.thumbz img, img').first().attr('src') ||
      $el.find('.thumbz img, img').first().attr('data-src') ||
      '';
    const totalEpisode = $el.find('.epz').text().trim();
    const rating = $el.find('.epztipe').text().trim();
    const releaseDate = $el.find('.newnime').text().trim();

    if (title && link && link.includes('/anime/')) {
      anime.push({
        title,
        slug: extractSlug(link),
        poster,
        totalEpisode,
        rating,
        releaseDate,
      });
    }
  });

  const pagination = parsePagination($);

  return { anime, pagination };
}

export async function getAnimeList() {
  const $ = await fetchHtml(`${BASE_URL}/anime-list/`);

  const list: Record<string, any[]> = {};

  $('.bariskelom').each((_, el) => {
    const $el = $(el);
    const letter =
      $el.find('.barispenz a').text().trim().toUpperCase() || '#';

    if (!list[letter]) {
      list[letter] = [];
    }

    $el.find('.jdlbar ul li a').each((_, linkEl) => {
      const $link = $(linkEl);
      const title = $link.text().trim();
      const href = $link.attr('href') || '';

      if (title && href) {
        list[letter].push({
          title,
          slug: extractSlug(href),
        });
      }
    });
  });

  return list;
}

export async function getAnimeDetail(slug: string) {
  const $ = await fetchHtml(`${BASE_URL}/anime/${slug}/`);

  const title = $('.jdlrx h1')
    .text()
    .trim()
    .replace(/\s*\(Episode\s*\d+\s*[-–]\s*\d+\)\s*/i, '')
    .replace(/(\s*(Subtitle Indonesia|Sub Indo))+$/i, '')
    .trim();
  const poster = $('.fotoanime img').attr('src') || '';

  if (!title) {
    throw new Error(`Anime dengan slug '${slug}' tidak ditemukan`);
  }

  const infoMap: Record<string, string> = {};
  $('.infozingle p').each((_, el) => {
    const text = $(el).text();
    const [key, ...valueParts] = text.split(':');
    if (key && valueParts.length) {
      infoMap[key.trim().toLowerCase()] = valueParts.join(':').trim();
    }
  });

  const genres: string[] = [];
  $('.infozingle p span a[href*="/genres/"]').each((_, el) => {
    genres.push($(el).text().trim());
  });

  const synopsis = $('.sinopc').text().trim();

  const episodes: any[] = [];
  $('.episodelist ul li').each((_, el) => {
    const $el = $(el);
    const link = $el.find('a').attr('href') || '';
    const epTitle = $el.find('a').text().trim();
    const date = $el.find('.zeebr').text().trim();

    const epMatch = epTitle.match(/Episode\s*(\d+)/i);
    const episode = epMatch ? epMatch[1] : epTitle;

    if (link.includes('/episode/')) {
      episodes.push({
        episode,
        slug: extractSlug(link),
        date,
      });
    }
  });

  return {
    title,
    japanese: infoMap['japanese'] || '',
    score: infoMap['skor'] || '',
    producer: infoMap['produser'] || '',
    type: infoMap['tipe'] || '',
    status: infoMap['status'] || '',
    totalEpisode: infoMap['total episode'] || '',
    duration: infoMap['durasi'] || '',
    releaseDate: infoMap['tanggal rilis'] || '',
    studio: infoMap['studio'] || '',
    genres,
    synopsis,
    poster,
    episodes,
  };
}

export async function getEpisodeDetail(slug: string) {
  const $ = await fetchHtml(`${BASE_URL}/episode/${slug}/`);

  const title = $('.posttl').text().trim();

  if (!title) {
    throw new Error(`Episode dengan slug '${slug}' tidak ditemukan`);
  }

  const animeLink =
    $('.flir a[href*="/anime/"]').attr('href') ||
    $('.flir a:contains("See All")').attr('href') ||
    '';
  const animeTitle = title.replace(/\s*Episode\s*\d+.*$/i, '').trim();

  const prevLink = $('.flir a:contains("Previous")').attr('href') || '';
  const nextLink = $('.flir a:contains("Next")').attr('href') || '';

  const streamingUrl = $('#embed_holder iframe').attr('src') || '';

  const streamingServers: any[] = [];
  const qualityMap: Record<string, any[]> = {};

  $('.mirrorstream ul').each((_, ulEl) => {
    const $ul = $(ulEl);
    const className = $ul.attr('class') || '';

    const qualityMatch = className.match(/m(\d+p)/);
    const quality = qualityMatch ? qualityMatch[1] : 'unknown';

    if (!qualityMap[quality]) {
      qualityMap[quality] = [];
    }

    $ul.find('li a[data-content]').each((_, linkEl) => {
      const $link = $(linkEl);
      const provider = $link.text().trim();
      const dataContent = $link.attr('data-content') || '';
      const isDefault = $link.attr('data-default') === 'true';

      if (provider && dataContent) {
        qualityMap[quality].push({
          provider,
          dataContent,
          isDefault: isDefault || undefined,
        });
      }
    });
  });

  for (const [quality, servers] of Object.entries(qualityMap)) {
    if (servers.length > 0) {
      streamingServers.push({ quality, servers });
    }
  }

  const downloadLinks: any[] = [];

  $('.download ul li').each((_, el) => {
    const $el = $(el);
    const resolution = $el.find('strong').text().trim();
    const links: { provider: string; url: string }[] = [];

    $el.find('a').each((_, linkEl) => {
      const $link = $(linkEl);
      const provider = $link.text().trim();
      const url = $link.attr('href') || '';

      if (provider && url) {
        links.push({ provider, url });
      }
    });

    if (resolution && links.length > 0) {
      downloadLinks.push({ resolution, links });
    }
  });

  return {
    title,
    anime: {
      title: animeTitle,
      slug: extractSlug(animeLink),
    },
    prevEpisode: prevLink ? extractSlug(prevLink) : undefined,
    nextEpisode: nextLink ? extractSlug(nextLink) : undefined,
    streamingUrl: streamingUrl || undefined,
    streamingServers,
    downloadLinks,
  };
}

export async function getGenres() {
  const $ = await fetchHtml(`${BASE_URL}/genre-list/`);

  const genres: any[] = [];

  $('.genres li a').each((_, el) => {
    const $el = $(el);
    const name = $el.text().trim();
    const href = $el.attr('href') || '';

    if (name && href) {
      genres.push({
        name,
        slug: extractGenreSlug(href),
      });
    }
  });

  return genres;
}

export async function getAnimeByGenre(genre: string, page: number = 1) {
  const url =
    page === 1
      ? `${BASE_URL}/genres/${genre}/`
      : `${BASE_URL}/genres/${genre}/page/${page}/`;
  const $ = await fetchHtml(url);

  const anime: any[] = [];

  $('.col-anime, .col-md-4, .venz li, .page .col-6').each((_, el) => {
    const $el = $(el);
    const title = $el
      .find('.col-anime-title a, .jdlflm, .judul-anime, h3, h4')
      .first()
      .text()
      .trim();
    const link = $el.find('a').first().attr('href') || '';
    const poster =
      $el.find('img').first().attr('src') ||
      $el.find('img').first().attr('data-src') ||
      '';
    const rating = $el.find('.col-anime-rating, .epztipe').text().trim();

    if (title && link && link.includes('/anime/')) {
      anime.push({
        title,
        slug: extractSlug(link),
        poster,
        rating,
      });
    }
  });

  const pagination = parsePagination($);

  return {
    genre,
    anime,
    pagination,
  };
}

export async function getSchedule() {
  const $ = await fetchHtml(`${BASE_URL}/jadwal-rilis/`);

  const schedule: any[] = [];
  const days = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ];

  $('.kglist321').each((index, el) => {
    const $el = $(el);
    const day =
      $el.find('h2').text().trim() || days[index] || `Day ${index + 1}`;
    const animeList: { title: string; slug: string }[] = [];

    $el.find('ul li a').each((_, linkEl) => {
      const $link = $(linkEl);
      const title = $link.text().trim();
      const href = $link.attr('href') || '';

      if (title && href) {
        animeList.push({
          title,
          slug: extractSlug(href),
        });
      }
    });

    if (animeList.length > 0) {
      schedule.push({
        day,
        anime: animeList,
      });
    }
  });

  return schedule;
}

export async function search(query: string) {
  const $ = await fetchHtml(
    `${BASE_URL}/?s=${encodeURIComponent(query)}&post_type=anime`,
  );

  const anime: any[] = [];

  $('.chivsrc li').each((_, el) => {
    const $el = $(el);
    const title = $el.find('h2 a').text().trim();
    const link = $el.find('h2 a').attr('href') || '';
    const poster = $el.find('img').attr('src') || '';

    let rating = '';
    $el.find('.set').each((__, setEl) => {
      const text = $(setEl).text();
      if (text.includes('Rating')) {
        rating = text.replace('Rating :', '').trim();
      }
    });

    if (title && link && link.includes('/anime/')) {
      anime.push({
        title,
        slug: extractSlug(link),
        poster,
        rating: rating || undefined,
      });
    }
  });

  return anime;
}

export async function resolveStreamingUrl(dataContent: string) {
  try {
    const decoded = Buffer.from(dataContent, 'base64').toString('utf-8');
    const params: any = JSON.parse(decoded);

    const nonceResponse = await axios.post(
      `${BASE_URL}/wp-admin/admin-ajax.php`,
      new URLSearchParams({
        action: 'aa1208d27f29ca340c92c66d1926f13f',
      }),
      {
        headers: {
          ...HEADERS,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,
      },
    );

    const nonce = nonceResponse.data?.data;

    if (!nonce) {
      throw new Error('Failed to get nonce for streaming');
    }

    const playerResponse = await axios.post(
      `${BASE_URL}/wp-admin/admin-ajax.php`,
      new URLSearchParams({
        action: '2a3505c93b0035d3f455df82bf976b84',
        nonce: nonce,
        id: params.id?.toString() || '',
        i: params.i?.toString() || '',
        q: params.q || '',
      }),
      {
        headers: {
          ...HEADERS,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,
      },
    );

    const encodedHtml = playerResponse.data?.data;

    if (!encodedHtml) {
      throw new Error('Failed to get streaming player');
    }

    const html = Buffer.from(encodedHtml, 'base64').toString('utf-8');

    const iframeMatch = html.match(/src="([^"]+)"/);
    const url = iframeMatch ? iframeMatch[1] : '';

    return {
      url,
      html,
    };
  } catch (error) {
    throw new Error('Failed to resolve streaming URL');
  }
}
