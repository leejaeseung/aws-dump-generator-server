import fs from 'fs';
import {} from './func'

var nowProblems

export const getStart = (req, res, next) => {

    const size = 65
    var problems = JSON.parse(fs.readFileSync('./assets/AWS-Developer V16.75.json').toString())
    
    console.log(problems.length)

    nowProblems = problems.shuffle(size);

    console.log(nowProblems.length)

    res.render("exam", {
        title: "Exam Page",
        size
    })
}

export const getProblem = (req, res, next) => {

}