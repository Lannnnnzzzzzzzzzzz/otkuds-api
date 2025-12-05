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
exports.CompleteResponseDto = exports.OngoingResponseDto = exports.PaginationDto = exports.HomeResponseDto = exports.AnimeCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AnimeCardDto {
    title;
    slug;
    poster;
    episode;
    rating;
    releaseDay;
    releaseDate;
    totalEpisode;
}
exports.AnimeCardDto = AnimeCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'One Punch Man Season 3' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'punch-man-s3-sub-indo' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://otakudesu.best/wp-content/uploads/...' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "poster", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '8' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "episode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '7.14' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Minggu' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "releaseDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '30 Nov' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "releaseDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12' }),
    __metadata("design:type", String)
], AnimeCardDto.prototype, "totalEpisode", void 0);
class HomeResponseDto {
    ongoing;
    complete;
}
exports.HomeResponseDto = HomeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AnimeCardDto] }),
    __metadata("design:type", Array)
], HomeResponseDto.prototype, "ongoing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AnimeCardDto] }),
    __metadata("design:type", Array)
], HomeResponseDto.prototype, "complete", void 0);
class PaginationDto {
    currentPage;
    totalPages;
    itemsPerPage;
    totalItems;
    hasPrevPage;
    hasNextPage;
    prevPage;
    nextPage;
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Current page number' }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Total number of pages' }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Number of items per page' }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "itemsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 500,
        description: 'Estimated total items (may not be exact)',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PaginationDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Whether previous page exists' }),
    __metadata("design:type", Boolean)
], PaginationDto.prototype, "hasPrevPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether next page exists' }),
    __metadata("design:type", Boolean)
], PaginationDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: null, description: 'Previous page number' }),
    __metadata("design:type", Object)
], PaginationDto.prototype, "prevPage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, description: 'Next page number' }),
    __metadata("design:type", Object)
], PaginationDto.prototype, "nextPage", void 0);
class OngoingResponseDto {
    anime;
    pagination;
}
exports.OngoingResponseDto = OngoingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AnimeCardDto] }),
    __metadata("design:type", Array)
], OngoingResponseDto.prototype, "anime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PaginationDto }),
    __metadata("design:type", PaginationDto)
], OngoingResponseDto.prototype, "pagination", void 0);
class CompleteResponseDto {
    anime;
    pagination;
}
exports.CompleteResponseDto = CompleteResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AnimeCardDto] }),
    __metadata("design:type", Array)
], CompleteResponseDto.prototype, "anime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PaginationDto }),
    __metadata("design:type", PaginationDto)
], CompleteResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=anime.dto.js.map