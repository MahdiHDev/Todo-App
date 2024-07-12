const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// environment file execution
dotenv.config();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const todoRoutes = require('./routes/todoRoutes');
const editRoutes = require('./routes/editRoutes');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

const middlewares = [
    cors(),
    express.json(),
    cookieParser(process.env.COOKIE_SECRET_KEY),
    express.static('public'),
    express.urlencoded({ extended: true }),
];
app.use(middlewares);

// Handle Routes
app.use('/signup', userRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/', todoRoutes);
app.use('/edit', editRoutes);

app.get('*', (req, res) => {
    res.render('404.ejs');
});

const PORT = process.env.PORT || 4444;

// connection to database and starting the server
mongoose.connect('mongodb://localhost:27017/todoApplication').then(() => {
    console.log('Database connected successfully!');
    app.listen(PORT, () => {
        console.log(`App Listen on PORT ${PORT}`);
    });
});
