const fs                    = require('fs');
const { stringify, parse }  = require('flatted');

const save = (filename, objects) => {
  fs.writeFileSync(`${filename}.json`, stringify(objects, null, 2));
};

const load = filename => {
  const file = fs.readFileSync(`${filename}.json`, 'utf-8');
  return parse(file);
}

const update = (filename, object) => {
  const users     = load(filename);
  const userIndex = users.findIndex(u => u.id === object.id);

  users.splice(userIndex, 1, object);
  save(filename, users);
}

const insert = (filename, object) => {
  const users = load(filename);
  save(filename, users.concat(object))
};

const remove = (filename, username) => {
  const users         = load(filename);
  const updatedUsers  = users.filter(u => u.username !== username); 
  save(filename, updatedUsers);
};

module.exports = {
  save,
  load,
  update,
  insert,
  remove
}