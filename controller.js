import fs from 'fs';
import {} from './func'

var nowProblems;
var probSize;
var userAnswer;

export const getStart = (req, res) => {
    var problems = JSON.parse(fs.readFileSync('./assets/AWS-Developer V16.75.json').toString())
    probSize = req.body.probSize;
    nowProblems = problems.shuffle(probSize);

    userAnswer = [];

    for(var i = 0; i < probSize; i++){
        userAnswer.push(new Array(problems[i].questions.length).fill(false))
    }

    res.render("exam", {
        title: "Exam Page",
        size: probSize
    })
}

export const postChooseProblem = async (req, res) => {

    const probNum = req.params.id - 1;
    // 눌린 문제 번호

    const {
        body: {
            check
        }
    } = req

    userAnswer[probNum][check] = !userAnswer[probNum][check]

    var isCheck = false;

    for(var i = 0; i < userAnswer[probNum].length; i++){
        if(userAnswer[probNum][i]){
            isCheck = true
            break
        }
    }
    
    res.json({
        pNum: probNum + 1,
        isCheck
    })
}

export const getProblem = (req, res) => {
    const probNum = req.params.id - 1;

    res.json({
        description: nowProblems[probNum].description,
        questions: nowProblems[probNum].questions,
        answer: nowProblems[probNum].answer,
        checks: userAnswer[probNum]
    })
}