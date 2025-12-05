"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorCode = 'INTERNAL_ERROR';
        let details;
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object') {
                const responseObj = exceptionResponse;
                message =
                    responseObj.message ||
                        responseObj.error ||
                        message;
                details = responseObj.details;
            }
            errorCode = this.getErrorCode(statusCode, request.url);
        }
        else if (exception instanceof Error) {
            message = exception.message;
            details = exception.stack;
        }
        const errorResponse = {
            success: false,
            statusCode,
            message,
            error: {
                code: errorCode,
                details: process.env.NODE_ENV === 'development' ? details : undefined,
            },
            timestamp: new Date().toISOString(),
            path: request.url,
        };
        response.status(statusCode).json(errorResponse);
    }
    getErrorCode(statusCode, url) {
        let resource = 'RESOURCE';
        if (url.includes('/anime/'))
            resource = 'ANIME';
        else if (url.includes('/episode/'))
            resource = 'EPISODE';
        else if (url.includes('/genres/'))
            resource = 'GENRE';
        else if (url.includes('/search'))
            resource = 'SEARCH';
        else if (url.includes('/resolve-streaming'))
            resource = 'STREAMING';
        const statusMap = {
            400: 'BAD_REQUEST',
            404: `${resource}_NOT_FOUND`,
            502: 'UPSTREAM_ERROR',
            504: 'UPSTREAM_TIMEOUT',
            429: 'RATE_LIMIT_EXCEEDED',
            401: 'UNAUTHORIZED',
            403: 'FORBIDDEN',
        };
        return statusMap[statusCode] || 'INTERNAL_ERROR';
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map