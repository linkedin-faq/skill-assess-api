import {useEffect, useState} from "react";
import Parser from 'html-react-parser';
let remark = require('remark')
let recommended = require('remark-preset-lint-recommended')
let html = require('remark-html')

export default function QuestionPanel(question) {
    let illustrator
    const basicClass = 'btn btn-outline-primary input-block-level form-control my-2'
    const [answerPresent, setAnswerPresent] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [answered, setAnswered] = useState(false)

    // using this to beautify the code in question
    remark()
        .use(recommended)
        .use(html)
        .process(question.question.illustrator, (e, file) => {
            illustrator = String(file)
        })

    useEffect(() => {
        setCorrectAnswer(checkOptions())
        setAnswerPresent((checkOptions() != ''))
    })

    const checkOptions = () => {
        let answer = ''
        question.question.options.forEach((option) => { if(option.correct) answer = option.text })

        return answer
    }

    const answer = (e) => {
        setAnswered(true)
        if(answerPresent) {
            if (e.target.textContent == correctAnswer) {
                e.target.setAttribute('class', 'btn btn-success ' + basicClass)
            } else {
                e.target.setAttribute('class', 'btn btn-danger ' + basicClass)
            }


        } else {
            alert('Sorry we dont know the answer either, please research to verify')
        }
    }

    return (
        <div>
            <div className="card">
                    <div className="card-body">
                        <p className="card-text">{question.question.question}</p>
                        <hr/>
                        {
                            question.question.illustrator ? (
                                <pre>{Parser(illustrator)}</pre>
                            ) : (
                                ''
                            )
                        }
                        {
                            question.question.options.map((item, index) => {
                                return (
                                    <button
                                        disabled={answered}
                                        className={ basicClass }
                                        key={index}
                                        onClick={(e) => answer(e)}
                                    >
                                        {item.text}
                                    </button>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    )
}
