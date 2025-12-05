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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtakudesuController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const swagger_1 = require("@nestjs/swagger");
const otakudesu_service_1 = require("./otakudesu.service");
const dto_1 = require("./dto");
let OtakudesuController = class OtakudesuController {
    otakudesuService;
    constructor(otakudesuService) {
        this.otakudesuService = otakudesuService;
    }
    async getHome() {
        return this.otakudesuService.getHome();
    }
    async getOngoing(page) {
        return this.otakudesuService.getOngoing(parseInt(page || '1'));
    }
    async getComplete(page) {
        return this.otakudesuService.getComplete(parseInt(page || '1'));
    }
    async getAnimeList() {
        const list = await this.otakudesuService.getAnimeList();
        return { list };
    }
    async getAnimeDetail(slug) {
        return this.otakudesuService.getAnimeDetail(slug);
    }
    async getEpisodeDetail(slug) {
        return this.otakudesuService.getEpisodeDetail(slug);
    }
    async getGenres() {
        const genres = await this.otakudesuService.getGenres();
        return { genres };
    }
    async getAnimeByGenre(genre, page) {
        return this.otakudesuService.getAnimeByGenre(genre, parseInt(page || '1'));
    }
    async getSchedule() {
        const schedule = await this.otakudesuService.getSchedule();
        return { schedule };
    }
    async search(query) {
        const anime = await this.otakudesuService.search(query || '');
        return { anime };
    }
    async resolveStreaming(dataContent) {
        return this.otakudesuService.resolveStreamingUrl(dataContent);
    }
    async resolveStreamingGet(dataContent) {
        return this.otakudesuService.resolveStreamingUrl(dataContent);
    }
};
exports.OtakudesuController = OtakudesuController;
__decorate([
    (0, common_1.Get)('home'),
    (0, swagger_1.ApiTags)('Home'),
    (0, cache_manager_1.CacheTTL)(300000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get homepage data',
        description: 'Mendapatkan daftar anime ongoing dan completed terbaru',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: dto_1.HomeResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getHome", null);
__decorate([
    (0, common_1.Get)('ongoing'),
    (0, swagger_1.ApiTags)('Anime'),
    (0, cache_manager_1.CacheTTL)(300000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get ongoing anime',
        description: 'Daftar anime yang sedang tayang dengan pagination',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.OngoingResponseDto,
    }),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getOngoing", null);
__decorate([
    (0, common_1.Get)('complete'),
    (0, swagger_1.ApiTags)('Anime'),
    (0, cache_manager_1.CacheTTL)(300000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get completed anime',
        description: 'Daftar anime yang sudah selesai tayang dengan pagination',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.CompleteResponseDto,
    }),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getComplete", null);
__decorate([
    (0, common_1.Get)('anime-list'),
    (0, swagger_1.ApiTags)('Anime'),
    (0, cache_manager_1.CacheTTL)(600000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all anime list (A-Z)',
        description: 'Daftar semua anime diurutkan berdasarkan abjad',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.AnimeListResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getAnimeList", null);
__decorate([
    (0, common_1.Get)('anime/:slug'),
    (0, swagger_1.ApiTags)('Anime'),
    (0, cache_manager_1.CacheTTL)(300000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get anime detail',
        description: 'Detail lengkap anime termasuk info, synopsis, dan daftar episode',
    }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'punch-man-s3-sub-indo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: dto_1.AnimeDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Anime not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getAnimeDetail", null);
__decorate([
    (0, common_1.Get)('episode/:slug'),
    (0, swagger_1.ApiTags)('Episode'),
    (0, cache_manager_1.CacheTTL)(300000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get episode detail',
        description: 'Detail episode termasuk streaming servers dan download links',
    }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'onpm-s3-episode-8-sub-indo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: dto_1.EpisodeDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Episode not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getEpisodeDetail", null);
__decorate([
    (0, common_1.Get)('genres'),
    (0, swagger_1.ApiTags)('Genre'),
    (0, cache_manager_1.CacheTTL)(3600000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all genres',
        description: 'Daftar semua genre yang tersedia',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.GenreListResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getGenres", null);
__decorate([
    (0, common_1.Get)('genres/:genre'),
    (0, swagger_1.ApiTags)('Genre'),
    (0, cache_manager_1.CacheTTL)(300000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get anime by genre',
        description: 'Filter anime berdasarkan genre dengan pagination',
    }),
    (0, swagger_1.ApiParam)({ name: 'genre', example: 'action' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.GenreAnimeResponseDto,
    }),
    __param(0, (0, common_1.Param)('genre')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getAnimeByGenre", null);
__decorate([
    (0, common_1.Get)('schedule'),
    (0, swagger_1.ApiTags)('Schedule'),
    (0, cache_manager_1.CacheTTL)(600000),
    (0, swagger_1.ApiOperation)({
        summary: 'Get release schedule',
        description: 'Jadwal rilis anime dari Senin sampai Minggu',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.ScheduleResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "getSchedule", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiTags)('Search'),
    (0, cache_manager_1.CacheTTL)(300000),
    (0, swagger_1.ApiOperation)({
        summary: 'Search anime',
        description: 'Cari anime berdasarkan kata kunci',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'q',
        required: true,
        type: String,
        example: 'one punch',
        description: 'Kata kunci pencarian',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: dto_1.SearchResponseDto }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('resolve-streaming'),
    (0, swagger_1.ApiTags)('Streaming'),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolve streaming URL (POST)',
        description: 'Mendapatkan URL streaming player dari data-content yang ada di streamingServers',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                dataContent: {
                    type: 'string',
                    example: 'eyJpZCI6MTkwNDQzLCJpIjowLCJxIjoiNDgwcCJ9',
                    description: 'Base64 encoded data-content dari streamingServers',
                },
            },
            required: ['dataContent'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.ResolveStreamingDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'Failed to resolve streaming URL' }),
    __param(0, (0, common_1.Body)('dataContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "resolveStreaming", null);
__decorate([
    (0, common_1.Get)('resolve-streaming/:dataContent'),
    (0, swagger_1.ApiTags)('Streaming'),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolve streaming URL (GET)',
        description: 'Alternatif GET endpoint untuk resolve streaming URL',
    }),
    (0, swagger_1.ApiParam)({
        name: 'dataContent',
        example: 'eyJpZCI6MTkwNDQzLCJpIjowLCJxIjoiNDgwcCJ9',
        description: 'Base64 encoded data-content dari streamingServers',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
        type: dto_1.ResolveStreamingDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'Failed to resolve streaming URL' }),
    __param(0, (0, common_1.Param)('dataContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OtakudesuController.prototype, "resolveStreamingGet", null);
exports.OtakudesuController = OtakudesuController = __decorate([
    (0, common_1.Controller)('api'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __metadata("design:paramtypes", [otakudesu_service_1.OtakudesuService])
], OtakudesuController);
//# sourceMappingURL=otakudesu.controller.js.map