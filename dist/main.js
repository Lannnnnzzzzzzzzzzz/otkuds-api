"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const interceptors_1 = require("./common/interceptors");
const filters_1 = require("./common/filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalInterceptors(new interceptors_1.TransformResponseInterceptor());
    app.useGlobalFilters(new filters_1.GlobalExceptionFilter());
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('/', (_req, res) => {
        res.redirect('/docs');
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Otakudesu API')
        .setDescription(`REST API untuk scraping data anime dari Otakudesu.

## Fitur
- Daftar anime ongoing dan completed
- Detail anime dan episode
- Streaming video player URLs
- Download links berbagai resolusi
- Pencarian anime
- Filter berdasarkan genre
- Jadwal rilis anime

## Response Format
Semua response menggunakan format konsisten:
\`\`\`json
{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": { ... },
  "timestamp": "...",
  "path": "/api/...",
  "responseTime": "123ms"
}
\`\`\`
`)
        .setVersion('1.0')
        .setContact('Otakudesu API', '', '')
        .addTag('Home', 'Homepage data - ongoing dan completed anime terbaru')
        .addTag('Anime', 'Daftar anime dan detail anime')
        .addTag('Episode', 'Detail episode dan streaming/download links')
        .addTag('Genre', 'Daftar genre dan filter anime by genre')
        .addTag('Schedule', 'Jadwal rilis anime')
        .addTag('Search', 'Pencarian anime')
        .addTag('Streaming', 'Resolve streaming player URLs')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger docs available at: http://localhost:${port}/docs`);
}
void bootstrap();
//# sourceMappingURL=main.js.map