"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeDetailDto = exports.BatchLinkDto = exports.ResolveStreamingDto = exports.EpisodeDetailDto = exports.StreamingServerDto = exports.StreamingServerItemDto = exports.AnimeInfoDto = exports.EpisodeListItemDto = exports.DownloadSectionDto = exports.DownloadLinkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DownloadLinkDto {
    provider;
    url;
}
exports.DownloadLinkDto = DownloadLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ZippyShare' }),
    __metadata("design:type", String)
], DownloadLinkDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://...' }),
    __metadata("design:type", String)
], DownloadLinkDto.prototype, "url", void 0);
class DownloadSectionDto {
    resolution;
    links;
}
exports.DownloadSectionDto = DownloadSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '480p' }),
    __metadata("design:type", String)
], DownloadSectionDto.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DownloadLinkDto] }),
    __metadata("design:type", Array)
], DownloadSectionDto.prototype, "links", void 0);
class EpisodeListItemDto {
    episode;
    slug;
    date;
}
exports.EpisodeListItemDto = EpisodeListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8' }),
    __metadata("design:type", String)
], EpisodeListItemDto.prototype, "episode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'onpm-s3-episode-8-sub-indo' }),
    __metadata("design:type", String)
], EpisodeListItemDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '30 November,2025' }),
    __metadata("design:type", String)
], EpisodeListItemDto.prototype, "date", void 0);
class AnimeInfoDto {
    title;
    slug;
}
exports.AnimeInfoDto = AnimeInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'One Punch Man Season 3' }),
    __metadata("design:type", String)
], AnimeInfoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'punch-man-s3-sub-indo' }),
    __metadata("design:type", String)
], AnimeInfoDto.prototype, "slug", void 0);
class StreamingServerItemDto {
    provider;
    dataContent;
    isDefault;
}
exports.StreamingServerItemDto = StreamingServerItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'updesu' }),
    __metadata("design:type", String)
], StreamingServerItemDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJpZCI6MTkwNDQzLCJpIjowLCJxIjoiNDgwcCJ9' }),
    __metadata("design:type", String)
], StreamingServerItemDto.prototype, "dataContent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Boolean)
], StreamingServerItemDto.prototype, "isDefault", void 0);
class StreamingServerDto {
    quality;
    servers;
}
exports.StreamingServerDto = StreamingServerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '480p' }),
    __metadata("design:type", String)
], StreamingServerDto.prototype, "quality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StreamingServerItemDto] }),
    __metadata("design:type", Array)
], StreamingServerDto.prototype, "servers", void 0);
class EpisodeDetailDto {
    title;
    anime;
    prevEpisode;
    nextEpisode;
    streamingUrl;
    streamingServers;
    downloadLinks;
}
exports.EpisodeDetailDto = EpisodeDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'One Punch Man Season 3 Episode 8' }),
    __metadata("design:type", String)
], EpisodeDetailDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AnimeInfoDto }),
    __metadata("design:type", AnimeInfoDto)
], EpisodeDetailDto.prototype, "anime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'onpm-s3-episode-7-sub-indo' }),
    __metadata("design:type", String)
], EpisodeDetailDto.prototype, "prevEpisode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'onpm-s3-episode-9-sub-indo' }),
    __metadata("design:type", String)
], EpisodeDetailDto.prototype, "nextEpisode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://...' }),
    __metadata("design:type", String)
], EpisodeDetailDto.prototype, "streamingUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StreamingServerDto] }),
    __metadata("design:type", Array)
], EpisodeDetailDto.prototype, "streamingServers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DownloadSectionDto] }),
    __metadata("design:type", Array)
], EpisodeDetailDto.prototype, "downloadLinks", void 0);
class ResolveStreamingDto {
    url;
    html;
}
exports.ResolveStreamingDto = ResolveStreamingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://desustream.info/dstream/updesu/v5/index.php?id=...',
    }),
    __metadata("design:type", String)
], ResolveStreamingDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '<div class="player-embed">...</div>' }),
    __metadata("design:type", String)
], ResolveStreamingDto.prototype, "html", void 0);
class BatchLinkDto {
    resolution;
    links;
}
exports.BatchLinkDto = BatchLinkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '480p' }),
    __metadata("design:type", String)
], BatchLinkDto.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DownloadLinkDto] }),
    __metadata("design:type", Array)
], BatchLinkDto.prototype, "links", void 0);
class AnimeDetailDto {
    title;
    japanese;
    score;
    producer;
    type;
    status;
    totalEpisode;
    duration;
    releaseDate;
    studio;
    genres;
    synopsis;
    poster;
    batch;
    episodes;
}
exports.AnimeDetailDto = AnimeDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'One Punch Man Season 3' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ワンパンマン 3' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "japanese", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7.14' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lantis, Shueisha' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "producer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TV' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ongoing' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Unknown' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "totalEpisode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '24 Min.' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Okt 12, 2025' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "releaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'J.C.Staff' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "studio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Action', 'Comedy', 'Parody'] }),
    __metadata("design:type", Array)
], AnimeDetailDto.prototype, "genres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Saitama adalah...' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "synopsis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://otakudesu.best/wp-content/uploads/...' }),
    __metadata("design:type", String)
], AnimeDetailDto.prototype, "poster", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [BatchLinkDto] }),
    __metadata("design:type", Array)
], AnimeDetailDto.prototype, "batch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [EpisodeListItemDto] }),
    __metadata("design:type", Array)
], AnimeDetailDto.prototype, "episodes", void 0);
//# sourceMappingURL=episode.dto.js.map