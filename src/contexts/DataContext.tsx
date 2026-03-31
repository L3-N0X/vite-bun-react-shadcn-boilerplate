import { createContext, useContext } from 'react'

interface DataContextType {
    isStaticMode: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
    const isStaticMode = import.meta.env.VITE_STATIC_MODE === 'true'
    return (
        <DataContext.Provider
            value={{
                isStaticMode,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider')
    }
    return context
}
