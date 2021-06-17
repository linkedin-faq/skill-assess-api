import SkillCard from "./SkillCard";

export default function (skills) {
    return (<div className={'row'}>
                {skills.skills.map((item, index) => (<SkillCard skill={item} key={index}/>))}
            </div> )
}
