import express from 'express';
import {getHome, getStart, getProblem, postChooseProblem, getSubmit} from './controller';

const router = express.Router();

router.get('/', getHome)

router.post('/exam', getStart)

router.post('/exam/problems/:id', postChooseProblem)
router.get('/exam/problems/:id', getProblem)

router.get('/submit', getSubmit)

export default router;