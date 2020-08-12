const { calc_age, calc_date } = require("../../lib/utils");

module.exports = {
  create(req, res) {
    return res.render("teachers/create");
  },
  index(req, res) {
    return res.render("teachers/index", { teachers: data.teachers });
  },
  show(req, res) {
    const { id } = req.params;

    return res.render("teachers/show", { teacher });
  },
  post(req, res) {
    let keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!");
      }
    }

    return res.redirect("/teachers");
  },
  edit(req, res) {
    const { id } = req.params;

    return res.render("teachers/edit", { teacher });
  },
  put(req, res) {
    const { id } = req.body;

    return res.redirect(`/teachers/${id}`);
  },
  delete(req, res) {
    const { id } = req.body;

    return res.redirect("/teachers");
  },
};
