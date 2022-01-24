import Layout from "../../components/Layout";
import {getQuizesWithAnswer, getSkillQuizes} from "../../lib/skills";
import {useEffect, useState} from "react";
import QuestionPanel from "../../components/QuestionPanel";

export default function ({topic, skillQuizes}) {
    const [questions, setQuestions] = useState(skillQuizes)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questionNo, setQuestionNo] = useState(0)
    const [answerOnly, setAnswerOnly] = useState(false)
    const [answered, setAnswered] = useState(false)

    const nextQuestion = (e) => {
        setAnswered(false)
        e.preventDefault()
        setCurrentQuestion(parseInt(currentQuestion) + 1)
        setQuestionNo(parseInt(currentQuestion) + 1)
    }

    const changeQuestionNo = (e) => {
        setQuestionNo( e.target.value)
        if(e.target.value != '') setCurrentQuestion(e.target.value)
    }

    const handleAnswerOnly = async () => {
        const quizes = answerOnly ? await getSkillQuizes(topic) : await getQuizesWithAnswer(topic)

        setQuestions(quizes)
        setAnswerOnly(!answerOnly)
    }

    return (
        <div>
            <Layout/>
            <div className={'container'}>
                <div className={'row  justify-content-center d-flex'}>
                    <div className="col-md-5 col-sm-12 justify-content-center d-flex form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="answerOnly"
                            checked={answerOnly}
                            onChange={() => handleAnswerOnly()}
                        />
                        <label className="ms-3 form-check-label" htmlFor="flexSwitchCheckDefault">
                            Question with answer only?
                        </label>
                    </div>
                    <div className={'col-7 justify-content-center d-flex my-2'}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                    Between {0} and {((questions && questions.length) || 0) - 1}
                                </span>
                            </div>
                            <input
                                className="form-control"
                                id="questionNo"
                                aria-describedby="emailHelp"
                                placeholder="Go to question no."
                                value={questionNo}
                                onChange={(e) => changeQuestionNo(e)}
                            />
                        </div>
                    </div>
                </div>
                {questions && questions[currentQuestion] ?
                    <>
                        <QuestionPanel question={questions[currentQuestion]} key={currentQuestion}/>
                        <div className={'d-flex flex-row-reverse'}>
                            <button className={'btn btn-secondary my-2'} onClick={(e) => nextQuestion(e)}>NEXT</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="card">
                            <h3>
                                No questions to ask
                            </h3>
                        </div>
                        <div className={'d-flex flex-row-reverse'}>
                            <a className={'btn btn-primary my-2'} href="/">HOME</a>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const skillQuizes = await getSkillQuizes(params.topic)
    return {
        props: {
            topic: params.topic,
            skillQuizes: (skillQuizes)
        }
    }
}
