import express from 'express';
import router from './router';
import bodyParser from "body-parser";

const app = express();

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/'))
app.use('/', router);

const PORT = 3000

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})