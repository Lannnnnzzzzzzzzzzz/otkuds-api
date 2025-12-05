export default function Home() {
  const baseUrl = 'https://otkuds-api.vercel.app';

  const endpoints = [
    {
      category: 'Home',
      items: [
        {
          method: 'GET',
          path: '/api/home',
          description: 'Get homepage data (ongoing & completed anime)',
          example: `${baseUrl}/api/home`,
        },
      ],
    },
    {
      category: 'Anime',
      items: [
        {
          method: 'GET',
          path: '/api/ongoing?page=1',
          description: 'Get ongoing anime list with pagination',
          example: `${baseUrl}/api/ongoing?page=1`,
        },
        {
          method: 'GET',
          path: '/api/complete?page=1',
          description: 'Get completed anime list with pagination',
          example: `${baseUrl}/api/complete?page=1`,
        },
        {
          method: 'GET',
          path: '/api/anime-list',
          description: 'Get all anime list (A-Z)',
          example: `${baseUrl}/api/anime-list`,
        },
        {
          method: 'GET',
          path: '/api/anime/:slug',
          description: 'Get anime detail',
          example: `${baseUrl}/api/anime/one-punch-man-s3-sub-indo`,
        },
      ],
    },
    {
      category: 'Episode',
      items: [
        {
          method: 'GET',
          path: '/api/episode/:slug',
          description: 'Get episode detail with streaming & download links',
          example: `${baseUrl}/api/episode/onpm-s3-episode-8-sub-indo`,
        },
      ],
    },
    {
      category: 'Genre',
      items: [
        {
          method: 'GET',
          path: '/api/genres',
          description: 'Get all available genres',
          example: `${baseUrl}/api/genres`,
        },
        {
          method: 'GET',
          path: '/api/genres/:genre?page=1',
          description: 'Get anime by genre with pagination',
          example: `${baseUrl}/api/genres/action?page=1`,
        },
      ],
    },
    {
      category: 'Schedule',
      items: [
        {
          method: 'GET',
          path: '/api/schedule',
          description: 'Get weekly anime release schedule',
          example: `${baseUrl}/api/schedule`,
        },
      ],
    },
    {
      category: 'Search',
      items: [
        {
          method: 'GET',
          path: '/api/search?q=query',
          description: 'Search anime by keyword',
          example: `${baseUrl}/api/search?q=one+punch`,
        },
      ],
    },
    {
      category: 'Streaming',
      items: [
        {
          method: 'POST',
          path: '/api/resolve-streaming',
          description: 'Resolve streaming URL from data-content',
          example: `${baseUrl}/api/resolve-streaming`,
          body: '{"dataContent": "base64_encoded_string"}',
        },
        {
          method: 'GET',
          path: '/api/resolve-streaming/:dataContent',
          description: 'Resolve streaming URL (GET method)',
          example: `${baseUrl}/api/resolve-streaming/eyJpZCI6MTkwNDQzfQ==`,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Otakudesu API
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            REST API untuk scraping data anime dari Otakudesu
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`${baseUrl}/api/home`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try API
            </a>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Homepage data (ongoing & completed)',
              'Anime lists with pagination',
              'Detailed anime information',
              'Episode details with streaming links',
              'Genre filtering',
              'Weekly release schedule',
              'Search functionality',
              'Streaming URL resolver',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Response Format</h2>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": { ... },
  "timestamp": "2024-12-05T10:00:00.000Z"
}`}
          </pre>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">API Endpoints</h2>
          {endpoints.map((section, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {section.category}
              </h3>
              <div className="space-y-4">
                {section.items.map((endpoint, endpointIdx) => (
                  <div
                    key={endpointIdx}
                    className="bg-slate-900/50 rounded-lg p-4 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded font-semibold text-sm ${
                          endpoint.method === 'GET'
                            ? 'bg-blue-600 text-white'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-blue-300 font-mono text-sm">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">
                      {endpoint.description}
                    </p>
                    <div className="bg-slate-950 rounded p-3 overflow-x-auto">
                      <code className="text-green-400 text-xs break-all">
                        {endpoint.example}
                      </code>
                    </div>
                    {endpoint.body && (
                      <div className="mt-2">
                        <p className="text-slate-400 text-xs mb-1">Request Body:</p>
                        <div className="bg-slate-950 rounded p-3">
                          <code className="text-yellow-400 text-xs">
                            {endpoint.body}
                          </code>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-blue-200 text-sm">
          <p>
            Built with Next.js • Deployed on Vercel
          </p>
          <p className="mt-2 text-slate-400">
            Disclaimer: API ini hanya untuk keperluan edukasi. Semua konten
            anime berasal dari Otakudesu.
          </p>
        </div>
      </div>
    </div>
  );
}
