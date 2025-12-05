import { OtakudesuService } from './otakudesu.service';
import { HomeResponseDto, OngoingResponseDto, CompleteResponseDto, AnimeDetailDto, EpisodeDetailDto, GenreListResponseDto, GenreAnimeResponseDto, ScheduleResponseDto, SearchResponseDto, AnimeListResponseDto, ResolveStreamingDto } from './dto';
export declare class OtakudesuController {
    private readonly otakudesuService;
    constructor(otakudesuService: OtakudesuService);
    getHome(): Promise<HomeResponseDto>;
    getOngoing(page?: string): Promise<OngoingResponseDto>;
    getComplete(page?: string): Promise<CompleteResponseDto>;
    getAnimeList(): Promise<AnimeListResponseDto>;
    getAnimeDetail(slug: string): Promise<AnimeDetailDto>;
    getEpisodeDetail(slug: string): Promise<EpisodeDetailDto>;
    getGenres(): Promise<GenreListResponseDto>;
    getAnimeByGenre(genre: string, page?: string): Promise<GenreAnimeResponseDto>;
    getSchedule(): Promise<ScheduleResponseDto>;
    search(query: string): Promise<SearchResponseDto>;
    resolveStreaming(dataContent: string): Promise<ResolveStreamingDto>;
    resolveStreamingGet(dataContent: string): Promise<ResolveStreamingDto>;
}
