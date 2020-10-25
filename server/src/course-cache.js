const courseDb = require('./course-db');
const courseApi = require('./course-api');

function notExpired(timestamp) {
  let currentTime = Math.floor(Date.now() / 1000);
  if (currentTime < timestamp) return true;
  return false;
}

async function get(courseId) {
  const result = await courseDb.get(courseId);

  if (result && notExpired(result.expirationDate)) return result;

  const course = await courseApi.get(courseId);

  if (course) await courseDb.upsert(course);

  return course;
}

module.exports = {
  get,
};
