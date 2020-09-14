import express from 'express';
import {getStart, getProblem} from './controller';

const router = express.Router();

router.get('/', (req, res) => {

    console.log("?")

    res.render('test', {title: 'Start Page'});
})

router.get('/exam', getStart)

router.get('/exam/problems/:id', getProblem)

export default router;