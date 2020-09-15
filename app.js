import express from 'express';
import router from './router';

var bodyParser = require('body-parser');
const app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'))
app.use('/', router);

const PORT = 3000

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})