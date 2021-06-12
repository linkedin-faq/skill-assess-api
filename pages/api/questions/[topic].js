export default async (req, res) => {
    const {topic} = req.query
    const questionRegex = /#### Q/
    const optionRegex = /- \[.+\]/
    const trueOptionRegex = /- \[x\]/
    let questionText
    let questions = []
    let quizes = []
    let options = []

    await fetch(`${process.env.source}${topic}/${topic}${process.env.extension}`)
            .then(response => response.text() )
            .then(data => (questionText = data))

    // currently the questions is in text i.e. string
    // we will have to parse it and create a data structure
    // we will go with the array of quizes
    // [{question,
    //      illustrator including ```,
    //      options: {optionA: {text, correct: false}, .... optionX: {text, correct: true}}}....]
    // false being the wrong answers and true being the right

    // question format
    // #### Q6. Which of the following DNS module methods uses the underlying OS facilities and does not necessarily perform any network communication?
    //      ``` ILLUSTRATOR ```
    //     - [x] lookup
    //     - [ ] resolve
    //     - [ ] resolve4
    //     - [ ] reverse

    // first lets split by new lines remove the blanks
    const textLines = questionText.split('\n').filter(item => item) // since for '' item is falsey it will filter nicely

    let same_question = false

    textLines.forEach((item) => {
        // first lets pickout the questions
        if(questionRegex.test(item)) {
            const question = item.substring(9, item.length)
            questions.push(question)
            same_question = false
            quizes.push({question, options: []})
        } else if(optionRegex.test(item)) {
            // track if the option is for same question or new one
            const correct = trueOptionRegex.test(item)
            if(!same_question) {
                quizes[quizes.length-1].options = [{text: item.substring(6, item.length), correct}]
            } else {
                quizes[quizes.length-1].options.push({text: item.substring(6, item.length), correct})
            }
            same_question = true
        }
    })

    console.log(quizes)
    res.status(200).json(quizes)
}
