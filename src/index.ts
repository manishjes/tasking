import express, {Express} from 'express';
import mongoose from 'mongoose';
import databaseConnection from './config/db';
import dotenv from 'dotenv';
import router from './routes/index'
import cronjob from './helpers/cronjob';
import path = require('path');

dotenv.config()

const app:Express = express();


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
databaseConnection(process.env.LOCAL_URL);
router(app)
cronjob();



app.listen(process.env.PORT, ()=>{
    console.log(`port is  running on ${process.env.PORT}`)
})
