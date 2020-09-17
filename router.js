import express from 'express';
import {getStart, getProblem, postChooseProblem} from './controller';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Home'});
})

router.post('/exam', getStart)

router.post('/exam/problems/:id', postChooseProblem)
router.get('/exam/problems/:id', getProblem)

export default router;