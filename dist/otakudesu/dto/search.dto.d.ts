import { AnimeCardDto, PaginationDto } from './anime.dto';
export declare class GenreDto {
    name: string;
    slug: string;
}
export declare class GenreListResponseDto {
    genres: GenreDto[];
}
export declare class GenreAnimeResponseDto {
    genre: string;
    anime: AnimeCardDto[];
    pagination: PaginationDto;
}
export declare class ScheduleAnimeDto {
    title: string;
    slug: string;
}
export declare class ScheduleDayDto {
    day: string;
    anime: ScheduleAnimeDto[];
}
export declare class ScheduleResponseDto {
    schedule: ScheduleDayDto[];
}
export declare class SearchResponseDto {
    anime: AnimeCardDto[];
}
export declare class AnimeListItemDto {
    title: string;
    slug: string;
    genres?: string[];
    status?: string;
}
export declare class AnimeListResponseDto {
    list: Record<string, AnimeListItemDto[]>;
}
