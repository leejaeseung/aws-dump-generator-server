import fs from 'fs';
import {} from './func'

var nowProblems;
var probSize;
var userAnswer = [];

export const getStart = (req, res) => {
    var problems = JSON.parse(fs.readFileSync('./assets/AWS-Developer V16.75.json').toString())
    probSize = req.body.probSize;
    nowProblems = problems.shuffle(probSize);

    for(var i = 0; i < probSize; i++){
        userAnswer.push(new Array(problems[i].questions.length).fill(false))
    }

    res.render("exam", {
        title: "Exam Page",
        size: probSize
        //description: nowProblems[0].description,
        //questions: nowProblems[0].questions,
        //answer: nowProblems[0].answer
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

    var answerString = ""

    for(var i = 0; i < userAnswer[probNum].length; i++){
        const nowQ = String.fromCharCode(i + 'A'.charCodeAt(0));

        if(userAnswer[probNum][i]){
            if(i < userAnswer[probNum].length - 1)
                answerString += nowQ + ", "
            else
                answerString += nowQ
        }
    }

    console.log(answerString)
    
    res.json({
        pNum: probNum + 1,
        userAnswer: answerString,
    })
}

export const getProblem = (req, res) => {
    const probNum = req.params.id - 1;

    /*for(var i = 0; i < userAnswer[probNum].length; i++){
        index = userAnswer[probNum].charCodeAt(0) - 'A'.charCodeAt(0)
        checkList.push(index)
    }*/

    res.json({
        description: nowProblems[probNum].description,
        questions: nowProblems[probNum].questions,
        answer: nowProblems[probNum].answer,
        checks: userAnswer[probNum]
    })
}