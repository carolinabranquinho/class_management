const { calc_age, calc_date } = require("../../lib/utils");
import Teacher from "../models/Teacher";

module.exports = {
  index(req, res) {
    Teacher.all((teacher) => {
      return res.render("teachers/index", { teacher });
    });
  },

  create(req, res) {
    return res.render("teachers/create");
  },

  post(req, res) {
    let keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!");
      }
    }

    Teacher.create(req.body, (teacher) => {
      return res.redirect(`/teachers/${teacher.id}`);
    });
  },

  show(req, res) {
    const { id } = req.params;

    Teacher.find(id, (teacher) => {
      if (!teacher) return res.send("Teacher not found");

      teacher.age = calc_age(teacher.birth_date);
      teacher.subjects_taught = teacher.subjects_taught.split(",");
      teacher.created_at = calc_date(teacher.created_at).format;

      return res.render("teachers/show", { teacher });
    });
  },

  edit(req, res) {
    const { id } = req.params;
    Teacher.find(id, (teacher) => {
      if (!teacher) return res.send("Teacher not found!");

      teacher.birth_date = calc_date(teacher.birth_date).iso;

      return res.render("teachers/edit", { teacher });
    });
  },

  put(req, res) {
    let keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") return res.send("Please, fill all fields!");
    }

    Teacher.update(req.body, () => {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },

  delete(req, res) {
    const { id } = req.body;

    Teacher.delete(id, () => {
      return res.redirect("/teachers");
    });
  },
};
