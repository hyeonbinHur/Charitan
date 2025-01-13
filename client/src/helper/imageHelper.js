import Resizer from "react-image-file-resizer";
import { uploadFileToS3 } from "../lib/s3Option";

export const resizePostImage = (file) =>
  new Promise((res) => {
    Resizer.imageFileResizer(
      file,
      1600,
      500,
      "JPEG",
      100,
      0,
      (uri) => res(uri),
      "file"
    );
  });

export const convertBase64ToImage = (dataurl, fileName) => {
  let arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid Base64 data URL: MIME type not found");
  }
  const mime = mimeMatch[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

export const optimizeHTMLImage = async (htmlString, title) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const imgElements = Array.from(doc.getElementsByTagName("img"));
  if (imgElements.length > 15) {
    return false;
  }
  for (const img of imgElements) {
    if (img.src.startsWith("data:image")) {
      // base64 이미지 src를 file 형태로 변경
      const file = convertBase64ToImage(img.src, img.alt);
      // 바꾼 file을 최적화 (크기 줄이기)
      const resizedImage = await resizePostImage(file);
      if (resizedImage instanceof File) {
        // AWS에 업로드
        console.log(title);
        const awsURL = await uploadFileToS3(resizedImage, title);
        img.src = awsURL; // 이미지 src 업데이트
      }
    }
  }
  const updatedHTML = doc.documentElement.outerHTML;
  return updatedHTML;
};
