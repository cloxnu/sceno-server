
function error(e: ErrorModel): Record<string, any> {
    return e
}

interface ErrorModel {
    errorCode: number
    errorMessage: string
}

export default ErrorModel
