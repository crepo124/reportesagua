import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { envs } from '../config/envs';

@Injectable()
export class StorageService {
  private readonly s3Client = new S3Client({
    region: envs.AWS_REGION,
    credentials: {
      accessKeyId: envs.AWS_ACCESS_KEY_ID,
      secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFile(
    file: { buffer: Buffer; mimetype: string },
    folder: string,
  ): Promise<string> {
    const key = `${folder}/${randomUUID()}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: envs.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `https://${envs.AWS_BUCKET_NAME}.s3.${envs.AWS_REGION}.amazonaws.com/${key}`;
  }
}