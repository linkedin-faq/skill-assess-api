export default function SkillCard(skill, key) {
    return (
        <div className="card col-4 m-4" style={{width: '18rem'}} key={key}>
                <div className="card-body">
                    <h5 className="card-title">{skill.skill}</h5>
                    <a className="btn btn-primary" href={'/quizes/'+encodeURIComponent(skill.skill)}>Test</a>
                </div>
        </div>
    )
}