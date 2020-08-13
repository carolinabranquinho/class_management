const { calc_age, calc_date } = require("../../lib/utils");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page,
        };

        return res.render("students/index", {
          students,
          filter,
          pagination,
        });
      },
    };

    Student.paginate(params);
  },

  create(req, res) {
    Student.studentsSelectOption((options) => {
      return res.render("students/create", { students: options });
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

      Student.studentsSelectOption((options) => {
        return res.render("students/edit", { student, students: options });
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
