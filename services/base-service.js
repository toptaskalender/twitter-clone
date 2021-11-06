class BaseService {
  constructor(model) {
    this.model = model;
  }

  save(objects) {
    return this.model.insertMany(objects);
  };
  
  load() {
    return this.model.find();
  }
  
  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object, { returnDocument: 'after' });
  }
  
  async insert(object) {
    return this.model.create(object);
  };
  
  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  };

  async findById(id) {
    return this.model.findById(id);
  }
  
  async findBy(property, value) {
    return this.model.find( { [property] : value } );
  }
}

module.exports = BaseService;