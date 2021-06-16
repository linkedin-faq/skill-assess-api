export async function getAllSkillNames() {
    try {
        const skillNames = await fetch(process.env.rootUrl + 'api/questions/')
            .then(response => (response.text()))

        console.log(skillNames)
        console.log(typeof(JSON.parse(skillNames)))
        console.log(JSON.parse(skillNames).map(item => ({params: {topic: item}})))
        return JSON.parse(skillNames).map(item => ({params: {topic: item}}))
    }catch (e) {
        console.log(e)
        console.log(e.message)
        return []
    }
}

const sanitized = (skillName) => (skillName.substring(1, skillName.length-1).toLowerCase())

export async function getSkillQuizes(skillName) {
    try {
        const quizes = await fetch(process.env.rootUrl + 'api/questions/' + sanitized(skillName) )
                                .then(response => response.text())
        // console.log('fetched_quizes', quizes)
        return JSON.parse(quizes)
    } catch (e) {
        console.log(e.message)
    }
}
