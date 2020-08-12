const db = require("../../config/db");
const { calc_date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM students ORDER BY name ASC`, function (
      err,
      results
    ) {
      if (err) throw `Database error! ${err}`;
      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
    INSERT INTO students(
      name, 
      avatar_url,
      birth,
      email,
      schooling,
      type_class,
      hours
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

    const values = [
      data.name,
      data.avatar_url,
      calc_date(data.birth).iso,
      data.email,
      data.schooling,
      data.type_class,
      data.hours,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database create error! ${err}`;
      console.log(results.rows[0]);
      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`SELECT * FROM students WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database find error! ${err}`;
      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        email=($3),
        birth=($4),
        schooling=($5),
        type_class=($6),
        hours=($7)
      WHERE id = $8
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      calc_date(data.birth).iso,
      data.schooling,
      data.type_class,
      data.hours,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database update error! ${err}`;
      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database delete Error! ${err}`;

      return callback();
    });
  },
};
