const db = require("../../config/db");
const { calc_date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(
      `
    SELECT teachers.*, count(students) as total_students
    FROM teachers 
    LEFT JOIN students 
    ON (students.teacher_id = teachers.id)
    GROUP BY teachers.id ORDER BY name ASC`,
      function (err, results) {
        if (err) throw `Database error! ${err}`;
        callback(results.rows);
      }
    );
  },

  create(data, callback) {
    const query = `
    INSERT INTO teachers(
      name, 
      avatar_url,
      birth_date,
      education_level,
      class_type,
      subjects_taught,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

    const values = [
      data.name,
      data.avatar_url,
      calc_date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      calc_date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database create error! ${err}`;
      console.log(results.rows[0]);
      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database find error! ${err}`;
      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE teachers SET
        avatar_url=($1),
        name=($2),
        birth_date=($3),
        education_level=($4),
        class_type=($5),
        subjects_taught=($6)
      WHERE id = $7
    `;

    const values = [
      data.avatar_url,
      data.name,
      calc_date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database update error! ${err}`;
      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database delete Error! ${err}`;

      return callback();
    });
  },

  findBy(filter, callback) {
    db.query(
      `
    SELECT teachers.*, count(students) as total_students
    FROM teachers 
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    WHERE teachers.name ILIKE '%${filter}%'
    OR teachers.subjects_taught ILIKE '%${filter}%'
    GROUP BY teachers.id ORDER BY name ASC`,
      (err, results) => {
        if (err) throw `Database error ${err}`;

        callback(results.rows);
      }
    );
  },
};
