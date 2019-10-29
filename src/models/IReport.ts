import { CommonResponse } from './CommonInterfaces';

export interface GetReportByReportType {
    message: string;
}

export interface GetReportByReportTypeError extends CommonResponse { }

export interface Report {
    created_at: number;
    filename: string;
}

export interface GetReportsByReportType {
    reports: Report[];
}

export interface GetReportsByReportTypeError extends CommonResponse { }
