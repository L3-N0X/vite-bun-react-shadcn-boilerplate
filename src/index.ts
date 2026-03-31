import { serve } from 'bun'
import path from 'node:path'

const isDev = process.env.NODE_ENV !== 'production'

const server = serve({
    routes: {
        '/*': async (req) => {
            if (isDev) {
                return new Response(
                    'Backend API is running. View the frontend at http://localhost:5173',
                    { status: 200 }
                )
            }

            // Production only: Serve Vite's built static files from the 'dist' directory
            const url = new URL(req.url)
            let relativePath = url.pathname.slice(1)

            // Default to index.html for the root route
            if (relativePath === '') {
                relativePath = 'index.html'
            }

            const filePath = path.join(process.cwd(), 'dist', relativePath)
            const file = Bun.file(filePath)

            if (await file.exists()) {
                return new Response(file)
            }

            // Client-side routing fallback (React Router):
            // If the file isn't found, serve index.html and let React Router handle the 404
            return new Response(
                Bun.file(path.join(process.cwd(), 'dist/index.html'))
            )
        },

        '/public/*': async (req) => {
            const url = new URL(req.url)
            // Remove leading slash and handle path
            const relativePath = url.pathname.slice(1)
            const filePath = path.join(process.cwd(), relativePath)

            const file = Bun.file(filePath)
            if (await file.exists()) {
                return new Response(file)
            }
            return new Response('Not Found', { status: 404 })
        },

        '/api/health': () => new Response('OK', { status: 200 }),
    },

    development: isDev && {
        hmr: false,
        // Echo console logs from the browser to the server
        console: true,
    },
})

console.log(`🚀 Server running at ${server.url}`)
