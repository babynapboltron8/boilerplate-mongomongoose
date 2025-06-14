require('dotenv').config();
require('mongoose').connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = function (done) {
  const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['pizza', 'pasta'],
  });

  person.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = function (personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = function (personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    person.favoriteFoods.push('hamburger');
    person.save(function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = function (personName, done) {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = function (personId, done) {
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = function (done) {
  const foodToSearch = 'burrito';
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
