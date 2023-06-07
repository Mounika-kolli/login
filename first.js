require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

let personList = [];

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

  // Perform validation and handle the registration logic here

  // Add the registered person to the personList
  personList.push({
    email,
    password,
    firstName,
    middleName,
    lastName,
    dob,
    mobileNumber
  });

  // Redirect to the login page
  res.redirect('/login');
});
app.post('/login', (req, res) => {
  // Perform login logic here

  // Redirect to the flex page
  res.redirect('/flex');
});
app.get('/login', (req, res) => {
  res.render('login.ejs');
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
