export enum REPOSITORY {

}

export enum INJECTION_TOKEN {
    DATA_SOURCE = 'DATA_SOURCE',
    CACHE = 'CACHE',
}

export enum USERROLE {
}

export enum EXCEPTION_MESSAGES {
    UNAUTHORIZED = 'Not authorized',
    INVALID_REQUEST = 'Invalid request data',
    NOT_FOUND = 'Resource not found',
    INTERNAL_SERVER_ERROR = 'Server error occured',
    CONFLICT_IN_REQUEST = 'Resource conflicts',
}

export enum ERROR_CODES {
    INVALID_REQUEST = 'INVALID_REQUEST',
    NOT_FOUND = 'NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    CONFLICT_IN_REQUEST = 'CONFLICT_IN_REQUEST',
}

export enum LOG_CONTEXT {
    REQUEST = 'Request',
    REDIS = 'Redis',
    DATA_SOURCE = 'Data Source',
    BackgroundTask = 'Background Task',
}

export enum API_VERSION {
    V1 = '1',
}
