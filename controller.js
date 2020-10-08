import fs from 'fs';
import './func'

let nowProblems;
let probSize;
let userAnswer;
let isCorrect;

export const getHome = (req, res) => {
    res.render('home', {title: 'Home'});
}

export const getStart = (req, res) => {
    var problems = JSON.parse(fs.readFileSync('./assets/AWS-Developer V16.75.json').toString())
    probSize = req.body.probSize;
    nowProblems = problems.shuffle(probSize);

    userAnswer = [];
    isCorrect = new Array(probSize).fill(true)

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

export const getSubmit = (req, res) => {

    let wrongCnt = 0
    let answers = []
    let wrongIdx = []

    for(var i = 0; i < probSize; i++){
        answers.push(new Array(nowProblems[i].questions.length).fill(false))
    }
    
    for(var i = 0; i < probSize; i++){
        for(var j = 0; j < nowProblems[i].answer.length; j++){
            const ansIdx = nowProblems[i].answer[j].charCodeAt(0) - 'A'.charCodeAt(0)
            
            answers[i][ansIdx] = true
        }
    }

    for(var i = 0; i < probSize; i++){

        for(var j = 0; j < nowProblems[i].questions.length; j++){

            if(userAnswer[i][j] != answers[i][j]){
                isCorrect[i] = false
                wrongIdx.push(i + 1)
                wrongCnt++
                break
            }
        }
    }

    const CorrectAnswer = probSize - wrongCnt

    res.json({
            allCnt : probSize,
            CorrectAnswer,
            wrongProblem: wrongIdx
        })
}