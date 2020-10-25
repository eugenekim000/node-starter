const db = require('./sqlite-wrapper');

async function createTable() {
  const statement = `
    create table if not exists courses (
      id text primary key,
      title text not null,
      tags text not null,
      expirationDate unsigned int(11) not null
    );`;

  return db.execute(statement);
}

async function get(courseId) {
  return db.get(
    'select id, title, tags, expirationDate from courses where id = $id;',
    {
      $id: courseId,
    }
  );
}

async function upsert(course) {
  const statement = `
    insert into courses (id, title, tags, expirationDate)
    values ($id, $title, $tags, $expirationDate)
    on conflict(id) do update set title = $title, tags = $tags, expirationDate = $expirationDate;`;

  return db.execute(statement, {
    $id: course.id,
    $title: course.title,
    $tags: course.tags,
    $expirationDate: course.expirationDate,
  });
}

module.exports = {
  createTable,
  get,
  upsert,
};
