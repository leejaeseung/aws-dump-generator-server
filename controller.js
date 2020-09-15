import fs from 'fs';
import {} from './func'

var nowProblems
const size = 65

export const getStart = (req, res, next) => {
    var problems = JSON.parse(fs.readFileSync('./assets/AWS-Developer V16.75.json').toString())
    var pnum = req.body.pnum;
    nowProblems = problems.shuffle(pnum);

    res.render("exam", {
        title: "Exam Page",
        size: pnum,
        desc: nowProblems[0].description
    })
}

export const getProblem = (req, res, next) => {
    
    const problem_num = req.params.id - 1;

    console.log(nowProblems[problem_num].description)
    
    /*res.render('exam', {
        title: "Exam Page",
        size,
        desc: nowProblems[problem_num].description
    })*/

    res.json(nowProblems[problem_num].description)
}