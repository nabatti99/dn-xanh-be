export interface AWSServiceOptions {
    host?: string;
    port?: string;
}

export interface BuildHandlerOptions extends AWSServiceOptions {
    service: string;
    serviceTarget: string;
    customHeaders?: Record<string, string>;
}
