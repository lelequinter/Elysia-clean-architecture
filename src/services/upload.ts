import type { IUploadService } from "./interfaces/IUpload";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class UploadService implements IUploadService {

    private client: S3Client;

    constructor(){
        this.client = new S3Client({ 
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID || '',
            }
        });
    }

    async save(userId: string, file: any){
        const commad = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${userId}/${file.name}`,
            Body: file.arrayBuffer(),
        })

        await this.client.send(commad);

        return `${userId}/${file.name}`
    }
}