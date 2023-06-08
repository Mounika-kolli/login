require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://Mounika:mounika1025@cluster0.bnhlo9o.mongodb.net/First', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.log('Error connecting to the database:', error);
});

// Create a schema for the registered person
const personSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  middleName: String,
  lastName: String,
  dob: Date,
  mobileNumber: String
});

// Create a model for the registered person
const Person = mongoose.model('Person', personSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.get('/flex', (req, res) => {
  res.render('flex.ejs');
});

app.post('/register', (req, res) => {
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

app.post('/login', (req, res) => {
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

app.get('/login', (req, res) => {
  res.render('login.ejs', { message: null });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
