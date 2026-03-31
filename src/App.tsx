import { CurlyBraces, Home } from 'lucide-react'
import React from 'react'
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider'
import { ThemeToggle } from './components/ThemeToggle'
import { Button } from './components/ui/button'
import { DataProvider, useData } from './contexts/DataContext'
import './index.css'
import { cn, getAssetPath } from './lib/utils'
import { HomeView } from './views/HomeView'

function Layout({ children }: { children: React.ReactNode }) {
    const { isStaticMode } = useData()
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <div className="min-h-screen text-foreground pb-20">
            <nav className="border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2.5">
                            <CurlyBraces className="h-6 w-6" />
                            <p className="font-black text-2xl tracking-tight">
                                vite-bun-react-shadcn-boilerplate
                            </p>
                        </Link>
                        <div className="hidden md:flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className={cn(
                                    'px-3 h-9',
                                    isActive('/') &&
                                        'bg-primary/6 text-primary hover:bg-primary/20'
                                )}
                            >
                                <Link
                                    to="/"
                                    className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    <Home className="h-5 w-5" />
                                    Start
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 md:p-2">{children}</main>
        </div>
    )
}

export function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <DataProvider>
                <Toaster />
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomeView />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </DataProvider>
        </ThemeProvider>
    )
}

export default App
