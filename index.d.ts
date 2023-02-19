type TRequest = (method: string, params?: {}) => Promise<any>;
declare class OAuth {
    #private;
    constructor(version?: string, host?: string, scope?: string, id?: string, secret?: string);
    request: TRequest;
    login: (username: string, password: string, code?: string, captchaSid?: string, captchaKey?: string) => Promise<any>;
    validatePhone: (sid: string) => Promise<any>;
}
declare class Request {
    #private;
    constructor(token: string, version?: string, host?: string, agent?: string);
    request: TRequest;
}

export { OAuth, Request };
