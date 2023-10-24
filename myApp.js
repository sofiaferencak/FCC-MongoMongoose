require('dotenv').config();

let mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log(`successfully connected`);
  }).catch((e)=>{
  console.log(`not connected`);
  });

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const sofiaFerencak = new Person({
    name: "Sofia Ferencak", 
    age: 28, 
    favoriteFoods: ["Pasta", "Meat", "Eggs"]
  });
  sofiaFerencak.save(function(err, data) {
       if (err) return console.error(err);
       done(null, data);
  })
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
       if (err) return console.error(err);
       done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, function(err, personFound) {
       if (err) return console.error(err);
       done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, function(err, data) {
       if (err) return console.error(err);
       done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
       if (err) return console.error(err);
       done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedperson) => {
      if (err) return console.error(err);
       done(null, updatedperson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, (err, updatedDoc) => {
    if (err) return console.error(err);
     done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removeDoc) => {
    if (err) return console.error(err);
    done(null, removeDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if (err) return console.error(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    /*name : 0 means name false so hide and 1 meanst true don't hide */
    .exec((err, data) => {
    if (err) return console.error(err);
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
