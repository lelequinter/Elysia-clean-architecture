import type { IUploadService } from "./interfaces/IUpload";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class UploadService implements IUploadService {

    private client: S3Client;
    private bucketName: string = process.env.BUCKET_NAME!;
    private region: string = process.env.AWS_REGION!;
    private accessKeyId: string = process.env.AWS_ACCESS_KEY_ID!;
    private secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY!;

    constructor(){
        this.client = new S3Client({ 
            region: this.region,
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey,
            }
        });
    }

    async save(userId: string, file: any){
        const commad = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: `${userId}/${file.name}`,
            Body: Buffer.from( await file.arrayBuffer()),
        })

        await this.client.send(commad);

        return `${userId}/${file.name}`
    }
}