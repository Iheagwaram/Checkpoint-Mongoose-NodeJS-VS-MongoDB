// Import required modules
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create Person Model
const Person = mongoose.model('Person', personSchema);

// Create and save a record of a Person
const createPerson = (done) => {
  const person = new Person({ name: 'John Doe', age: 30, favoriteFoods: ['Pizza', 'Burger'] });
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create multiple records
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find people by name
const findPeopleByName = (name, done) => {
  Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find one person by favorite food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find person by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Update a person by ID
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

// Find one person by name and update age
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    }
  );
};

// Delete one person by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if (err) return console.error(err);
    done(null, deletedPerson);
  });
};

// Delete all people with the name 'Mary'
const removeManyPeople = (done) => {
  Person.deleteMany({ name: 'Mary' }, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
  });
};

// Search query helpers to narrow search results
const queryChain = (done) => {
  Person.find({ favoriteFoods: 'Burrito' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
