// @ts-nocheck
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_PUBLIC_S3_ACCESS,
    secretAccessKey: import.meta.env.VITE_PUBLIC_S3_SECRET_ACCESS,
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

export const uploadVideoToS3 = async (fileObject, postTitle) => {
  if (!fileObject || !fileObject.url) {
    throw new Error("Invalid file object");
  }
  // Fetch the Blob from the URL
  const response = await fetch(fileObject.url);
  const blob = await response.blob();
  const fileName = fileObject.name || `video-${Date.now()}`; // 파일 이름 설정
  const params = {
    Bucket: "bilog-hb",
    Key: `post/${postTitle}/${fileName}`,
    Body: blob,
    ACL: "public-read",
    ContentType: blob.type, // Blob에서 Content-Type 가져오기
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  const url = `https://bilog-hb.s3.us-east-1.amazonaws.com/${params.Key}`;
  return url;
};