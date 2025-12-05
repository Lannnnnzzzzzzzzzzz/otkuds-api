import { HomeResponse, AnimeCard, AnimeDetail, EpisodeDetail, Genre, ScheduleDay, OngoingResponse, CompleteResponse, GenreAnimeResponse, AnimeListItem } from './interfaces/otakudesu.interface';
export declare class OtakudesuService {
    private readonly baseUrl;
    private readonly headers;
    private fetchHtml;
    private extractSlug;
    private extractGenreSlug;
    private parsePagination;
    getHome(): Promise<HomeResponse>;
    getOngoing(page?: number): Promise<OngoingResponse>;
    getComplete(page?: number): Promise<CompleteResponse>;
    getAnimeList(): Promise<Record<string, AnimeListItem[]>>;
    getAnimeDetail(slug: string): Promise<AnimeDetail>;
    getEpisodeDetail(slug: string): Promise<EpisodeDetail>;
    getGenres(): Promise<Genre[]>;
    getAnimeByGenre(genre: string, page?: number): Promise<GenreAnimeResponse>;
    getSchedule(): Promise<ScheduleDay[]>;
    search(query: string): Promise<AnimeCard[]>;
    resolveStreamingUrl(dataContent: string): Promise<{
        url: string;
        html?: string;
    }>;
}
