// @ts-ignore
import redis from "redis";

const client = redis.createClient({
  socket: {
    host: "localhost", // Redis 서버 주소
    port: 6379, // Redis 포트
  },
});
client.connect().catch((err) => console.error("Redis connection failed:", err));

async function setProjectFromCache(project_id, project) {
  console.log("here");
  // 각 필드의 값을 명시적으로 문자열 또는 숫자 형식으로 변환
  const projectData = {
    project_id: String(project.project_id),
    charity_id: String(project.charity_id),
    title: project.title || "",
    description: project.description || "",
    category: project.category || "",
    target_amount: String(project.target_amount),
    current_funding: String(project.current_funding),
    status: project.status || "",
    created_at: String(project.created_at),
    updated_at: String(project.updated_at) || "",
    bankaccount: project.bankaccount || "",
    charity_name: project.charity_name || "",
    thumbnail: project.thumbnail || "",
    video_1: project.video_1 || "",
    video_2: project.video_2 || "",
    video_3: project.video_3 || "",
    video_4: project.video_4 || "",
  };

  // Redis에 전달
  await client.hSet(`project_id:${project_id}`, projectData);

  // 캐시 만료 시간 설정
  client.expire(`project_id:${project_id}`, 300);
}

async function getProjectFromCache(project_id) {
  const project = await client.hGetAll(`project_id:${project_id}`);
  const normalizedProject = Object.assign({}, project);
  return normalizedProject;
}
async function deleteProjectFromCache(project_id) {
  try {
    await client.del(`project_id:${project_id}`); // 전체 사용자 데이터를 삭제
  } catch (err) {
    console.error("Error deleting user:", err);
  }
}
async function updateProjectFromCache(project_id, project) {
  await client.hSet(`project_id:${project_id}`, {
    project_id: String(project.project_id),
    charity_id: String(project.charity_id),
    title: project.title || "",
    description: project.description || "",
    category: project.category || "",
    target_amount: String(project.target_amount),
    current_funding: String(project.current_funding),
    status: project.status || "",
    created_at: String(project.created_at),
    updated_at: String(project.updated_at) || "",
    bankaccount: project.bankaccount || "",
    charity_name: project.charity_name || "",
    thumbnail: project.thumbnail || "",
  });
}

export {
  setProjectFromCache,
  getProjectFromCache,
  deleteProjectFromCache,
  updateProjectFromCache,
};
