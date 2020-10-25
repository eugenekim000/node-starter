const axios = require('axios');

//expiration date is set to one day ahead.
const expirationOffset = 24 * 3600;

async function get(courseId) {
  try {
    const res = await axios.get(
      `https://ep-coding-challenge-us-west-2.s3-us-west-2.amazonaws.com/courses/${courseId}`
    );

    //setting expiration date in unix time.
    let expirationDate = Math.floor(Date.now() / 1000) + expirationOffset;

    return {
      id: courseId,
      title: res.data.title,
      tags: res.data.tags,
      expirationDate,
    };
  } catch (err) {
    console.log(`Error finding course '${courseId}' from API`, err);

    return null;
  }
}

module.exports = {
  get,
};
