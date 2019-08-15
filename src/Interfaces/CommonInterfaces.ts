export interface CommonError {
    code: number;
    message: string;
}

export interface AdvanceError extends CommonError {
    errors?: Record<string, string>;
}
