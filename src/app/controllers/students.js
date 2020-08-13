const { calc_age, calc_date } = require("../../lib/utils");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {
    const { filter } = req.query;

    if (filter) {
      Student.findBy(filter, (students) => {
        return res.render("students/index", { students, filter });
      });
    } else {
      Student.all((students) => {
        return res.render("students/index", { students });
      });
    }
  },

  create(req, res) {
    Student.teachersSelectOption((options) => {
      return res.render("students/create", { teachers: options });
    });
  },

  show(req, res) {
    const { id } = req.params;

    Student.find(id, (student) => {
      if (!student) return res.send("Student not found!");

      student.birth = calc_age(student.birth);

      return res.render("students/show", { student });
    });
  },

  post(req, res) {
    let keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!");
      }
    }

    Student.create(req.body, (student) => {
      return res.redirect(`/students/${student.id}`);
    });
  },

  edit(req, res) {
    const { id } = req.params;

    Student.find(id, (student) => {
      if (!student) return res.send("Student not found!");

      student.birth = calc_date(student.birth).iso;

      Student.teachersSelectOption((options) => {
        return res.render("students/edit", { student, teachers: options });
      });
    });
  },

  put(req, res) {
    const { id } = req.body;
    let keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please fill all fields!");
    }

    Student.update(req.body, () => {
      return res.redirect(`/students/${id}`);
    });
  },

  delete(req, res) {
    const { id } = req.body;

    Student.delete(id, () => {
      return res.redirect("/students");
    });
  },
};
