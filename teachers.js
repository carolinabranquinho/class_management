const fs = require("fs");
const data = require("./data.json");
const { calc_age, calc_date } = require("./utils");

exports.show = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher doesn't exist!");

  const teacher = {
    ...foundTeacher,
    age: calc_age(foundTeacher.birth),
    subjects: foundTeacher.subjects.split(","),
    date: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
  };

  return res.render("teachers/show", { teacher });
};

exports.post = function (req, res) {
  let keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields!");
    }
  }

  let { avatar_url, name, birth, scholarity, type_class, subjects } = req.body;

  birth = Date.parse(req.body.birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    scholarity,
    type_class,
    subjects,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    return err ? res.send("Write file error!") : res.redirect("/teachers");
  });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find((teacher) => {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher doesn't exist!");

  const teacher = {
    ...foundTeacher,
    birth: calc_date(foundTeacher.birth),
  };

  return res.render("teachers/edit", { teacher });
};
