export interface IUploadService {
    save(userId: string, file: any): Promise<string>;
    getSignedUrl(key: string): Promise<string>;
}