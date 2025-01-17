const request = require('supertest');

const createApp = require('../app');
const courseDb = require('../course-db');
const db = require('../sqlite-wrapper');
const courseApi = require('../course-api');

jest.mock('../course-api');
jest.mock('../course-db');

describe('app', () => {
  let app;

  beforeAll(async () => {
    await db.connect(':memory:');
    await courseDb.createTable();
    app = createApp();

    courseDb.get.mockReset();
    courseDb.upsert.mockReset();
    courseApi.get.mockReset();
  });
  afterAll(() => {
    return db.close();
  });

  describe('GET /course/:id', () => {
    it('gets a course by ID', async () => {
      const course = {
        id: '6',
        title: 'Node.js: Getting Started',
        tags: 'back-end-web-development',
        expirationDate: Math.floor(Date.now() / 1000),
      };

      await courseDb.upsert(course);
      courseApi.get.mockResolvedValue(course);

      const res = await request(app).get(`/courses/${course.id}`).send();
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(course);
    });

    describe('when the course does not exist', () => {
      it('returns 404', async () => {
        courseApi.get.mockResolvedValue(null);

        const res = await request(app).get('/courses/derp').send();

        expect(res.status).toEqual(404);
      });
    });
  });
});
