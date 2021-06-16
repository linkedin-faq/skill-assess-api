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

const sanitized = (skillName) => (skillName.substring(1, skillName.length-1).toLowerCase())

export async function getSkillQuizes(skillName) {
    try {
        const quizes = await fetch(process.env.rootUrl + 'api/questions/' + sanitized(skillName) )
                                .then(response => response.text())
        return JSON.parse(quizes)
    } catch (e) {
        console.log(e.message)
    }
}
