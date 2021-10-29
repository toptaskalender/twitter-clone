const fs                    = require('fs');
const { stringify, parse }  = require('flatted');
const colors                = require('colors');

class BaseDatabase {
  constructor(model){
    this.model    = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${__dirname}/${this.filename}.json`, stringify(objects, null, 2), (err) => {
        if (err) reject(err);
        resolve();
      } );
    })
  };
  
  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/${this.filename}.json`, 'utf-8', (err, file) => {
        if (err) reject(err);
        
        const objects = parse(file);
        resolve(objects.map(this.model.create));
      });
    })
  }
  
  async update(object) {
    const users = await this.load();
    
    const userIndex = users.findIndex(u => u.id === object.id);

    if (userIndex === -1 )
      throw new Error('Cannot find user')
    
    users.splice(userIndex, 1, object)
  
    await this.save(users);
  }
  
  async insert(object) {
    const objects = await this.load()

    if ( !(object instanceof this.model) ) {
      object = this.model.create(object)
    }
    
    await this.save(objects.concat(object));

    return object;
  };
  
  async remove(objects) {
    const users = await this.load();

    objects.forEach(o => {
      const index = users.findIndex(user => user.id === o.id);
      if (index === -1) {
        console.log(`You've already removed ${colors.red(o.firstName)}.`);
        return;
      }
      users.splice(index, 1);
    })
  
    return this.save(users);
  };
  
  async findBy(property, value) {
    return (await this.load()).find(u => u[property] === value);
  }
}

module.exports = BaseDatabase;