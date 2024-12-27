import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS,
  },
});

export const uploadFileToS3 = async (image, postTitle) => {
  if (!image) {
    return;
  }
  const params = {
    Bucket: "bilog-hb",
    Key: `post/${postTitle}/${image.name}`,
    Body: image,
    ACL: "public-read",
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  const url = `https://bilog-hb.s3.us-east-1.amazonaws.com/${params.Key}`;
  return url;
};
