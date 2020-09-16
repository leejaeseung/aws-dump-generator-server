import fs from 'fs';
import {} from './func'

var nowProblems;
var probSize;

export const getStart = (req, res) => {
    var problems = JSON.parse(fs.readFileSync('./assets/AWS-Developer V16.75.json').toString())
    probSize = req.body.probSize;
    nowProblems = problems.shuffle(probSize);

    res.render("exam", {
        title: "Exam Page",
        size: probSize,
        description: nowProblems[0].description,
        questions: nowProblems[0].questions,
        answer: nowProblems[0].answer
    })
}

export const getProblem = (req, res) => {
    const probNum = req.params.id - 1;
    res.json({
        description: nowProblems[probNum].description,
        questions: nowProblems[probNum].questions,
        answer: nowProblems[probNum].answer
    })
}