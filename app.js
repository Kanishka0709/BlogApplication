require("dotenv").config();

const express = require("express");
const expressLayout=require('express-ejs-layouts');
const cookieParser =require('cookie-parser');
const session = require('express-session');
const connectDB=require('./server/config/db');
const MongoStore = require('connect-mongo');
const adminRoutes = require('./server/routes/admin');

const app = express();
const PORT = process.env.PORT||5001;

//Connect to DB
connectDB();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/testdb',
  }),
}));

app.use(express.static('public'));

app.use(expressLayout);
app.set('layout','./layouts/main');

app.set('view engine','ejs');

app.use('/admin',adminRoutes);
app.use('/',require('./server/routes/main'));
app.use('/', require('./server/routes/userRoutes'));
app.get('/admin',function(req,res){
  res.render('admin/index');
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

