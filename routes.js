const express = require('express');
const router = express.Router();
const Person = require('./person');

router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/register', (req, res) => {
  res.render('register.ejs');
});

router.get('/flex', (req, res) => {
  res.render('flex.ejs');
});

router.post('/register', (req, res) => {
  // Retrieve form data from the request body
  const { email, password, firstName, middleName, lastName, dob, mobileNumber } = req.body;

  // Create a new person object
  const newPerson = new Person({
    email,
    password,
    firstName,
    middleName,
    lastName,
    dob,
    mobileNumber
  });

  // Save the new person to the database
  newPerson.save().then(() => {
    console.log('Registered person saved to the database');
    res.redirect('/login');
  }).catch((error) => {
    console.log('Error saving registered person:', error);
    res.redirect('/register');
  });
});

router.post('/login', (req, res) => {
  // Retrieve form data from the request body
  const { email, password } = req.body;

  // Find the person with the given email and password in the database
  Person.findOne({ email, password }).then((person) => {
    if (person) {
      console.log('Login successful');
      res.redirect('/flex');
    } else {
      console.log('Invalid email or password');
      res.render('login.ejs', { message: 'Invalid email or password.' });
    }
  }).catch((error) => {
    console.log('Error finding person:', error);
    res.redirect('/login');
  });
});

router.get('/login', (req, res) => {
  res.render('login.ejs', { message: null });
});

module.exports = router;
