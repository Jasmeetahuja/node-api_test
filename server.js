const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

require('./app/routes/note.routes')(app);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to database');
}).catch(err => {
    console.log('Could not connect to database', err);
    process.exit();
});

app.get('/', (req,res)=> {
    res.send('this is api test')
});
app.listen(3000, ()=> {
    console.log('hello api');
});