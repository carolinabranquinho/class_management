const fs = require("fs");
const data = require("../data.json");
const { calc_age, calc_date } = require("../utils");

exports.create = function (req, res) {
  return res.render("students/create");
};

exports.index = function (req, res) {
  return res.render("students/index", { students: data.students });
};

exports.show = function (req, res) {
  const { id } = req.params;

  const foundstudent = data.students.find((student) => {
    return student.id == id;
  });

  if (!foundstudent) return res.send("student doesn't exist!");

  const student = {
    ...foundstudent,
    age: calc_age(foundstudent.birth),
    date: new Intl.DateTimeFormat("pt-BR").format(foundstudent.created_at),
  };

  return res.render("students/show", { student });
};

exports.post = function (req, res) {
  let keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields!");
    }
  }

  let {
    avatar_url,
    name,
    birth,
    email,
    scholarity,
    subjects,
    type_class,
    hours,
  } = req.body;

  birth = Date.parse(req.body.birth);
  const id = Number(data.students.length + 1);

  data.students.push({
    id,
    ...req.body,
    birth: birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    return err ? res.send("Write file error!") : res.redirect("/students");
  });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundstudent = data.students.find((student) => {
    return student.id == id;
  });

  if (!foundstudent) return res.send("student doesn't exist!");

  const student = {
    ...foundstudent,
    birth: calc_date(foundstudent.birth),
  };

  return res.render("students/edit", { student });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundstudent = data.students.find((student, foundIndex) => {
    if (student.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundstudent) return res.send("student doesn't exist!");

  const student = {
    ...foundstudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
  };

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    return err
      ? res.send("student not found!")
      : res.redirect(`/students/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredstudents = data.students.filter((student) => {
    return student.id !== id;
  });

  data.students = filteredstudents;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    return err ? res.send("Write File error") : res.redirect("/students");
  });
};
