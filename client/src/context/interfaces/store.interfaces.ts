import { Dispatch, SetStateAction } from "react"

export interface ContextProps {
    isLoading: boolean
    loadingHandler: (loginState: boolean) => void
    errorMessage: string
    errorHandler: (message: string) => void
}