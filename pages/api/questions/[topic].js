export default async (req, res) => {
    const {topic} = req.query
    let quizText
    let quizes = []
    let resource_url = `${process.env.source}${topic}.json`

    console.log(resource_url)
    try {
        await fetch(resource_url)
            .then(response => response.text() )
            .then(data => (quizText = data))

        console.log(quizText)
    } catch(e) {
        console.log(e.message)
        res.status(500).json({error: e.message})
    }


    // [{question,
    //      illustrator including ```,
    //      options: {optionA: {text, correct: false}, .... optionX: {text, correct: true}}}....]
    // false being the wrong answers and true being the right

    // console.log(quizText)
    quizes = JSON.parse(quizText)
    // console.log(quizes)
    res.status(200).json(quizes)
}
