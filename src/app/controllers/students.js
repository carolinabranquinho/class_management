const { calc_age, calc_date } = require("../../lib/utils");

module.exports = {
  create(req, res) {
    return res.render("students/create");
  },
  index(req, res) {
    return res.render("students/index");
  },
  show(req, res) {
    const { id } = req.params;

    return res.render("students/show");
  },
  post(req, res) {
    let keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!");
      }
    }

    return res.redirect("/students");
  },
  edit(req, res) {
    const { id } = req.params;

    return res.render("students/edit");
  },
  put(req, res) {
    const { id } = req.body;

    return res.redirect(`/students/`);
  },
  delete(req, res) {
    const { id } = req.body;

    return res.redirect("/students");
  },
};
