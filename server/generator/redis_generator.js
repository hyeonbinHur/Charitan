// @ts-ignore
import redis from "redis";
//redis-server 레디스 시작
//redis-cli 레디스 클라이언트 접속
//shutdown 레디스 종료

// 0에서 커서 시작, customer가 들어간 키를 찾고, count는 한번에 가지고올 수 있는 최대 키값 갯수
// const customerKeys = await client.scan(0, {
//   MATCH: "customer:*",
//   COUNT: pageSize,
// });

const client = redis.createClient({
  socket: {
    host: "localhost", // Redis 서버 주소
    port: 6379, // Redis 포트
  },
});
// Redis 연결
client.connect().catch((err) => console.error("Redis connection failed:", err));

async function setProjectFromCache(project_id, project) {
  // user_name 필드에 userName 값을 저장
  await client.hSet(`project_id:${project_id}`, { project });
  await client.expire(`project_id:${project_id}`, 300);
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
  await client.hSet(`project_id:${project_id}`, project);
}

export {
  setProjectFromCache,
  getProjectFromCache,
  deleteProjectFromCache,
  updateProjectFromCache,
};
