import Layout from "../../components/Layout";
import {getAllSkillNames, getSkillQuizes} from "../../lib/skills";
import {useState} from "react";
import QuestionPanel from "../../components/QuestionPanel";

export default function ({topic, skillQuizes}) {
    const [questions, setQuestions] = useState(skillQuizes)
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1)
    }

    return (
        <div>
            <Layout/>
            <div className={'container'}>
                <QuestionPanel question={questions[currentQuestion]} key={currentQuestion}/>
                <div className={'d-flex flex-row-reverse'}>
                    <button className={'btn btn-secondary my-2'} onClick={() => nextQuestion()}>NEXT</button>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps({ params }) {
    const skillQuizes = await getSkillQuizes(params.topic)
    return {
        props: {
            topic: params.topic,
            skillQuizes: (skillQuizes)
        }
    }
}

export async function getStaticPaths() {
    const skillNames = await getAllSkillNames()

    return {
        paths: skillNames,
        fallback: false
    }
}
