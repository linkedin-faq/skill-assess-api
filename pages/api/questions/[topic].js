import NextCors from 'nextjs-cors'

export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const {topic} = req.query
    let quizText
    let quizes = []
    let resource_url = `${process.env.source}${encodeURIComponent(topic)}.json`

    try {
        await fetch(resource_url)
            .then(response => response.text() )
            .then(data => (quizText = data))
    } catch(e) {
        console.log(e.message)
        res.status(500).json({error: e.message})
    }


    // [{question,
    //      illustrator including ```,
    //      options: {optionA: {text, correct: false}, .... optionX: {text, correct: true}}}....]
    // false being the wrong answers and true being the right

    quizes = JSON.parse(quizText)
    res.status(200).json(quizes)
}
