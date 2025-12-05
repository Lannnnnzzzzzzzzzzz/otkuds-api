export declare class DownloadLinkDto {
    provider: string;
    url: string;
}
export declare class DownloadSectionDto {
    resolution: string;
    links: DownloadLinkDto[];
}
export declare class EpisodeListItemDto {
    episode: string;
    slug: string;
    date: string;
}
export declare class AnimeInfoDto {
    title: string;
    slug: string;
}
export declare class StreamingServerItemDto {
    provider: string;
    dataContent: string;
    isDefault?: boolean;
}
export declare class StreamingServerDto {
    quality: string;
    servers: StreamingServerItemDto[];
}
export declare class EpisodeDetailDto {
    title: string;
    anime: AnimeInfoDto;
    prevEpisode?: string;
    nextEpisode?: string;
    streamingUrl?: string;
    streamingServers: StreamingServerDto[];
    downloadLinks: DownloadSectionDto[];
}
export declare class ResolveStreamingDto {
    url: string;
    html?: string;
}
export declare class BatchLinkDto {
    resolution: string;
    links: DownloadLinkDto[];
}
export declare class AnimeDetailDto {
    title: string;
    japanese: string;
    score: string;
    producer: string;
    type: string;
    status: string;
    totalEpisode: string;
    duration: string;
    releaseDate: string;
    studio: string;
    genres: string[];
    synopsis: string;
    poster: string;
    batch?: BatchLinkDto[];
    episodes: EpisodeListItemDto[];
}
