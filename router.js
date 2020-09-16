import express from 'express';
import {getStart, getProblem} from './controller';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Home'});
})

router.post('/exam', getStart)

router.get('/exam/problems/:id', getProblem)

export default router;