const fs = require("fs");
const data = require("./data.json");

exports.show = function (req, res) {};

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
