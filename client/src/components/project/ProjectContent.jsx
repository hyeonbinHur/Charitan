import parse from "html-react-parser";

const extractBodyContent = (html) => {
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerHTML; // body 내부의 HTML만 추출
  }
  return html; // 서버에서 실행될 경우 원본 HTML 반환
};

const ProjectContent = ({ htmlContent }) => {
  const contentWithoutHtmlTags = extractBodyContent(htmlContent);
  return <div>{parse(contentWithoutHtmlTags)}</div>;
};

export default ProjectContent;
