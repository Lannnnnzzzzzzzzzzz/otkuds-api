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
exports.AnimeListResponseDto = exports.AnimeListItemDto = exports.SearchResponseDto = exports.ScheduleResponseDto = exports.ScheduleDayDto = exports.ScheduleAnimeDto = exports.GenreAnimeResponseDto = exports.GenreListResponseDto = exports.GenreDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const anime_dto_1 = require("./anime.dto");
class GenreDto {
    name;
    slug;
}
exports.GenreDto = GenreDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Action' }),
    __metadata("design:type", String)
], GenreDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'action' }),
    __metadata("design:type", String)
], GenreDto.prototype, "slug", void 0);
class GenreListResponseDto {
    genres;
}
exports.GenreListResponseDto = GenreListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [GenreDto] }),
    __metadata("design:type", Array)
], GenreListResponseDto.prototype, "genres", void 0);
class GenreAnimeResponseDto {
    genre;
    anime;
    pagination;
}
exports.GenreAnimeResponseDto = GenreAnimeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Action' }),
    __metadata("design:type", String)
], GenreAnimeResponseDto.prototype, "genre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [anime_dto_1.AnimeCardDto] }),
    __metadata("design:type", Array)
], GenreAnimeResponseDto.prototype, "anime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: anime_dto_1.PaginationDto }),
    __metadata("design:type", anime_dto_1.PaginationDto)
], GenreAnimeResponseDto.prototype, "pagination", void 0);
class ScheduleAnimeDto {
    title;
    slug;
}
exports.ScheduleAnimeDto = ScheduleAnimeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'One Punch Man Season 3' }),
    __metadata("design:type", String)
], ScheduleAnimeDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'punch-man-s3-sub-indo' }),
    __metadata("design:type", String)
], ScheduleAnimeDto.prototype, "slug", void 0);
class ScheduleDayDto {
    day;
    anime;
}
exports.ScheduleDayDto = ScheduleDayDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senin' }),
    __metadata("design:type", String)
], ScheduleDayDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ScheduleAnimeDto] }),
    __metadata("design:type", Array)
], ScheduleDayDto.prototype, "anime", void 0);
class ScheduleResponseDto {
    schedule;
}
exports.ScheduleResponseDto = ScheduleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ScheduleDayDto] }),
    __metadata("design:type", Array)
], ScheduleResponseDto.prototype, "schedule", void 0);
class SearchResponseDto {
    anime;
}
exports.SearchResponseDto = SearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [anime_dto_1.AnimeCardDto] }),
    __metadata("design:type", Array)
], SearchResponseDto.prototype, "anime", void 0);
class AnimeListItemDto {
    title;
    slug;
    genres;
    status;
}
exports.AnimeListItemDto = AnimeListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'One Punch Man' }),
    __metadata("design:type", String)
], AnimeListItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'punch-man-sub-indo' }),
    __metadata("design:type", String)
], AnimeListItemDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['Action', 'Comedy'] }),
    __metadata("design:type", Array)
], AnimeListItemDto.prototype, "genres", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Completed' }),
    __metadata("design:type", String)
], AnimeListItemDto.prototype, "status", void 0);
class AnimeListResponseDto {
    list;
}
exports.AnimeListResponseDto = AnimeListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            A: [{ title: 'Attack on Titan', slug: 'aot-sub-indo' }],
            B: [{ title: 'Bleach', slug: 'bleach-sub-indo' }],
        },
    }),
    __metadata("design:type", Object)
], AnimeListResponseDto.prototype, "list", void 0);
//# sourceMappingURL=search.dto.js.map