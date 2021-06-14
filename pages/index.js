import Layout from "../components/Layout";
import {useState, useEffect} from 'react'
import SkillCard from "../components/SkillCard"

export default function Home() {
    const [skills, setSkills] = useState([])

    useEffect(() => {
        if (skills.toString() == "") {
            fetch('/api/questions/')
                .then(response => response.text())
                .then(data => {
                    setSkills(JSON.parse(data))
                })
        }
    })

    return (
        <div>
            <Layout />
            { (skills.length > 0) ? (<div className={'container'}>
                <div className={'row'}>
                    {skills.map((item, index) => (<SkillCard skill={item} key={index}/>))}
                </div>
            </div>) : (<h1>SKILLS LOADING</h1>) }
        </div>
      )
}
