const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  mobileNumber: String
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
