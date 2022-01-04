import SkillCard from "./SkillCard";

export default function listOfSkills(skills) {
    return (<div className={'row'}>
                {skills.skills.map((item, index) => (<SkillCard skill={item} key={index}/>))}
            </div> )
}
