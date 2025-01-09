import type { IUploadService } from "./interfaces/IUpload";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

    async getSignedUrl( key: string ): Promise<string>{
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })

        return await getSignedUrl(this.client, command, {expiresIn: 3600})
    }
}