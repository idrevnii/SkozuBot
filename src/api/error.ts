import axios from "axios";

type ErrorType = 'axios_error' | 'vanilla_error' | 'unknown_error'

export type ApiError = {
    type: ErrorType,
    message: string,
}

export function transformError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
        return {
            type: 'axios_error',
            message: `${error.name} : ${error.message}\n${error.toJSON()}\n${error.stack}`
        }
    }

    if (error instanceof Error) {
        return {
            type: 'vanilla_error',
            message: `${error.name} : ${error.message}\n${error.stack}`
        }
    }

    return {
        type: 'unknown_error',
        message: `Something strange happened, trying to stringify:\n${JSON.stringify(error)}`
    }
}