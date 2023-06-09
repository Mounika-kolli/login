const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Mounika:mounika1025@cluster0.bnhlo9o.mongodb.net/First', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to the database');
  } catch (error) {
    console.log('Error connecting to the database:', error);
  }
};

module.exports = connectDB;
