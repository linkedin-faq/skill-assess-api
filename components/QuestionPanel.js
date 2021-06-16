import {useEffect, useState} from "react";

export default function QuestionPanel(question) {
    const basicClass = 'input-block-level form-control my-2'
    const [answerPresent, setAnswerPresent] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState('')

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
        console.log("CLicked", e.target.textContent)
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
                            question.question.options.map((item, index) => {
                                return (
                                    <button
                                        className={'btn btn-outline-primary ' + basicClass}
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
