const axios = require('axios');

const subject = require('../course-api');

jest.mock('axios');

describe('course-api', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  describe('#get', () => {
    it('maps the response', async () => {
      const res = {
        data: {
          id: '15',
          title: 'Querying Data from PostgreSQL',
          tags: 'data-storage, postgresql',
        },
      };
      axios.get.mockResolvedValue(res);

      const course = await subject.get('15');

      expect(course).toEqual({
        id: '15',
        title: res.data.title,
        tags: res.data.tags,
        expirationDate: course.expirationDate,
      });
    });

    describe('on a non-200 response', () => {
      it('returns null', async () => {
        axios.get.mockRejectedValue({ status: '404' });

        const course = await subject.get('34');

        expect(course).toBeNull();
      });
    });
  });
});
