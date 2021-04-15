require("dotenv").config();
var mongoose = require("mongoose");

// connecting to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person;

// creating a schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// ceating a model
Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  var user = new Person({
    name: "Sabri",
    age: 30,
    favoriteFoods: ["Taco", "icecream", "meat"],
  });
  user.save(function (err, data) {
    if (err) done(error);
    done(null, data);
  });
};

//Create Many Records with model.create() seeding a database, model.create() return a promise
var arrayOfPeople = [
  {
    name: "Sabri",
    age: 30,
    favoriteFoods: ["Taco"],
  },
  {
    name: "Sabri1",
    age: 30,
    favoriteFoods: ["Taco", "icecream"],
  },
  {
    name: "Sabri2",
    age: 30,
    favoriteFoods: ["Taco", "icecream", "meat"],
  },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((data) => done(null, data))
    .catch((err) => done(err));
};

//Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName })
    .then((thatPerson) => {
      console.log(thatPerson);
      done(null, thatPerson);
    })
    .catch((err) => done(err));
};

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food })
    .then((thatPerson) => {
      console.log(thatPerson);
      done(null, thatPerson);
    })
    .catch((err) => done(err));
};

//Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId })
    .then((thatPerson) => {
      console.log(thatPerson);
      done(null, thatPerson);
    })
    .catch((err) => done(err));
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId })
    .then((thatPerson) => {
      thatPerson.favoriteFoods.push(foodToAdd);
      thatPerson.save(function (err, doc) {
        if (err) done(err);
        done(null, thatPerson);
      });
    })
    .catch((err) => done(err));
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  )
    .then((thatPerson) => {
      thatPerson.save(function (err, doc) {
        if (err) done(err);
        done(null, doc);
      });
    })
    .catch((err) => done(err));
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId })
    .then((thatPerson) => {
      done(null, thatPerson);
    })
    .catch((err) => done(err));
};

//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}).then(removedDoc=>{
    done(null,removedDoc)
  }).catch(err=>done(err))
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
