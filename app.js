import express from 'express';
import router from './router';
import path  from 'path';

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.static(__dirname + '/'))
app.use('/', router);

const PORT = 3000

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})