export declare class AnimeCardDto {
    title: string;
    slug: string;
    poster: string;
    episode?: string;
    rating?: string;
    releaseDay?: string;
    releaseDate?: string;
    totalEpisode?: string;
}
export declare class HomeResponseDto {
    ongoing: AnimeCardDto[];
    complete: AnimeCardDto[];
}
export declare class PaginationDto {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number | null;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}
export declare class OngoingResponseDto {
    anime: AnimeCardDto[];
    pagination: PaginationDto;
}
export declare class CompleteResponseDto {
    anime: AnimeCardDto[];
    pagination: PaginationDto;
}
