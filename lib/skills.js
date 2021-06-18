export async function getAllSkillNameParams() {
    const skillNames = await getAllSkillNames()
    return skillNames.map(item => ({params: {topic: item}}))
}

export async function getAllSkillNames() {
    try {
        const skills = await fetch((process.env.rootUrl ?  process.env.rootUrl : '/')+'api/questions/skills')
            .then(response => ((response.text())))
            .then(data => JSON.parse(data))

        const skillNames = skills.map((item) => item.skill_name)
        return skillNames
    }catch (e) {
        console.log(e.message)
        return []
    }
}

const sanitized = (skillName) => encodeURIComponent(skillName.substring(1, skillName.length-1).toLowerCase())

export async function getSkillQuizes(skillName) {
    try {
        const quizes = await fetch((process.env.rootUrl ?  process.env.rootUrl : '/') + 'api/questions/' + sanitized(skillName) )
                                .then(response => response.text())
                                .then(data => JSON.parse(data))
        return quizes
    } catch (e) {
        console.log(e.message)
    }
}

export async function getQuizesWithAnswer(skillName) {
    try {
        const quizes = await getSkillQuizes(skillName)
        const quizesWithAnswer = quizes.filter((quiz) => {
            let answerPresent = false
            let optionTextPresent = true
            quiz.options.forEach((option) => {
                if(option.correct) answerPresent = true
                if(option.text == "") optionTextPresent = false
            })

            return (answerPresent && optionTextPresent)
        })

        return quizesWithAnswer
    } catch (e) {
        console.log(e.message)
    }
}
