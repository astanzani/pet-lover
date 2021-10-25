import { S3 } from 'aws-sdk';

/**
 * Uploads a file to S3 and returns it's upload URL.
 *
 * @param bucket The bucket name
 * @param name The file name, used as the storage key
 * @param body The file body
 * @param contentType The file mime type
 * @returns URL of the uploaded file
 */
export function uploadFile(
  bucket: string,
  name: string,
  body: S3.Body,
  contentType: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const s3 = new S3();
    s3.upload({
      Bucket: bucket,
      Key: name,
      Body: body,
      ContentType: contentType,
    })
      .promise()
      .then((data) => resolve(data.Location))
      .catch((err) => reject(err));
  });
}
