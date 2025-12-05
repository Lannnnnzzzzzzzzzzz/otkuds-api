"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtakudesuService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
let OtakudesuService = class OtakudesuService {
    baseUrl = 'https://otakudesu.best';
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    };
    async fetchHtml(url) {
        try {
            const response = await axios_1.default.get(url, {
                headers: this.headers,
                timeout: 10000,
            });
            return cheerio.load(response.data);
        }
        catch {
            throw new common_1.HttpException(`Failed to fetch data from ${url}`, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    extractSlug(url) {
        const matches = url.match(/\/(?:anime|episode)\/([^/]+)\/?/);
        return matches ? matches[1] : '';
    }
    extractGenreSlug(url) {
        const matches = url.match(/\/genres\/([^/]+)\/?/);
        return matches ? matches[1] : '';
    }
    parsePagination($, itemsPerPage = 50) {
        const paginationEl = $('.pagenavix, .pagination');
        const currentPageEl = paginationEl.find('.page-numbers.current');
        const currentPage = parseInt(currentPageEl.text()) || 1;
        const allPages = paginationEl
            .find('.page-numbers:not(.prev):not(.next)')
            .map((_, el) => parseInt($(el).text()) || 0)
            .get()
            .filter((n) => n > 0);
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
    async getHome() {
        const $ = await this.fetchHtml(this.baseUrl);
        const ongoing = [];
        const complete = [];
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
                    slug: this.extractSlug(link),
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
                    slug: this.extractSlug(link),
                    poster,
                    totalEpisode,
                    rating,
                    releaseDate,
                });
            }
        });
        return { ongoing, complete };
    }
    async getOngoing(page = 1) {
        const url = page === 1
            ? `${this.baseUrl}/ongoing-anime/`
            : `${this.baseUrl}/ongoing-anime/page/${page}/`;
        const $ = await this.fetchHtml(url);
        const anime = [];
        $('.venz ul li, .rapi .detpost').each((_, el) => {
            const $el = $(el);
            const title = $el.find('.jdlflm, .judul-anime').text().trim();
            const link = $el.find('.thumb a, a').first().attr('href') || '';
            const poster = $el.find('.thumbz img, img').first().attr('src') ||
                $el.find('.thumbz img, img').first().attr('data-src') ||
                '';
            const episode = $el.find('.epz').text().replace('Episode', '').trim();
            const releaseDay = $el.find('.epztipe').text().trim();
            const releaseDate = $el.find('.newnime').text().trim();
            if (title && link && link.includes('/anime/')) {
                anime.push({
                    title,
                    slug: this.extractSlug(link),
                    poster,
                    episode,
                    releaseDay,
                    releaseDate,
                });
            }
        });
        const pagination = this.parsePagination($);
        return { anime, pagination };
    }
    async getComplete(page = 1) {
        const url = page === 1
            ? `${this.baseUrl}/complete-anime/`
            : `${this.baseUrl}/complete-anime/page/${page}/`;
        const $ = await this.fetchHtml(url);
        const anime = [];
        $('.venz ul li, .rapi .detpost').each((_, el) => {
            const $el = $(el);
            const title = $el.find('.jdlflm, .judul-anime').text().trim();
            const link = $el.find('.thumb a, a').first().attr('href') || '';
            const poster = $el.find('.thumbz img, img').first().attr('src') ||
                $el.find('.thumbz img, img').first().attr('data-src') ||
                '';
            const totalEpisode = $el.find('.epz').text().trim();
            const rating = $el.find('.epztipe').text().trim();
            const releaseDate = $el.find('.newnime').text().trim();
            if (title && link && link.includes('/anime/')) {
                anime.push({
                    title,
                    slug: this.extractSlug(link),
                    poster,
                    totalEpisode,
                    rating,
                    releaseDate,
                });
            }
        });
        const pagination = this.parsePagination($);
        return { anime, pagination };
    }
    async getAnimeList() {
        const $ = await this.fetchHtml(`${this.baseUrl}/anime-list/`);
        const list = {};
        $('.bariskelom').each((_, el) => {
            const $el = $(el);
            const letter = $el.find('.barispenz a').text().trim().toUpperCase() || '#';
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
                        slug: this.extractSlug(href),
                    });
                }
            });
        });
        return list;
    }
    async getAnimeDetail(slug) {
        const $ = await this.fetchHtml(`${this.baseUrl}/anime/${slug}/`);
        const title = $('.jdlrx h1')
            .text()
            .trim()
            .replace(/\s*\(Episode\s*\d+\s*[-–]\s*\d+\)\s*/i, '')
            .replace(/(\s*(Subtitle Indonesia|Sub Indo))+$/i, '')
            .trim();
        const poster = $('.fotoanime img').attr('src') || '';
        if (!title) {
            throw new common_1.HttpException(`Anime dengan slug '${slug}' tidak ditemukan`, common_1.HttpStatus.NOT_FOUND);
        }
        const infoMap = {};
        $('.infozingle p').each((_, el) => {
            const text = $(el).text();
            const [key, ...valueParts] = text.split(':');
            if (key && valueParts.length) {
                infoMap[key.trim().toLowerCase()] = valueParts.join(':').trim();
            }
        });
        const genres = [];
        $('.infozingle p span a[href*="/genres/"]').each((_, el) => {
            genres.push($(el).text().trim());
        });
        const synopsis = $('.sinopc').text().trim();
        const episodes = [];
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
                    slug: this.extractSlug(link),
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
    async getEpisodeDetail(slug) {
        const $ = await this.fetchHtml(`${this.baseUrl}/episode/${slug}/`);
        const title = $('.posttl').text().trim();
        if (!title) {
            throw new common_1.HttpException(`Episode dengan slug '${slug}' tidak ditemukan`, common_1.HttpStatus.NOT_FOUND);
        }
        const animeLink = $('.flir a[href*="/anime/"]').attr('href') ||
            $('.flir a:contains("See All")').attr('href') ||
            '';
        const animeTitle = title.replace(/\s*Episode\s*\d+.*$/i, '').trim();
        const prevLink = $('.flir a:contains("Previous")').attr('href') || '';
        const nextLink = $('.flir a:contains("Next")').attr('href') || '';
        const streamingUrl = $('#embed_holder iframe').attr('src') || '';
        const streamingServers = [];
        const qualityMap = {};
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
        const downloadLinks = [];
        $('.download ul li').each((_, el) => {
            const $el = $(el);
            const resolution = $el.find('strong').text().trim();
            const links = [];
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
                slug: this.extractSlug(animeLink),
            },
            prevEpisode: prevLink ? this.extractSlug(prevLink) : undefined,
            nextEpisode: nextLink ? this.extractSlug(nextLink) : undefined,
            streamingUrl: streamingUrl || undefined,
            streamingServers,
            downloadLinks,
        };
    }
    async getGenres() {
        const $ = await this.fetchHtml(`${this.baseUrl}/genre-list/`);
        const genres = [];
        $('.genres li a').each((_, el) => {
            const $el = $(el);
            const name = $el.text().trim();
            const href = $el.attr('href') || '';
            if (name && href) {
                genres.push({
                    name,
                    slug: this.extractGenreSlug(href),
                });
            }
        });
        return genres;
    }
    async getAnimeByGenre(genre, page = 1) {
        const url = page === 1
            ? `${this.baseUrl}/genres/${genre}/`
            : `${this.baseUrl}/genres/${genre}/page/${page}/`;
        const $ = await this.fetchHtml(url);
        const anime = [];
        $('.col-anime, .col-md-4, .venz li, .page .col-6').each((_, el) => {
            const $el = $(el);
            const title = $el
                .find('.col-anime-title a, .jdlflm, .judul-anime, h3, h4')
                .first()
                .text()
                .trim();
            const link = $el.find('a').first().attr('href') || '';
            const poster = $el.find('img').first().attr('src') ||
                $el.find('img').first().attr('data-src') ||
                '';
            const rating = $el.find('.col-anime-rating, .epztipe').text().trim();
            if (title && link && link.includes('/anime/')) {
                anime.push({
                    title,
                    slug: this.extractSlug(link),
                    poster,
                    rating,
                });
            }
        });
        const pagination = this.parsePagination($);
        return {
            genre,
            anime,
            pagination,
        };
    }
    async getSchedule() {
        const $ = await this.fetchHtml(`${this.baseUrl}/jadwal-rilis/`);
        const schedule = [];
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
            const day = $el.find('h2').text().trim() || days[index] || `Day ${index + 1}`;
            const animeList = [];
            $el.find('ul li a').each((_, linkEl) => {
                const $link = $(linkEl);
                const title = $link.text().trim();
                const href = $link.attr('href') || '';
                if (title && href) {
                    animeList.push({
                        title,
                        slug: this.extractSlug(href),
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
    async search(query) {
        const $ = await this.fetchHtml(`${this.baseUrl}/?s=${encodeURIComponent(query)}&post_type=anime`);
        const anime = [];
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
                    slug: this.extractSlug(link),
                    poster,
                    rating: rating || undefined,
                });
            }
        });
        return anime;
    }
    async resolveStreamingUrl(dataContent) {
        try {
            const decoded = Buffer.from(dataContent, 'base64').toString('utf-8');
            const params = JSON.parse(decoded);
            const nonceResponse = await axios_1.default.post(`${this.baseUrl}/wp-admin/admin-ajax.php`, new URLSearchParams({
                action: 'aa1208d27f29ca340c92c66d1926f13f',
            }), {
                headers: {
                    ...this.headers,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                timeout: 10000,
            });
            const nonce = nonceResponse.data?.data;
            if (!nonce) {
                throw new common_1.HttpException('Failed to get nonce for streaming', common_1.HttpStatus.BAD_GATEWAY);
            }
            const playerResponse = await axios_1.default.post(`${this.baseUrl}/wp-admin/admin-ajax.php`, new URLSearchParams({
                action: '2a3505c93b0035d3f455df82bf976b84',
                nonce: nonce,
                id: params.id?.toString() || '',
                i: params.i?.toString() || '',
                q: params.q || '',
            }), {
                headers: {
                    ...this.headers,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                timeout: 10000,
            });
            const encodedHtml = playerResponse.data?.data;
            if (!encodedHtml) {
                throw new common_1.HttpException('Failed to get streaming player', common_1.HttpStatus.BAD_GATEWAY);
            }
            const html = Buffer.from(encodedHtml, 'base64').toString('utf-8');
            const iframeMatch = html.match(/src="([^"]+)"/);
            const url = iframeMatch ? iframeMatch[1] : '';
            return {
                url,
                html,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to resolve streaming URL', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.OtakudesuService = OtakudesuService;
exports.OtakudesuService = OtakudesuService = __decorate([
    (0, common_1.Injectable)()
], OtakudesuService);
//# sourceMappingURL=otakudesu.service.js.map